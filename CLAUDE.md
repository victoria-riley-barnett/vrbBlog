# vrbBlog

Victoria Barnett's personal site: blog, about, resume, teaching, work history.
Live at **https://vb4r.com** (Cloudflare Registrar, deployed to Cloudflare Pages).

Astro 5 static site, forked from [Charca's astro-blog-template](https://github.com/Charca/astro-blog-template).
Content is prose — the writing is the point. Match the existing voice: declarative, concrete,
no filler. Don't add marketing gloss to résumé or bio copy.

## Commands

```bash
npm run dev      # dev server
npm run build    # build to dist/
wrangler pages deploy dist   # deploy (needs network — see Sandbox below)
```

## Layout

| Path | What |
| --- | --- |
| `astro.config.mjs` | `site`, OG image renderer, markdown plugins. Single source of truth for URLs. |
| `src/data/blog-posts/*.md` | Blog posts. Loaded as the `posts` collection. |
| `src/content.config.js` | Defines the `posts` collection (glob over `src/data/blog-posts`). |
| `src/content/*.md` | `resume.md`, `work_history.md`, `teaching.md`. **Not a collection** — see below. |
| `src/pages/` | `index`, `about`, `blog/index`, `blog/[slug]`. |
| `src/components/` | `BaseHead` (meta/OG), `Bio`, `Nav`, `Sidebar`, `Dropdown`, `ThemeToggleButton`. |
| `public/` | Copied verbatim to `dist/`. |

## Two content systems — the main gotcha

**Blog posts** (`src/data/blog-posts/`) are a real Astro content collection. Drop in a `.md`
with frontmatter and it appears in the blog index and builds a route:

```yaml
---
title: 'Title: quote it if it contains a colon'   # unquoted colons break YAML
slug: my-post-slug        # drives the route: /blog/my-post-slug — set manually
publishDate: 2026-09-07
description: One sentence, shown in the index.
tags: ["optional"]
---
```

**`src/content/*.md` are NOT a collection.** They are imported directly as Markdown
components by `src/pages/about.astro`:

```astro
import Resume from '../content/resume.md'
<Dropdown title="Resume" id="resume" preview="..."><Resume /></Dropdown>
```

Adding a section to the About page therefore takes **three** edits, not one: create the `.md`,
import it and add a `<Dropdown>` in `about.astro`, and extend the hash handler in that file's
inline `<script>` (the `#resume` / `#teaching` / `#work-history` deep links). Miss the third
and the anchor silently does nothing. The `preview` prop is the collapsed-summary text — keep
it in sync when the content changes.

## URLs and OG images

- `site: 'https://vb4r.com'` in `astro.config.mjs` feeds every canonical and OG URL via
  `Astro.site.href` in `index.astro`, `about.astro`, `blog/index.astro`, `blog/[slug].astro`,
  and `BaseHead.astro`. Change it there, not in the pages.
- OG images are generated at build time by `astro-opengraph-images` using a custom Satori
  renderer defined inline in `astro.config.mjs` (Catppuccin Mocha palette, logo + title +
  description). Each page emits a sibling `index.png`.
- `astro-og-canvas` is still in `package.json` but is no longer wired up — leftover from a swap.

## Markdown pipeline

`remark-gfm` (tables, strikethrough), `remark-smartypants` (curly quotes and dashes in prose),
`rehype-external-links` (all external links get `target="_blank"`). Shiki highlights with the
`catppuccin-mocha` theme, matching the OG images.

## Deploy

Cloudflare Pages, built by hand and pushed with wrangler. There is **no `wrangler.toml`** —
the deploy is config-less, so nothing in the repo pins the Pages project name or the custom
domain; both live in the Cloudflare dashboard. `wrangler` is global (`/Users/v/.npm-global/bin/wrangler`, v4.x).

Note `README.md` says `wrangler pages publish`; that subcommand is the deprecated alias for
`wrangler pages deploy`.

The site is public and indexable — every change here lands on the live web. Confirm before
deploying.

## Sandbox

The Bash tool's sandbox has **no outbound network**. `npm run build` works; anything touching
the network (`wrangler pages deploy`, `npm install`, Cloudflare MCP) does not. For those,
Victoria runs `! <command>` in the session so it executes in her environment and the output
lands in the conversation.

## Maintenance notes

Cleaned up 2026-09-10 (template leftovers removed: the demo Markdown cheat-sheet post,
`public/test-hack-font.html`, the StackBlitz/CodeSandbox config files, and the pnpm-only
`.npmrc`). `.DS_Store` is gitignored — if `.DS_Store` files reappear in `public/` or `src/`
they will be copied into the build, so sweep them before deploying.

The project is on Astro 5; Astro 7 is current. A major upgrade is a standalone task, not a
drive-by.
