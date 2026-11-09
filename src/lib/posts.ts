import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postSlug(post: Post) {
  return post.data.slug || post.id.replace(/\.md$/, '');
}

export function postDate(post: Post) {
  const date = post.data.publishDate || post.data.date;
  return date ? new Date(date) : undefined;
}

export function postTitle(post: Post) {
  return post.data.title || postSlug(post);
}

export function isDraft(post: Post) {
  return !!post.data.draft || !post.data.title || !post.data.slug || !postDate(post);
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function getPublishedPosts() {
  const posts = await getCollection('posts');
  const slugs = new Set<string>();
  for (const post of posts) {
    const slug = postSlug(post);
    if (slugs.has(slug)) throw new Error(`Duplicate post slug: ${slug}`);
    slugs.add(slug);
    const date = postDate(post);
    if (date && Number.isNaN(date.valueOf())) throw new Error(`Invalid date for post: ${slug}`);
  }
  return posts
    .filter((post) => import.meta.env.DEV || !isDraft(post))
    .sort((a, b) => (postDate(b)?.valueOf() || 0) - (postDate(a)?.valueOf() || 0) || postSlug(a).localeCompare(postSlug(b)));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
}
