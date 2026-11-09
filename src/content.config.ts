import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    publishDate: z.union([z.string(), z.date()]).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    // 'note' = short piece from the theory; 'essay' = long; 'teaching' = about the course; 'project' = write-up
    kind: z.enum(['note', 'essay', 'teaching', 'project', 'analysis']).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    garden: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().optional(),
    layout: z.string().optional(),
    tag: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
});

// One entry per chapter of the course book. Each file is a short public summary with a link
// into the book; the full chapter text stays in the course repo.
const teaching = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/teaching' }),
  schema: z.object({
    title: z.string(),
    chapter: z.string(),            // '⌂', '0'..'15'
    order: z.number(),
    summary: z.string(),
    figures: z.array(z.string()).optional(),
    bookPath: z.string().optional(), // e.g. 'chapters/08-sequence-failure.html'
    draft: z.boolean().optional(),
  }),
});

export const collections = { posts, pages, teaching };
