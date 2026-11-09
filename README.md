# vrbBlog
## Node
```bash
npm install
npm run dev       # http://localhost:4321, includes drafts
npm run build     # production site and Pagefind search index in dist/
npm run check     # Astro and TypeScript diagnostics
npm run preview   # preview the production build
```

## Frontmatter
Posts in `content/posts/`:

```yaml
---
title: 'Post title'
slug: 'post-slug'
date: '2026-11-06'
description: 'One sentence for the index and feed.'
tags: ['optional']
draft: true
---
```
## Deploy
`npm run build` and publish `dist/` w/ Cloudflare Pages
workflow.

Confirm the project's build
settings use `npm run build` and `dist` before reconnecting automatic deploys.
