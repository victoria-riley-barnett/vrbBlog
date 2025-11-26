import { OGImageRoute } from 'astro-og-canvas';

// Load all markdown posts from your data directory and build a `pages` object
// where keys are slugs and values contain title/description used for images.
const glob = import.meta.glob('/src/data/blog-posts/*.md', { eager: true }) as Record<string, any>;

const pages: Record<string, any> = {};
for (const [filePath, mod] of Object.entries(glob)) {
  // derive filename without extension
  const match = filePath.match(/\/([^/]+)\.md$/);
  const filename = match ? match[1] : filePath;
  const m = mod as any;
  const fm = (m && (m.frontmatter || m.metadata || m)) || {};
  const title = fm.title || fm?.frontmatter?.title || filename;
  const description = fm.description || fm?.frontmatter?.description || '';
  const slug = fm.slug || filename;
  pages[slug] = { title, description };
}

export const { getStaticPaths, GET } = OGImageRoute({
  // the dynamic route param name (file is named `[...route].ts` so use `route`)
  param: 'route',
  pages,
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: './public/favicon-light.ico',
    },
    padding: 20,
        font: {
          title: { size: 48, lineHeight: 1.04, textDecoration: 'underline' },
          description: { size: 28, lineHeight: 1.2 },
        },
  }),
});
