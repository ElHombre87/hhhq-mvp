// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignSubreddit: 'SELECT';
    assignPosts: 'done.invoke.fetch-subreddit';
    registerFlairs: 'done.invoke.fetch-subreddit';
    notifyError: 'error.platform.fetch-subreddit';
  };
  internalEvents: {
    'done.invoke.fetch-subreddit': {
      type: 'done.invoke.fetch-subreddit';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetch-subreddit': { type: 'error.platform.fetch-subreddit'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    fetchPosts: 'done.invoke.fetch-subreddit';
  };
  missingImplementations: {
    actions: 'notifyError';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchPosts: 'SELECT';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'selected'
    | 'selected.loading'
    | 'selected.loaded'
    | 'selected.failed'
    | { selected?: 'loading' | 'loaded' | 'failed' };
  tags: never;
}
