// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.detect-provider': {
      type: 'done.invoke.detect-provider';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.manual-connect': {
      type: 'done.invoke.manual-connect';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.setup-provider-events': {
      type: 'done.invoke.setup-provider-events';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.detect-provider': { type: 'error.platform.detect-provider'; data: unknown };
    'error.platform.manual-connect': { type: 'error.platform.manual-connect'; data: unknown };
    'error.platform.setup-provider-events': {
      type: 'error.platform.setup-provider-events';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    connect: 'done.invoke.manual-connect';
    detectProvider: 'done.invoke.detect-provider';
    pollAccountInfo: 'done.invoke.metamask-connector.ready.connected:invocation[0]';
    setupProvider: 'done.invoke.setup-provider-events';
  };
  missingImplementations: {
    actions: 'notifyError';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignAccountBalance: 'updateBalance';
    assignAccounts: 'changeAccounts';
    assignChain: 'changeChain';
    assignValues: 'connected';
    notifyError:
      | 'error.platform.detect-provider'
      | 'error.platform.manual-connect'
      | 'error.platform.setup-provider-events';
    resetContext: 'disconnect';
  };
  eventsCausingServices: {
    connect: 'connect';
    detectProvider: 'xstate.init';
    pollAccountInfo: '' | 'done.invoke.manual-connect';
    setupProvider: 'done.invoke.detect-provider';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'error'
    | 'init'
    | 'ready'
    | 'ready.connected'
    | 'ready.connecting'
    | 'ready.disconnected'
    | { ready?: 'connected' | 'connecting' | 'disconnected' };
  tags: never;
}
