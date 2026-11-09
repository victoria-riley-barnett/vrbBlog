import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://vb4r.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        // Headings get <a class="anchor" href="#id">#</a>; style .anchor in theme/style.css.
        [rehypeAutolinkHeadings, { behavior: 'append', properties: { class: 'anchor', ariaLabel: 'Link to this section' }, content: { type: 'text', value: '#' } }],
      ],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
