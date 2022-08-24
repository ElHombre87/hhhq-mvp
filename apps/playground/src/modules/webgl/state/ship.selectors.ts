import type { TMachineState } from "./ship.machine";
import { TShipContext } from "./ship.model";

export const isIdle = ({context}: TMachineState) => context.speed === 0;
export const isMoving = ({context}: TMachineState) => context.speed !== 0;

export const position = ({context}: TMachineState) => context.position;
export const rotation = ({context}: TMachineState) => context.rotation;
export const speed = ({context}: TMachineState) => context.speed;

export const currentState = (state: TMachineState) => state.value;
