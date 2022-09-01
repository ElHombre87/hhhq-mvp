import { Vector3 } from "three";
import type { InputConfig } from '../types';

/**
 * Abstraction of anything that can control the 'player' providing inputs
 * being a keyboard/mouse, gamepad or network data in case of multiplayer.
 * Values should be evaluated and mapped directly from the inputs
 */
export interface IInputController {
  config: InputConfig;
  /** inputs for strafe, fwd/back, elevation */
  translation: Vector3;
  /** inputs for yaw pitch and roll */
  rotation: Vector3;
  breaks: boolean;

  update(dt: number): void;
}
export interface IPlayerController {
  controller: IInputController;
  update(dt: number): void;

}
