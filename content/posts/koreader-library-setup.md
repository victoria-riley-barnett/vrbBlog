---
title: 'My Calibre replacement is a VPN plugin on an e-reader'
slug: 'koreader-library-setup'
publishDate: '2026-10-07'
description: 'A Lua plugin, Syncthing, and an iOS shortcut: how I keep my library backed up on my home server, laptop, and Kindle on any network.'
tags: ['koreader', 'tailscale', 'syncthing', 'lua', 'e-reader']
author: 'Victoria Barnett'
draft: true
---

<!--
DRAFT v1. Sentences marked [V: ...] are gaps only you can fill: what actually happened, what you'd say.
Everything outside brackets comes from your LinkedIn paragraph, the plugin README, or your resume.
Delete this comment before publishing; flip draft to false when it's ready.
-->

I developed a Lua plugin for the open-source KOReader community. It brings VPN support to Kindle and Kobo ARM e-ink devices, and it works best alongside something like Syncthing.

With that setup and an iOS shortcut, I've rolled my own Calibre replacement and send-to-Kindle service. My library is backed up on my home server, my laptop, and my Kindle Paperwhite, across any network, at all times.

This post is how the pieces fit together, and why I had to write one of them.

## What I wanted

[V: the thing you were actually annoyed by. What did Calibre or Send to Kindle do wrong for you? Did a book go missing, did the sync only work on home wifi, something else?]

The short version of what I wanted: put a book on any device and have it show up on the others, without caring which network any of them is on.

## The three pieces

**KOReader** is an open-source reading app that replaces the stock reader on Kindles, Kobos, and PocketBooks. It supports plugins, which is the only reason any of this is possible. [V: when/why you switched to it.]

**Syncthing** keeps folders in sync between devices without a cloud service in the middle. There is a KOReader plugin for it, [koreader-syncthing](https://github.com/jasonchoimtt/koreader-syncthing). [V: your folder layout. One shared library folder? Which device is the "source of truth"?]

**An iOS shortcut** is how books get in. [V: what it does. Share sheet to a folder? Which folder, and what happens from there? This is the part that replaces Send to Kindle, so it deserves a real description.]

## The part that didn't work: networks

Syncthing is happiest when its devices can see each other. On a home network they can. Away from home, an e-reader on hotel wifi or a library network is behind someone else's router, and many sync tools and services fall over when they need the local network.

[V: the moment you hit this. Which tool failed, and how.]

The fix is to put the e-reader on a [Tailscale](https://tailscale.com) network. Every device gets a stable address that works from anywhere, and the sync tools treat the Kindle as if it were on the couch next to your laptop.

There was no Tailscale for KOReader. So I wrote the plugin.

## The plugin

The plugin runs Tailscale from inside KOReader. You open the Network menu, tap Tailscale VPN, and install; the download is about 57 MB. Sign-in happens through a QR code you scan with your phone, or an auth key you drop on the device.

![The Tailscale plugin menu in KOReader](/assets/projects/koreader-tailscale.png)

Under the hood it has two modes. If the device has `/dev/net/tun`, it uses kernel networking, and everything on the e-reader (OPDS catalogs, progress sync, file sync) is routed transparently. If not, it falls back to userspace networking and exposes an HTTP proxy that KOReader can be pointed at; the plugin can configure that automatically.

[V: the hard part. The README and your resume mention a routing failure you traced to forced userspace networking, and an installer that could report success after a failed extraction. Tell the story of one of those: what you saw on the device, how you figured it out, what the fix was.]

It's based on [mitanshu7/tailscale_kual](https://github.com/mitanshu7/tailscale_kual), which did the groundwork of getting Tailscale's binaries running on these devices.

## How it's gone

The plugin has shipped seven releases. Eleven pull requests have been merged from people I'd never met, and it's at 223 stars and 24 forks. [V: how you feel about that, or one contribution that surprised you.]

## What I'd change

[V: rough edges you still live with. Battery? The 57 MB install? Devices that don't work? Be honest here; this section is the one readers trust most.]

If you want to try it, the code is at [github.com/victoria-riley-barnett/koreader-tailscale](https://github.com/victoria-riley-barnett/koreader-tailscale). It needs an ARMv7 or ARM64 device.
