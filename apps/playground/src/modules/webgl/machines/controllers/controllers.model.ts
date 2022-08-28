import { createModel } from "xstate/lib/model";
import { ContextFrom, EventFrom } from 'xstate';

export const model = createModel({
  useMouse: false,
  useGamepad: false,
  gamepads: [] as string[],
  activePad: '',
}, {
  events :{
    ADD_GAMEPAD: (name: string) => ({ name }),
    REMOVE_GAMEPAD: (name: string) => ({ name }),
    SET_GAMEPAD: (name: string) => ({ name }),
    GAMEPADS_CHANGED: (gamepads: Gamepad[]) => ({ gamepads }),
    TOGGLE_GAMEPAD: () => ({}),
    TOGGLE_MOUSE: () => ({}),
  }
});

export default model;
