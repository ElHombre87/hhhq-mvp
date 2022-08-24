import { createModel } from "xstate/lib/model";
import type { ContextFrom, EventFrom } from "xstate";
import * as THREE from "three";

/**
 * Ship state context for the ship state machine.
 *
 * TODO: If we want to be able to move in all directions (i.e. not just forward),
 * we may want to use a Vector3 instead of just a number for speed and acceleration
 * values (not for the increments though) and pass some parameters to the events,
 * either a Vec3 (or Quat) or a separate object with x, y [,z] values to compute the
 * new values to apply to the actual state. For those we could use Vector3 type
 * from the drei library that allows for different types to be passed.
 */
export const model = createModel({
  /** current position of the object */
  position: new THREE.Vector3(),
  /** current rotation of the object */
  rotation: new THREE.Euler(),
  /** current speed. added to `position` every tick */
  speed: 0,
  /** speed cap */
  maxSpeed: 0.25,
  /** speed delta for tick */
  acceleration: 0,
  /** speed increase for tick when accelerating */
  accelerationFactor: 0.01,
  /** speed decrease for tick when decelerating */
  decelerationFactor: -0.05,
  /** speed increment cap when accelerating */
  maxAcceleration: 0.005,
  /** speed decrement cap when braking/not accelerating */
  maxDeceleration: -0.05,
  /** rotational speed on the Y (vertical) axis */
  rotationSpeed: 0.0000005,
}, {
  events: {
    /** set directions */
    START_ACCELERATE: () => ({}),
    START_DECELERATE: () => ({}),
    STOP_ACCELERATE: () => ({}),
    STOP_DECELERATE: () => ({}),
    ROTATE: (direction: 1 | -1) => ({ direction }),
    // STOP_ROTATE: () => ({}),
    SET_ROTATION: (rotation: THREE.Euler) => ({rotation}),
    SET_POSITION: (position: THREE.Vector3) => ({position}),
    SET_TRANSFORM: (transform: {position?:THREE.Vector3, rotation?:THREE.Euler}) => (transform),
  }
});


export type TShipContext = ContextFrom<typeof model>;
export type TShipEvent = EventFrom<typeof model>;
