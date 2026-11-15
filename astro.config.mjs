import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://vb4r.com',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { themes: { light: 'catppuccin-latte', dark: 'catppuccin-mocha' } },
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
  redirects: {
    '/about': '/#about',
    '/resume': '/assets/Victoria-Barnett-Resume.pdf',
    '/blog': '/#projects-and-writing',
    '/projects': '/#projects-and-writing',
    '/search': '/#projects-and-writing',
    '/tags': '/#projects-and-writing',
    '/posts': '/#projects-and-writing',
    '/projects/mia-reader': '/#projects-and-writing',
    '/projects/dsa-planet-theme': '/#projects-and-writing',
    // Old post URLs land on the entry they were about.
    '/blog/starting-with-docker': '/#projects-and-writing',
    '/blog/serial-project-management': '/#project-serialpm',
    '/blog/cpp-exercises': '/#project-cpp-coursework',
    '/blog/alzheimers-screening-recall-optimization': '/#project-alzheimers-screening',
    '/blog/metablogging': '/#projects-and-writing',
    '/blog/tailscale-koreader-plugin': '/#project-koreader-tailscale',
  },
  integrations: [mdx(), sitemap({
    filter: (page) => {
      const { pathname } = new URL(page);
      return pathname === '/' || pathname.startsWith('/blog/') || pathname.startsWith('/projects/');
    },
  })],
});
