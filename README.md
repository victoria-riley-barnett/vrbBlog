# vrbBlog
## Node
```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run check
npm run preview
```

## Frontmatter

```yaml
---
title: 'Post title'
slug: 'post-slug'
date: '2026-11-06'
description: 'One sentence for the index and feed.'
tags: ['optional']
draft: false
---
```

Posts with `draft: true` or missing title, slug, or date are excluded everywhere. Slugs must be
URL-safe: they become `#post-<slug>` anchors, so avoid `&` and spaces.

While `npm run dev` is running, drafts are still viewable at `/draft/<slug>`, so a recut can be
reviewed without publishing it. That route emits nothing in `npm run build`.

The theme icon is Font Awesome's circle-half-stroke, also available in Nerd Fonts, by Fonticons,
Inc. ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/);
[source](https://github.com/FortAwesome/Font-Awesome))