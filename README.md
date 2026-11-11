# vrbBlog
## Node
```bash
npm install
npm run dev       # http://localhost:4321, shows what will be deployed
npm run build     # production site in dist/
npm run check     # Astro and TypeScript diagnostics
npm run preview   # preview the production build
```

## Frontmatter
Posts live in `content/posts/` as Markdown or MDX. Post frontmatter:

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

## Structure
The home page is an expandable index of published posts and projects, with the about content and
links alongside it. Edit `content/pages/about.mdx` for the sidebar and `content/projects.json` for
project descriptions, repository names, images, and optional detail links. Entries start collapsed
with a short summary; the first visible entry is given extra emphasis. Open an entry for its
contents, tags, and `#` permalink.

A project with no `paragraphs` and no `image` stays a single row: the title links to its repository
and nothing expands. That is the right shape for entries with nothing more to say than the summary.

Entries expand without JavaScript. With JavaScript, the filter buttons select Projects or writing,
and selecting the active button again shows both.

The home page is the whole site. Older URLs redirect to their entries: `/about`, `/blog`,
`/projects`, `/tags`, `/search`, `/posts`, `/blog/<slug>`, `/tag/<tag>`, and `/projects/<slug>`.

The architecture-day post embeds the handout with the browser's PDF viewer and links it directly
for devices that cannot display embedded PDFs. The PDF is stored in
`public/assets/architecture-day/architecture-day.pdf`; the sources live in the `intermediate-ml`
repository.

The sidebar uses the `ThemePicker` Astro component inside its MDX content. The résumé linked in
the sidebar is at `public/assets/Victoria-Barnett-Resume.pdf`.

The layout and stylesheet are in `src/layouts/BaseLayout.astro` and `theme/style.css`. The theme
selector follows the system setting by default and remembers an explicit light or dark choice.

`src/pages/robots.txt.ts` and `@astrojs/sitemap` generate `robots.txt` and `sitemap-index.xml`;
the sitemap is filtered to the home page because everything else is an anchor on it.

The theme icon is Font Awesome's circle-half-stroke, also available in Nerd Fonts, by Fonticons,
Inc. ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/);
[source](https://github.com/FortAwesome/Font-Awesome)).
## Deploy
`npm run build` and publish `dist/` w/ Cloudflare Pages workflow.

Confirm the project's build settings use `npm run build` and `dist` before reconnecting automatic
deploys.
