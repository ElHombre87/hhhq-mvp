
/**
 * Direction of movement on an Axis.
 * 1  - forward (camera/mesh relative)
 * 0  - stopped
 * -1 - backward (camera/mesh relative)
 */
export type Direction = 1 | 0 | -1;

/** Available movement options for the player */
export interface Movements {
  fwd: Direction
  strafe: Direction
  multiplier: number
  break: boolean
}

export type InputConfig = {
  fwd: string[];
  back: string[];
  left: string[];
  right: string[];
  boost: string[];
  break: string[];
  rollLeft: string[];
  rollRight: string[];
}
