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
    order: z.number().optional(),
    garden: z.string().optional(),
  });

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/posts' }),
  schema: postSchema,
});

const drafts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './drafts' }),
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

const reports = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/reports' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    project: z.string(),
    source: z.string().optional(),
  }),
});

export const collections = { posts, drafts, pages, reports };
