// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    notifyError:
      | 'error.platform.detect-provider'
      | 'error.platform.setup-provider-events'
      | 'error.platform.manual-connect';
    assignValues: 'connected';
    assignAccounts: 'changeAccounts';
    assignChain: 'changeChain';
    assignAccountBalance: 'updateBalance';
    resetContext: 'disconnect';
  };
  internalEvents: {
    'error.platform.detect-provider': { type: 'error.platform.detect-provider'; data: unknown };
    'error.platform.setup-provider-events': {
      type: 'error.platform.setup-provider-events';
      data: unknown;
    };
    'error.platform.manual-connect': { type: 'error.platform.manual-connect'; data: unknown };
    'done.invoke.detect-provider': {
      type: 'done.invoke.detect-provider';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'done.invoke.manual-connect': {
      type: 'done.invoke.manual-connect';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.setup-provider-events': {
      type: 'done.invoke.setup-provider-events';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
  };
  invokeSrcNameMap: {
    detectProvider: 'done.invoke.detect-provider';
    setupProvider: 'done.invoke.setup-provider-events';
    connect: 'done.invoke.manual-connect';
    pollAccountInfo: 'done.invoke.metamask-connector.ready.connected:invocation[0]';
  };
  missingImplementations: {
    actions: 'notifyError';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    detectProvider: 'xstate.init';
    setupProvider: 'done.invoke.detect-provider';
    connect: 'connect';
    pollAccountInfo: '' | 'done.invoke.manual-connect';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'init'
    | 'ready'
    | 'ready.disconnected'
    | 'ready.connecting'
    | 'ready.connected'
    | 'error'
    | { ready?: 'disconnected' | 'connecting' | 'connected' };
  tags: never;
}
