// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    updateQuery: 'FETCH';
    assignData: 'done.invoke.fetch-data';
    notifyError: 'error.platform.fetch-data';
    notifyTimeout: 'xstate.after(5000)#rick-and-morty-fetcher.fetching';
  };
  internalEvents: {
    'done.invoke.fetch-data': {
      type: 'done.invoke.fetch-data';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetch-data': { type: 'error.platform.fetch-data'; data: unknown };
    'xstate.after(5000)#rick-and-morty-fetcher.fetching': {
      type: 'xstate.after(5000)#rick-and-morty-fetcher.fetching';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    fetchData: 'done.invoke.fetch-data';
  };
  missingImplementations: {
    actions: 'notifyError' | 'notifyTimeout';
    services: 'fetchData';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchData: 'FETCH' | 'RETRY';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'fetching' | 'success' | 'error' | 'timeout';
  tags: never;
}
