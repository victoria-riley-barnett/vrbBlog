---
title: 'Tailscale on an e-reader: building a VPN plugin for KOReader'
slug: 'tailscale-koreader-plugin'
publishDate: '2026-03-21'
description: 'How I built a Tailscale VPN plugin for KOReader that runs on Kindles, Kobos, and PocketBooks — including the HTTP proxy fallback for devices without TUN support.'
tags: ['tailscale', 'koreader', 'lua', 'networking', 'e-reader']
author: 'Victoria Barnett'
draft: true
---

E-readers are weird little Linux computers. They run on slow ARM processors with 256-512MB of RAM, they have limited storage, and their filesystems are often FAT32 or read-only. But they're also perfect for running [KOReader](https://github.com/koreader/koreader), a feature-rich open-source reading app that supports plugins.

For years, I'd been syncing books to my Kindle using SSH tunnels and port forwarding — a janky setup that broke whenever I changed networks. I wanted something cleaner: [Tailscale](https://tailscale.com), the zero-config VPN that uses WireGuard under the hood. But nobody had built a Tailscale plugin for KOReader. So I did.

## What the plugin does

The plugin installs and runs Tailscale on your e-reader. It:

- Auto-detects your device architecture (ARMv7 or ARM64) and file paths at runtime
- Downloads and installs the appropriate Tailscale binary (~25-57MB depending on architecture)
- Supports both Tailscale's normal auth key flow *and* self-hosted Headscale servers
- Provides an HTTP CONNECT + SOCKS5 proxy for devices that don't support TUN interfaces
- Pairs well with [koreader-syncthing](https://github.com/jasonchoimtt/koreader-syncthing) for cross-network file sync

I've tested it on Kindle PW5/PW6, Kobo, and PocketBook Verse Pro [VERIFY]. It should work on any KOReader device with ARMv7 or ARM64.

## The interesting technical bits

### 1. Architecture detection at runtime

KOReader plugins are written in Lua, which means you can't just compile a binary and ship it. The plugin needs to figure out what device it's running on and download the right Tailscale binary.

Here's how the detection works:

```lua
function TailscalePlugin:detectArch()
    local handle = io.popen("uname -m 2>/dev/null")
    if handle then
        local machine = handle:read("*a") or ""
        handle:close()
        machine = machine:gsub("%s+$", "")
        if machine == "aarch64" or machine == "arm64" then
            return "arm64"
        end
    end
    -- Default to 32-bit ARM (covers armv7l, armv6l, etc.)
    return "arm"
end
```

The plugin also handles different filesystem layouts. On Kindle and Kobo, binaries go in the plugin directory itself. On PocketBook, where the plugin directory might be read-only, they go to `/mnt/ext1/tailscale/bin/` [VERIFY].

### 2. The TUN fallback: HTTP proxy vs. full VPN

Most blog posts about Tailscale assume TUN (the kernel interface for VPNs) works everywhere. On e-readers, it often doesn't.

The `/dev/net/tun` device might not exist, or the kernel might not support it. When that happens, Tailscale falls back to userspace networking. In this mode, apps can't reach Tailscale peers through normal TCP connections — but they *can* use a proxy.

The plugin automatically detects TUN availability:

```bash
# Try to set up TUN device if missing
TUN_FLAG=""
if [ ! -c /dev/net/tun ]; then
    modprobe tun 2>/dev/null || true [VERIFY]
    mkdir -p /dev/net 2>/dev/null || true
    mknod /dev/net/tun c 10 200 2>/dev/null || true
    chmod 0666 /dev/net/tun 2>/dev/null || true
fi
# If TUN still doesn't exist, fall back to userspace networking
if [ ! -c /dev/net/tun ]; then
    TUN_FLAG="--tun=userspace-networking"
fi
```

When running in userspace mode, the plugin starts Tailscale with proxy flags:

```bash
nohup ./tailscaled --statedir="$STATE_DIR/" $TUN_FLAG \
  --socks5-server=localhost:1055 \
  --outbound-http-proxy-listen=127.0.0.1:1055 > tailscaled.log 2>&1 &
```

KOReader can then be configured to use `127.0.0.1:1055` as an HTTP/SOCKS5 proxy, letting it reach OPDS catalogs and other services through the Tailscale network even without a full VPN tunnel.

### 3. Lua on constrained hardware

KOReader plugins run on devices with 256-512MB RAM and slow ARM CPUs. There's no npm, no async/await, and you have to be careful with memory.

The plugin uses simple Lua I/O operations and shell scripts for heavy lifting. Installation, for example, happens in a shell script that the Lua code calls:

```lua
function TailscalePlugin:runInstallation()
    local cmd = "TS_DIR=" .. self.ts_dir .. " " .. self.plugin_dir .. "/bin/install-tailscale.sh"
    local handle = io.popen(cmd .. " 2>&1")
    -- ... handle output
end
```

The shell script does the actual work: fetching the latest Tailscale version from Tailscale's JSON API, downloading the appropriate tarball, extracting it, and setting permissions.

### 4. The auth.key pattern

KOReader's UI is limited — it's designed for e-ink displays with slow refresh rates. Asking users to type a long Tailscale auth key through an on-screen keyboard would be painful.

Instead, the plugin expects an `auth.key` file in the `bin/` directory. Users create this file on their computer and copy it to the device via SCP:

```bash
scp auth.key root@<device-ip>:/<koreader-plugins>/tailscale.koplugin/bin/auth.key
```

The plugin reads the key from the file:

```bash
AUTH_KEY=""
if [ -f auth.key ] && grep -q "^tskey-" auth.key; then
    AUTH_KEY=$(grep "^tskey-" auth.key | head -1 | tr -d ' ' | tr -d '#')
fi
```

This pattern works well for device management at scale. You can pre-configure auth keys and distribute them to multiple devices.

## FAT32 and read-only filesystems

Some e-readers use FAT32 for their storage, which doesn't support Unix permissions or symlinks. Others have read-only filesystems for the plugin directory.

The plugin handles this by using `/tmp/tailscale/` (tmpfs) as a runtime state directory when the persistent storage doesn't support `chmod`:

```bash
# Test if persistent storage supports chmod
_test_file="$BIN_DIR/.chmod_test_$$"
if touch "$_test_file" 2>/dev/null && chmod 0600 "$_test_file" 2>/dev/null; then
    STATE_DIR="$BIN_DIR"
    rm -f "$_test_file"
else
    STATE_DIR="/tmp/tailscale"
    # Copy existing state to tmpfs so we don't lose node identity
    for f in tailscaled.state tailscaled.log.conf; do
        [ -f "$BIN_DIR/$f" ] && cp -f "$BIN_DIR/$f" "$STATE_DIR/$f" 2>/dev/null || true
    done
fi
```

## PocketBook's missing loopback interface

PocketBook firmware doesn't configure the loopback interface (`lo`) at boot [VERIFY]. The proxy needs `127.0.0.1` to bind to, so the plugin handles this:

```bash
# Ensure loopback has 127.0.0.1 — required for the HTTP proxy to bind
if [ -x /ebrmain/cramfs/bin/sudo ]; then [VERIFY]
    /ebrmain/cramfs/bin/sudo /sbin/ifconfig lo 127.0.0.1 netmask 255.0.0.0 up 2>/dev/null || true
fi
```

## Using it with Syncthing

The real payoff comes when you combine this plugin with [koreader-syncthing](https://github.com/jasonchoimtt/koreader-syncthing). Once Tailscale is running, your e-reader gets a Tailscale IP address that's reachable from anywhere in your tailnet.

You can configure Syncthing on your other devices to connect to the e-reader using its Tailscale IP:

```
tcp://<tailscale-ip or magic dns>:22000
```

No port forwarding, no SSH tunnels, no messing with router settings. The e-reader is just another device on your private network, accessible from your laptop, phone, or any other Tailscale-connected device.

## The code

The plugin is [on GitHub](https://github.com/victoria-riley-barnett/koreader-tailscale). It's about 500 lines of Lua and another 500 lines of shell scripts. The structure is straightforward:

- `main.lua`: The KOReader plugin entry point
- `bin/install-tailscale.sh`: Downloads and installs Tailscale binaries
- `bin/start_tailscale.sh`: Starts Tailscale (standard Tailscale.com)
- `bin/start_tailscale_headscale.sh`: Starts Tailscale with a self-hosted Headscale server
- `bin/stop_tailscale.sh`: Stops Tailscale
- `bin/uninstall-tailscale.sh`: Removes all Tailscale files

## Why this matters

E-readers are often treated as consumption-only devices, but they're capable of so much more. They're full Linux computers with WiFi, storage, and enough processing power to run real services.

By adding Tailscale support, we're not just solving a sync problem. We're turning e-readers into first-class citizens on our private networks. They can serve OPDS catalogs, sync files bidirectionally, and generally act like the computers they are.

The plugin is also a case study in adapting modern networking tools to constrained environments. Tailscale is designed for servers and desktops, but with some care, it runs just fine on a Kindle with 512MB of RAM.

If you have a KOReader device and want to try it, the [installation instructions](https://github.com/victoria-riley-barnett/koreader-tailscale) are straightforward. Just be patient — downloading 57MB over e-reader WiFi takes a while.