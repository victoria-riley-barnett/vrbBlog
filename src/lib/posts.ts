import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postSlug(post: Post) {
  return post.data.slug || post.id.replace(/\.mdx?$/, '');
}

export function postDate(post: Post) {
  const date = post.data.publishDate || post.data.date;
  return date ? new Date(date) : undefined;
}

export function postTitle(post: Post) {
  return post.data.title || postSlug(post);
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function getPublishedPosts() {
  const posts: Post[] = await getCollection('posts');
  const slugs = new Set<string>();
  for (const post of posts) {
    const slug = postSlug(post);
    if (slugs.has(slug)) throw new Error(`Duplicate post slug: ${slug}`);
    slugs.add(slug);
    const date = postDate(post);
    if (!post.data.title || !post.data.slug || !date) {
      throw new Error(`Post ${slug} needs a title, slug, and date; work in progress belongs in drafts/.`);
    }
    if (Number.isNaN(date.valueOf())) throw new Error(`Invalid date for post: ${slug}`);
  }
  return posts.sort(
    (a, b) => (postDate(b)?.valueOf() || 0) - (postDate(a)?.valueOf() || 0) || postSlug(a).localeCompare(postSlug(b))
  );
}

export async function getDraftPosts() {
  const posts = (await getCollection('drafts')) as unknown as Post[];
  return posts.sort((a, b) => postSlug(a).localeCompare(postSlug(b)));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
}
