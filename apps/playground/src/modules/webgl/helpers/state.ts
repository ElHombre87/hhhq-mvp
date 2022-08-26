/**
 * Helper functions and classes to handle state and stuff while we wait to set up
 * proper state management
 */

import { isNearly } from "utils/math"
import { clamp, degToRad } from "three/src/math/MathUtils";
import { Movements, Direction, InputConfig } from "../types";

export class Velocity {
  public current = 0;
  constructor(
    public max: number,
    public acceleration = max / 100,
    public breakingFactor = 1,
  ) {}
  compute(direction: Direction, breaking: boolean) {
    this.current = Velocity._compute(this, direction) + Velocity._break(this, breaking);
    return this.current;
  }
  
  private static _compute(self: Velocity, direction: Direction) {
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
    // public pitch: number,
  ) {}
  update(moves: Movements) {
    this.fwd.compute(moves.fwd, moves.break);
    this.strafe.compute(moves.strafe, moves.break);
    return this;
  }
}


export class InputController {
  public fwd: Direction = 0;
  public strafe: Direction = 0;
  public roll: Direction = 0;
  public break: boolean = false;
  public multiplier: number = 1;

  public pitch: number = 0;

  // private inputs: InputConfig;
  
  constructor(private inputs: InputConfig) {
  }
  
  updateKeys = (event: KeyboardEvent) => {
    this.fwd = InputController.evaluate(this.inputs.fwd, this.fwd, event, 1, 0);
    this.fwd = InputController.evaluate(this.inputs.back, this.fwd, event, -1, 0);
    this.strafe = InputController.evaluate(this.inputs.left, this.strafe, event, 1, 0);
    this.strafe = InputController.evaluate(this.inputs.right, this.strafe, event, -1, 0);
    this.break = InputController.evaluate(this.inputs.break, this.break, event, true, false);

    this.roll = InputController.evaluate(this.inputs.rollRight, this.roll, event, -1, 0);
    this.roll = InputController.evaluate(this.inputs.rollLeft, this.roll, event, 1, 0);

    this.multiplier = InputController.evaluate(this.inputs.boost, this.multiplier, event, 2, 1);
  }

  static evaluate<T>(keys: string[], current: T, event: KeyboardEvent, keydown: T, keyup: T): T {
    const { code, type } = event;
    if (!keys.includes(code)) return current;
    return type === 'keydown' ? keydown : keyup
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
