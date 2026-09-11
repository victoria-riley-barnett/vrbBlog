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

**`git push origin main` is the deploy.** The Cloudflare Pages project `vrbblog` is
git-connected to `victoria-riley-barnett/vrbBlog` (production branch `main`), and Cloudflare
builds it itself: `npm run build` → `dist`. Nothing is pushed by hand.

- Local `wrangler pages deploy` is **not** the mechanism — the project is git-connected, and
  `dist/` is gitignored anyway. Earlier notes here and in `README.md` calling for wrangler
  were wrong.
- **A failed build does not change the live site.** The last successful deploy stays up, so a
  bad push is safe to recover from — check the build status afterward.
- `vb4r.com` is a custom domain on the project. Its DNS is a proxied
  `CNAME vb4r.com -> vrbblog.pages.dev` in zone `7cee788e2c42617d37a95571f73bc678`.
- The build runs in **Cloudflare's** environment, not yours — different Node and npm versions
  than local. A build that passes locally can still fail there. Read the build log.

The site is public and indexable — every push to `main` lands on the live web. Confirm before
pushing.

Two failure modes that have actually bitten:

- **Unquoted colons in post frontmatter break the build.** `title: Foo: bar` is invalid YAML
  and fails the whole deploy. Quote the title. This silently blocked every deploy from July to
  September 2026.
- **A missing `404.html` makes Cloudflare Pages serve the homepage with HTTP 200 for every
  unmatched route**, so deleted pages look like they still exist and bad URLs get soft-200s.
  `src/pages/404.astro` is what prevents that — don't delete it.

## Sandbox and network

The Bash tool's sandbox has **no outbound network**. `npm run build` works; `npm install`,
`git push`, `curl`, and `wrangler` do not.

Two ways around it: Victoria runs `! <command>` so it executes in her environment and the
output lands in the conversation, or the Bash tool is called with `dangerouslyDisableSandbox`
for that specific command.

**The Cloudflare MCP is not sandboxed** and is the right tool for Pages and DNS work — project
config, deployment status, build logs, custom domains, and DNS records are all reachable
through it. Prefer it over shelling out.

## Maintenance notes

Cleaned up 2026-09-10 (template leftovers removed: the demo Markdown cheat-sheet post,
`public/test-hack-font.html`, the StackBlitz/CodeSandbox config files, and the pnpm-only
`.npmrc`). `.DS_Store` is gitignored — if `.DS_Store` files reappear in `public/` or `src/`
they will be copied into the build, so sweep them before deploying.

The project is on Astro 5; Astro 7 is current. A major upgrade is a standalone task, not a
drive-by.
