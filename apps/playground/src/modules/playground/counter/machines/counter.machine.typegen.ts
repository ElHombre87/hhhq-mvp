// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    decrement: 'DECREMENT';
    increment: 'INCREMENT';
    setMax: 'SET_MAX';
    setMin: 'SET_MIN';
    setValue: 'SET_VALUE';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isMax: '';
    isMin: '';
  };
  eventsCausingDelays: {};
  matchesStates: 'counting' | 'max' | 'min';
  tags: never;
}
