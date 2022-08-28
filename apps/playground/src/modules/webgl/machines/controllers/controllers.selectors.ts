import { ControllersState } from "./controllers.types";


export const useGamepad = (state: ControllersState) => state.context.useGamepad;
export const useMouse = (state: ControllersState) => state.context.useMouse;
export const activePad = (state: ControllersState) => state.context.activePad;
export const gamepads = (state: ControllersState) => state.context.gamepads;
