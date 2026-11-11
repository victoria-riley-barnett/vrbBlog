import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    publishDate: z.union([z.string(), z.date()]).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  });

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/posts' }),
  schema: postSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
});

export const collections = { posts, pages };
