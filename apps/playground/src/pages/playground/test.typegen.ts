// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignToContext: 'done';
  };
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.fetch-data': {
      type: 'done.invoke.fetch-data';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetch-data': { type: 'error.platform.fetch-data'; data: unknown };
  };
  invokeSrcNameMap: {
    fetch: 'done.invoke.fetch-data';
  };
  missingImplementations: {
    actions: never;
    services: 'fetch';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetch: 'fetch';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'fetching' | 'ready';
  tags: never;
}
