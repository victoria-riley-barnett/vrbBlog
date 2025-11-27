import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import opengraphImages from 'astro-opengraph-images'
import React from 'react'
import * as fs from 'fs'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-blog-template.netlify.app',
  integrations: [
    mdx(),
    svelte(),
    opengraphImages({
      options: {
        // Load fonts explicitly for Satori rendering, if present
        fonts: [
          (() => {
            const p = 'node_modules/@fontsource/merriweather/files/merriweather-latin-400-normal.woff';
            if (fs.existsSync(p)) {
              return { name: 'Merriweather', weight: 400, style: 'normal', data: fs.readFileSync(p) };
            }
            return undefined;
          })(),
          (() => {
            const p = 'node_modules/@fontsource/fira-sans/files/fira-sans-latin-700-normal.woff';
            if (fs.existsSync(p)) {
              return { name: 'Fira Sans', weight: 700, style: 'normal', data: fs.readFileSync(p) };
            }
            return undefined;
          })(),
        ].filter(Boolean),
      },
      // Custom renderer: site logo, title + description, Catppuccin Mocha colors
      render: async ({ title, description }) => {
        const logoPath = 'public/assets/logo-dark.png'
        let logoSrc
        if (fs.existsSync(logoPath)) {
          const buf = fs.readFileSync(logoPath)
          logoSrc = `data:image/png;base64,${buf.toString('base64')}`
        }

        const bgStart = 'rgb(30,30,46)'
        const bgEnd = 'rgb(24,24,37)'
        const titleColor = 'rgb(205,214,244)'
        const descColor = 'rgb(186,194,222)'

        return React.createElement(
          'div',
          {
            style: {
              width: '1200px',
              height: '630px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // true vertical centering
              alignItems: 'center',
              backgroundImage: `linear-gradient(180deg, ${bgStart}, ${bgEnd})`,
              boxSizing: 'border-box',
              paddingTop: '128px',
            },
          },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                padding: '0 72px', // horizontal padding only
                gap: '20px',
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '1000px', // keep content readable and centered
              },
            },
            React.createElement(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
              logoSrc
                ? React.createElement('img', {
                    src: logoSrc,
                    alt: 'Site logo',
                  width: 72,
                  height: 72,
                    style: {
                    width: '72px',
                    height: '72px',
                      objectFit: 'contain',
                      imageRendering: 'crisp-edges',
                      borderRadius: '8px',
                    },
                  })
                : null,
              React.createElement('h1', {
                style: {
                  fontFamily: 'Fira Sans, Merriweather',
                  fontSize: '60px',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  color: titleColor,
                  margin: 0,
                  // Constrain long titles to avoid excessive height
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                },
              }, title)
            ),
            description
              ? React.createElement('p', {
                  style: {
                    fontFamily: 'Merriweather, Fira Sans',
                    fontSize: '28px',
                    lineHeight: 1.25,
                    fontWeight: 400,
                    color: descColor,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
                }, description)
              : null,
            // Content ends here
          )
        )
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
