// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    updateSize: 'CHANGE_SIZE';
    setupChoices: 'RESET' | 'CHANGE_SIZE' | 'NEW_GAME' | 'START';
    solve: 'SOLVE';
    handleCellClicked: 'CELL_CLICKED';
    evaluateSelected: 'CELL_CLICKED';
    evaluateProgress: 'CELL_CLICKED';
    setupNewGrid: 'CHANGE_SIZE' | 'NEW_GAME' | 'START';
    setupHints: 'CHANGE_SIZE' | 'NEW_GAME' | 'START';
  };
  internalEvents: {
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
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'setup' | 'playing' | 'ended';
  tags: never;
}
