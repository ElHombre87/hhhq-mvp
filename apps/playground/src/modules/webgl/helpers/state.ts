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
  public turn: Direction = 0;
  public break: boolean = false;
  public multiplier: number = 1;

  public pitch: number = 0;

  private inputs: InputConfig<string[]>;
  
  constructor(_inputs: InputConfig<string|string[]>) {
    this.inputs = Object.entries(_inputs).reduce(
      (p, [k, v]) => ({...p, [k]: Array.isArray(v) ? v : [v]}),
      {} as InputConfig<string[]>);
  }
  
  updateKeys = (event: KeyboardEvent) => {
    this.fwd = InputController.evaluate(this.inputs.fwd, this.fwd, event, 1, 0);
    this.fwd = InputController.evaluate(this.inputs.back, this.fwd, event, -1, 0);
    this.strafe = InputController.evaluate(this.inputs.left, this.strafe, event, 1, 0);
    this.strafe = InputController.evaluate(this.inputs.right, this.strafe, event, -1, 0);
    this.break = InputController.evaluate(this.inputs.break, this.break, event, true, false);

    this.turn = InputController.evaluate(this.inputs.turnRight, this.turn, event, -1, 0);
    this.turn = InputController.evaluate(this.inputs.turnLeft, this.turn, event, 1, 0);

    this.multiplier = InputController.evaluate(this.inputs.boost, this.multiplier, event, 2, 1);
  }

  static evaluate<T>(keys: string[], current: T, event: KeyboardEvent, keydown: T, keyup: T): T {
    const { code, type } = event;
    if (!keys.includes(code)) return current;
    return type === 'keydown' ? keydown : keyup
  }

}
