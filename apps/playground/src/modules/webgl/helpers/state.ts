/**
 * Helper functions and classes to handle state and stuff while we wait to set up
 * proper state management
 */

import { isNearly } from "utils/math"
import { clamp } from "three/src/math/MathUtils";
import { Movements, InputConfig } from "../types";
import { Vector3, Euler } from 'three';
import { GamePadController } from "./gamepad.controller";

export class Velocity {
  public current = 0;
  constructor(
    public max: number,
    public acceleration = max / 100,
    public breakingFactor = 1,
  ) {}
  compute(direction: number, breaking: boolean) {
    this.current = Velocity._compute(this, direction) + Velocity._break(this, breaking);
    return this.current;
  }
  
  private static _compute(self: Velocity, direction: number) {
    return clamp(self.current + (self.acceleration * direction), -self.max, self.max)
  }
  private static _break(self: Velocity, breaking: boolean) {
    if (!breaking) return 0;
    if (isNearly(self.current, 0, self.acceleration)) return -self.current;
    return (self.current > 0 ? -self.acceleration : self.acceleration) * self.breakingFactor;
  }
}

export class Speeds {
  constructor(
    public fwd: Velocity,
    public strafe: Velocity,
    public vertical: Velocity,
    // public pitch: number,
  ) {}
  update(moves: Movements, gamepad?: GamePadController) {
    this.fwd.compute(moves.translation.z, moves.break);
    this.strafe.compute(moves.translation.x, moves.break);
    this.vertical.compute(moves.translation.y, moves.break);

    // if a gamepad controller has not been provided do not use.
    // TODO: pass the option for the gamepad enabled
    if (!gamepad) return this;
    this.fwd.compute(-gamepad.pan.y, moves.break);
    this.strafe.compute(-gamepad.pan.x, moves.break);
    this.vertical.compute(gamepad.pan.z, moves.break);
    return this;
  }
}


export class InputController implements Movements {
  public translation = new Vector3();
  public rotation = new Euler();

  public roll: number = 0;
  public break: boolean = false;
  public multiplier: number = 1;

  public pitch: number = 0;

  constructor(private inputs: InputConfig) {
  }
  
  updateKeys = (event: KeyboardEvent) => {
    this.translation.set(
      InputController.evaluateAxis(this.translation.x, event, [this.inputs.left, 1], [this.inputs.right, -1]),
      InputController.evaluateAxis(this.translation.y, event, [this.inputs.up, 1], [this.inputs.down, -1]),
      InputController.evaluateAxis(this.translation.z, event, [this.inputs.fwd, 1], [this.inputs.back, -1]),
    )

    this.break = InputController._evaluate(this.inputs.break, this.break, event, true, false);

    this.roll = InputController._evaluate(this.inputs.rollRight, this.roll, event, -1, 0);
    this.roll = InputController._evaluate(this.inputs.rollLeft, this.roll, event, 1, 0);

    this.multiplier = InputController._evaluate(this.inputs.boost, this.multiplier, event, 2, 1);
  }

  private static _evaluate<T>(keys: string[], current: T, event: KeyboardEvent, keydown: T, keyup: T): T {
    const { code, type } = event;
    if (!keys.includes(code)) return current;
    return type === 'keydown' ? keydown : keyup
  }

  private static evaluateAxis = (current: number, event: KeyboardEvent, ...config: [keys: string[], press: number, release?:number][]) => {
    // if any of the provided key mapping didn't change return the current value (allows for multiple active axes)
    if (!config.find(([keys]) => keys.includes(event.code))) return current;

    return config.reduce((prev, [keys, press, release]) =>
      InputController._evaluate(keys, prev, event, press, release ?? 0), 0);
  }
}

/**
 *   
  let rotationMatrix = new THREE.Matrix4();
  let rotWorldMatrix = new THREE.Matrix4();

  const AxisX = new THREE.Vector3(1, 0, 0);
  const AxisY = new THREE.Vector3(0, 1, 0);

  function rotateAroundObjectAxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotationMatrix);                       // post-multiply
    object.rotation.setFromRotationMatrix(object.matrix, object.rotation.order);
  }
  function rotateAroundWorldAxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix, object.rotation.order);
  }
  function derp(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {
    let invWorldRot = object.getWorldQuaternion(new THREE.Quaternion()).invert();
    axis.applyQuaternion(invWorldRot);

    let deltaLocalRot = new THREE.Quaternion();
    deltaLocalRot.setFromAxisAngle(axis, radians);
    object.quaternion.multiply(deltaLocalRot);
  }
  target.updateWorldMatrix(true, true);
  // rotateAroundObjectAxis(target, AxisY, yaw.input);
  // derp(target, AxisX, clamp(pitch.input / 100, -pitch.max, pitch.max));
  rotateAroundObjectAxis(target, AxisY, clamp(degToRad(180*-yaw.input), -yaw.max, yaw.max));
 */
