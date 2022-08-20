import { MRedditOld, MSubreddit } from '../machines/types';
import type { RedditPost, Flair } from './types';

export * from './subreddit.services';

export function parsePost(post: RedditPost) {
  return {
    title: post.title,
    url: post.url,
  };
}

export const extractFlair = (post: RedditPost) => ({
  text: post.link_flair_text,
  background: post.link_flair_background_color,
});

export function extractFlairs(posts: RedditPost[]): Flair[] {
  const flairs = posts.map(extractFlair).filter((flair) => flair.text && flair.background);
  const uniques = flairs.map((f) => f.text);
  return flairs.filter((f, i) => uniques.indexOf(f.text) === i);
}
/** extract the individual flair texts from the state machine context */
export const getFlairs = (context: MRedditOld.Context | MSubreddit.Context) =>
  context.flairs.map((flair) => flair.text);

/** Filter the given posts by provided flairs */
export const filterPosts = (posts: RedditPost[], flairs: string[]) =>
  posts.filter((post) => flairs.includes(post.link_flair_text));
