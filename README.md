# vrbBlog

Source for [vb4r.com](https://vb4r.com) — blog, about, résumé, teaching, and work history.

Built with [Astro](https://astro.build), forked from
[@Charca's astro-blog-template](https://github.com/Charca/astro-blog-template).

Credits: favicons from [favicon.io](https://favicon.io/favicon-generator/), code font
[Hack](https://sourcefoundry.org/hack/).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

## Writing

Blog posts are Markdown files in `src/data/blog-posts/`. They need frontmatter:

```yaml
---
title: 'Post title'      # quote it if it contains a colon
slug: post-slug          # drives the route: /blog/post-slug
publishDate: 2026-09-07
description: One sentence, shown on the index.
tags: ["optional"]
---
```

The résumé, teaching, and work history sections on `/about` are **not** a content collection —
they live in `src/content/` and are imported directly as components by `src/pages/about.astro`.
See `CLAUDE.md` for the details.

## Deploy

Cloudflare Pages, deployed by hand:

```bash
npm run build
wrangler pages deploy dist
```

`site` in `astro.config.mjs` is the single source for canonical and Open Graph URLs — set it
there, not in individual pages.
