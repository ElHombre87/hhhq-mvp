import { RedditResponse } from './types';

export async function fetchSubreddit(subreddit: string) {
  if (!subreddit) return [];

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((res) => res.json())
    .then((json: RedditResponse) => json.data.children.map((child) => child.data));
}
