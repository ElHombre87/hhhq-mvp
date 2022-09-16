export interface BaseStateAxisSettings {
  max: number;
  acceleration: number;
  inertial?: boolean;
  /** if false any breaking action won't have effect. defaults to `true` */
  shouldBreak?: boolean;
}
export interface StandardStateAxisSettings extends BaseStateAxisSettings {
  inertial?: false
}
export interface InertialStateAxisSettings extends BaseStateAxisSettings {
  max: number;
  acceleration: number;
  inertial: true;
  reset?: boolean;
  resetFactor?: number
}

export type StateAxisSettings = StandardStateAxisSettings | InertialStateAxisSettings;

export type StateTransform = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  // position: [x:number, y:number, z:number];
  // rotation: [x:number, y:number, z:number];
}
export interface ShipStateContext<Axis extends string, Actions extends string> {
  id: string;
  velocity: Record<Axis, number>;
  actions: Record<Actions, number>;
  settings: Record<Axis, StateAxisSettings>;
  transform: StateTransform;
}

// Event types ////////////////////////////////////////////////////////////////

export type UPDATE<Axis extends string, Actions extends string> = {
  type: 'UPDATE';
  values: Record<Axis | Actions, number>;
};
export type START = { type: 'START' };
export type STOP = { type: 'STOP' };
export type RESET = { type: 'RESET' };
export type UPDATE_TRANSFORM = StateTransform & {
  type: 'UPDATE_TRANSFORM';
}

export type ShipStateEvent<Axis extends string, Actions extends string> =
  | UPDATE<Axis, Actions>
  | STOP
  | START
  | RESET
  | UPDATE_TRANSFORM;
