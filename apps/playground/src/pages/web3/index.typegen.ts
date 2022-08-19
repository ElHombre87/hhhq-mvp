// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    setConnector: 'ACTIVATE';
    notifyAccount: 'done.invoke.(machine).activating:invocation[0]';
    notifyError: 'error.platform.(machine).activating:invocation[0]';
  };
  internalEvents: {
    'done.invoke.(machine).activating:invocation[0]': {
      type: 'done.invoke.(machine).activating:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.(machine).activating:invocation[0]': {
      type: 'error.platform.(machine).activating:invocation[0]';
      data: unknown;
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    activateConnector: 'done.invoke.(machine).activating:invocation[0]';
  };
  missingImplementations: {
    actions: 'notifyAccount' | 'notifyError';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    activateConnector: 'ACTIVATE';
  };
  eventsCausingGuards: {
    isConnectorUndefined: '';
  };
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'activating' | 'active';
  tags: never;
}
