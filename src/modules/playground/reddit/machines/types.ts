import { ActorRefFrom } from 'xstate';
import type { RedditPost } from '../libs';
import { Flair } from '../libs/types';
import type { createSubredditMachine } from './subreddit.machine';

export namespace MReddit {
  export type Event = { type: 'SELECT'; payload: { name: string } } | { type: 'REFRESH_CURRENT' };

  type SubredditMachine = ReturnType<typeof createSubredditMachine>;
  export type SubredditActor = ActorRefFrom<SubredditMachine>;

  export type Context = {
    active: string;
    subreddits: Record<string, SubredditActor>;
    subreddit: SubredditActor | null;
  };
  export type TypeState =
    | { value: 'idle'; context: { subreddit: null; subreddits: {} } }
    | { value: 'selected'; context: { subreddit: SubredditActor; subreddits: {} } };
}

export namespace MSubreddit {
  export type Context = {
    subreddit: string;
    posts: RedditPost[];
    flairs: Flair[];
    activeFlairs: string[];
    lastUpdated?: number | undefined;
  };
  export type Event =
    | { type: 'REFRESH' }
    | { type: 'RETRY' }
    | { type: 'SET_FLAIRS'; payload: { flairs: string[] } }
    | { type: 'REMOVE_FLAIRS'; payload: { flairs: string[] } };
  // | { type: 'RESET_FLAIRS'}
  // TODO: flair selection event(s)

  export type Services = {
    fetch: { data: RedditPost[] };
  };
  export type TypeState =
    | { value: 'loading'; context: Context & { lastUpdated: undefined } }
    | { value: 'loaded'; context: Context & { lastUpdated: number } }
    | { value: 'failed'; context: Context & { lastUpdated: undefined } };
}
/** Typings for the old all-in-one reddit machine */
export namespace MRedditOld {
  export type Services = {
    fetchPosts: { data: RedditPost[] };
  };
  export type Event = { type: 'SELECT'; payload: { name: string } };

  export type Context = {
    subreddit: string | undefined;
    posts: Array<RedditPost>;
    flairs: Array<Flair>;
  };
}
