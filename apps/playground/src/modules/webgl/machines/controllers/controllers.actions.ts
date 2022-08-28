import { model } from './controllers.model';


export const addGamepad = model.assign((ctx, { name }) => {
  if (ctx.gamepads.includes(name)) return {};
  return { gamepads: [...ctx.gamepads, name], }
}, 'ADD_GAMEPAD');

export const removeGamepad = model.assign((ctx, { name }) => ({
  gamepads: [...ctx.gamepads.filter((gp => gp !== name))],
}), 'REMOVE_GAMEPAD');

export const setGamepad = model.assign((ctx, { name }) => {
  if (!ctx.gamepads.includes(name)) return {}
  return { activePad: name };
}, 'SET_GAMEPAD');
export const gamepadsChanged = model.assign((_, { gamepads }) => ({
  gamepads: [...new Set(gamepads.map(gp => gp.id))],
}), 'GAMEPADS_CHANGED');

export const toggleMouse = model.assign((ctx) => ({ useMouse: !ctx.useMouse }), 'TOGGLE_MOUSE');
export const toggleGamepad = model.assign((ctx) => ({ useGamepad: !ctx.useGamepad }), 'TOGGLE_GAMEPAD');
