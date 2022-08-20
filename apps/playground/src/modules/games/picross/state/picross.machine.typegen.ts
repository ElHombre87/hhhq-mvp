// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
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
  eventsCausingActions: {
    evaluateProgress: 'CELL_CLICKED';
    evaluateSelected: 'CELL_CLICKED';
    handleCellClicked: 'CELL_CLICKED';
    setupChoices: 'CHANGE_SIZE' | 'NEW_GAME' | 'RESET' | 'START';
    setupHints: 'CHANGE_SIZE' | 'NEW_GAME' | 'START';
    setupNewGrid: 'CHANGE_SIZE' | 'NEW_GAME' | 'START';
    solve: 'SOLVE';
    updateSize: 'CHANGE_SIZE';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'ended' | 'idle' | 'playing' | 'setup';
  tags: never;
}
