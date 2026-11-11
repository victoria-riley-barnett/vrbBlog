import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vb4r.com',
  devToolbar: { enabled: false },
  redirects: {
    '/about': '/#about',
    '/blog': '/#projects-and-writing',
    '/projects': '/#projects-and-writing',
    '/search': '/#projects-and-writing',
    '/tags': '/#projects-and-writing',
    '/posts': '/#projects-and-writing',
    '/blog/starting-with-docker': '/#projects-and-writing',
    '/blog/serial-project-management': '/#projects-and-writing',
    '/blog/cpp-exercises': '/#projects-and-writing',
    '/blog/alzheimers-screening-recall-optimization': '/#projects-and-writing',
    '/blog/metablogging': '/#projects-and-writing',
    '/blog/tailscale-koreader-plugin': '/#projects-and-writing',
  },
  integrations: [mdx(), sitemap({ filter: (page) => new URL(page).pathname === '/' })],
});
