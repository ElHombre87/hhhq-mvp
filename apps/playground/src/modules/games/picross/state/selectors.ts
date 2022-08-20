import { InterpreterFrom } from "xstate";
import type { machine } from "./picross.machine";

type MachineState = InterpreterFrom<typeof machine>['state'];

/** state value selectors */
export const solved = (state: MachineState) => state.matches('ended');
export const playing = (state: MachineState) => state.matches('playing');

/** context selectors */
export const grid = ({context}: MachineState) => context.grid;
export const choices = ({context}: MachineState) => context.choices;
export const hints = ({context}: MachineState) => context.hints;
export const size = ({context}: MachineState) => ({ rows: context.rows, columns: context.columns });
export const seed = ({context}: MachineState) => context.seed;
export const progress = ({context}: MachineState) => context.progress;
