import { getCollection } from 'astro:content';

// Posts marked `draft: true` stay out of the production build, so they can sit in
// the repo unreviewed without going live. They still render under `astro dev`.
const isPublished = ({ data }) => import.meta.env.DEV || !data.draft;

// Newest first. The slug tiebreaker keeps the order stable when publish dates collide.
const byNewest = (a, b) =>
  new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf() ||
  a.data.slug.localeCompare(b.data.slug);

export async function getPublishedPosts() {
  const posts = await getCollection('posts');
  return posts.filter(isPublished).sort(byNewest);
}
