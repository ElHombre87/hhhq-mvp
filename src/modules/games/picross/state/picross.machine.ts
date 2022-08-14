import type { ContextFrom, EventFrom } from "xstate";
import { createModel } from "xstate/lib/model";
import * as functions from './functions'
import type { TChoices, TGrid, TGridHints, THints, TSelection } from '../types';
import { progress } from "./selectors";


export const model = createModel(
  {
    rows: 5,
    columns: 5,
    seed: '' as string,
    grid: [] as TGrid,
    choices: [] as TChoices,
    hints: { rows: [], columns: [], } as TGridHints,
    /** count of truthy cells */
    count: 0,
    /** count of selected truthy cells by the player */
    selected: 0,
    /** ratio between count and selected */
    progress: 0,
    },
  {
    events: {
      CHANGE_SIZE: (rows:number, columns:number) => ({ rows, columns }),
      NEW_GAME: (rows?:number, columns?:number, seed?:string) => ({ rows, columns, seed }),
      CELL_CLICKED: (row: number, col: number, value: TSelection) => ({ row, col, value }),
      SOLVE: (derp: any) => ({ derp }),
      START: () => ({}),
      RESET: () => ({}),
      '': () => ({}), // always event. do NOT uses event payloads
    }
});

export type MPicrossContext = ContextFrom<typeof model>;
export type MPicrossEvent = EventFrom<typeof model>;

export const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5QAcCWBjATge1rAtALYCG6AFqgHZgB0qEANmAMQDKAKgIIBK7iKuVABdU2SvxAAPRPgCMAZgAMNRYoAcigOzyALACYAnADZF8+ZoA0IAJ4yDsmgbW7ZexXpOuAvl6tosuAQk5FS0sGBCAK7IzBLIgiJiEtII+PJuNCamTmoGmkbyAKw6VrYIeg5aTobqRrKasjo+fhg4eESkFNQ0yAzE1lRQbADyADIAagCicQmi4khSMkZGKubpqsZGhXV6pYiyiiuF7jpGGu6qhWbNIP5tQZ2hzADCABKcAHIA4pMA+qwASQAWtMFvFYMI5skZPJGjQ9NsCmd6vktIU9qk3AYaGodDpCgZFAcjAjDDc7oEOiFqMxuJNWJM+GDZkkFilZLJsZodLJCuczpo9M55Bi5ISaLp8YKDDoiby9D5fCBKNgIHA4q1KcEurR6EwZhDEvNQOyiTQdJoCUUijKCQpRU5zc4eZpuRpCpoDOTNe1taEaOEosgDZDWSaYYpCub7JG1MVNBo9AiHWonbpzHUSYK1AqlRTfY9ur1+oMQ0boak1JoaCjcoVjvX7MsMboVJ61InlkYDEpNN6AgXqbQwJQ1RAy1C2TJcTiXBVlms1hik8otvp64KDo10v37lSdROw4tUpLMqp5Dk8gViqK9JaJXiPQmjNz0oVFV4gA */
model.createMachine({
  tsTypes: {} as import('./picross.machine.typegen').Typegen0,
  id: 'picross-machine',
  initial: 'idle',
  on: {
    CHANGE_SIZE: {
      actions: 'updateSize',
      target: '.setup',
    },
    RESET: {
      description: 'resets the current game state',
      target: '.playing',
      actions: ['setupChoices'],
      internal: false,
    },
    NEW_GAME: {
      target: '.setup'
    }
  },
  states: {
    idle: {
      on: {
        START: {
          target: 'setup',
        },
      },
    },
    setup: {
      description: 'intermediate phase to set up last values',
      entry: ['setupNewGrid', 'setupHints', 'setupChoices'],
      always: 'playing',
    },
    playing: {
      on: {
        SOLVE: {
          actions: 'solve',
          target: 'ended',
        },
        CELL_CLICKED: {
          actions: ['handleCellClicked', 'evaluateSelected', 'evaluateProgress'],
        },
      },
    },
    ended: {},
  },
}, {
  actions: {
    // Setup actions //////////////////////////////////////////////////////////
    /** Change the size of the board */
    updateSize: model.assign((_, { rows, columns }) => ({ rows, columns })),
    setupNewGrid: model.assign(({ rows, columns }, event) => {
      let seed;
      // Check event and if seed is provided. if so use that
      if (event.type === 'NEW_GAME') { seed = event.seed; }
      // if seed is still missing generate a new one
      if (!seed) { seed = Date.now().toString() };
      
      const grid = functions.generate(rows, columns, seed);
      const count = grid.reduce((acc, value) => acc +(value ? 1 : 0), 0);
      return { grid, seed, count, selected: 0, progress: 0 }
    }),
    /** generate the hints for the current grid */
    setupHints: model.assign(({ grid, rows, columns }) => ({
      hints: {
        rows: functions.hints(grid, rows, columns),
        columns: functions.hints(grid, rows, columns, true),
      }
    })),
    /** generate an empty set of 'choices' and resets the stats */
    setupChoices: model.assign(({ rows, columns }) => ({
      choices: functions.choices(rows, columns),
      selected: 0,
      progress: 0,
    })),

    // User interaction callbacks /////////////////////////////////////////////
    handleCellClicked: model.assign(({choices, columns}, { row, col, value }) => ({
        choices: functions.updateValue(choices, row, col, columns, value),
    })),
    evaluateSelected: model.assign(({ choices }) => ({ selected: choices.reduce((acc, value) => acc + (value ? 1 : 0), 0) })),
    evaluateProgress: model.assign({ progress: ({selected, count}) => (selected / count) }),
    // endgame
    solve: model.assign({}),
  },
});
