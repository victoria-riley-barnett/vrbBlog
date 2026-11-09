import rss from '@astrojs/rss';
import { getPublishedPosts, isDraft, postDate, postSlug, postTitle } from '../lib/posts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Victoria Barnett',
    description: 'Notes and essays.',
    site: context.site!,
    items: posts.filter((post) => !isDraft(post)).map((post) => ({
      title: postTitle(post),
      description: post.data.description || '',
      pubDate: postDate(post),
      link: `/blog/${postSlug(post)}/`,
    })),
  });
}
