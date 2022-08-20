// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignPosts: 'done.invoke.fetch-subreddit';
    registerFlairs: 'done.invoke.fetch-subreddit';
    notifyError: 'error.platform.fetch-subreddit';
    setFlairs: 'SET_FLAIRS';
    removeFlairs: 'REMOVE_FLAIRS';
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
    fetch: 'done.invoke.fetch-subreddit';
  };
  missingImplementations: {
    actions: 'notifyError';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetch: 'REFRESH' | 'RETRY';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'loading' | 'loaded' | 'failed';
  tags: never;
}
