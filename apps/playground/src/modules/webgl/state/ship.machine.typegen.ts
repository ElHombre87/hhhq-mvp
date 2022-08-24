// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
    'xstate.stop': { type: 'xstate.stop' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    accelerate: 'START_ACCELERATE';
    assignPosition: 'SET_POSITION';
    assignRotation: 'SET_ROTATION';
    assignTransform: 'SET_TRANSFORM';
    changeSpeed: 'START_ACCELERATE' | 'START_DECELERATE';
    decelerate: 'START_DECELERATE';
    resetAcceleration: '' | 'xstate.stop';
    resetSpeed: '' | 'xstate.stop';
    rotate: 'ROTATE';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isIdle: '';
    isMaxSpeed: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'moving'
    | 'moving.accelerating'
    | 'moving.decelerating'
    | 'moving.default'
    | { moving?: 'accelerating' | 'decelerating' | 'default' };
  tags: never;
}
