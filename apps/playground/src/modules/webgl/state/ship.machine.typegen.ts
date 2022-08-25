// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignRotation: 'SET_ROTATION';
    assignPosition: 'SET_POSITION';
    assignTransform: 'SET_TRANSFORM';
    rotate: 'ROTATE';
    resetAcceleration: '';
    resetSpeed: 'xstate.init';
    accelerate: 'START_ACCELERATE';
    changeSpeed: 'START_ACCELERATE' | 'START_DECELERATE';
    decelerate: 'START_DECELERATE';
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
    isIdle: '';
    isMaxSpeed: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'moving'
    | 'moving.default'
    | 'moving.accelerating'
    | 'moving.decelerating'
    | { moving?: 'default' | 'accelerating' | 'decelerating' };
  tags: never;
}
