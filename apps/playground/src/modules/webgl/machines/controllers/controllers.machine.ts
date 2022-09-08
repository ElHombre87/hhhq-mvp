import { model } from "./controllers.model";
import { addGamepad, removeGamepad, setGamepad, toggleMouse, toggleGamepad, gamepadsChanged } from './controllers.actions';
import type { ControllerContext, ControllerEvent } from "./controllers.types";

export const MACHINE_ID = 'controllers-machine';

export const machine = model.createMachine({
  id: MACHINE_ID,
  initial: 'default',
  context: model.initialContext,
  predictableActionArguments: true,
  schema: {
    context: {} as ControllerContext,
    events: {} as ControllerEvent,
  },
  tsTypes: {} as import("./controllers.machine.typegen").Typegen0,
  states: {
    default: {
      on: {
        ADD_GAMEPAD: { actions: addGamepad },
        REMOVE_GAMEPAD: { actions: removeGamepad },
        SET_GAMEPAD: { actions: setGamepad },
        TOGGLE_MOUSE: { actions: toggleMouse },
        TOGGLE_GAMEPAD: { actions: toggleGamepad },
        GAMEPADS_CHANGED: { actions: gamepadsChanged },
      }
    }
  }
}, {});

export default machine;
