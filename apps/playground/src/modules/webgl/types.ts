import { Vector3 } from "three";

/** Available movement options for the player */
export interface Movements {
  translation: Vector3;
  multiplier: number
  break: boolean
}

export type InputConfig = {
  fwd: string[];
  back: string[];
  left: string[];
  right: string[];
  up: string[];
  down: string[];
  boost: string[];
  break: string[];
  rollLeft: string[];
  rollRight: string[];
}
