// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    increment: 'INCREMENT';
    decrement: 'DECREMENT';
    setValue: 'SET_VALUE';
    setMax: 'SET_MAX';
    setMin: 'SET_MIN';
  };
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
  eventsCausingServices: {};
  eventsCausingGuards: {
    isMin: '';
    isMax: '';
  };
  eventsCausingDelays: {};
  matchesStates: 'counting' | 'max' | 'min';
  tags: never;
}
