/**
 * Helper functions and classes to handle state and stuff while we wait to set up
 * proper state management
 */

import { isNearly } from "utils/math"

 export enum MoveOptions {
  STOP=0,
  POS=1,
  NEG=-1,
}
export interface Movements {
  fwd: MoveOptions
  strafe: MoveOptions
  multiplier: number
  break: boolean
}

export class Velocity {
  public current = 0;
  constructor(
    public max: number,
    public acceleration = max / 100,
    public breakingFactor = 1,
  ) {}
  compute(direction: MoveOptions, breaking: boolean) {
    this.current = Velocity._compute(this, direction) + Velocity._break(this, breaking);
    return this.current;
  }

  private static _compute(self: Velocity, direction: MoveOptions) {
    return Math.min(self.max, Math.max(self.current + (self.acceleration * direction), -self.max))
  }
  private static _break(self: Velocity, breaking: boolean) {
    if (!breaking) return 0;
    if (isNearly(self.current, 0, self.acceleration)) return -self.current;
    return (self.current > 0 ? -self.acceleration : self.acceleration) * self.breakingFactor;
  }
  public toString(a:string) {
    return `${a} - s: ${this.current} [max: ${this.max}|acc ${this.acceleration}]`
  }
}

export class Speeds {
  constructor(
    public fwd: Velocity,
    public strafe: Velocity,
  ) {}
  update(moves: Movements) {
    this.fwd.compute(moves.fwd, moves.break);
    this.strafe.compute(moves.strafe, moves.break);
    return this;
  }
}


export type Direction = 1 | 0 | -1;
export interface InputConfig<T extends string|string[] = string> {
  fwd: T;
  back: T;
  left: T;
  right: T;
  boost: T;
  break: T;
  turnLeft: T;
  turnRight: T;
}
export class InputController {
  public fwd: Direction = 0;
  public strafe: Direction = 0;
  public turn: Direction = 0;
  public break: boolean = false;
  public multiplier: number = 1;
  private inputs: InputConfig<string[]>;
  constructor(_inputs: InputConfig<string|string[]>) {
    this.inputs = Object.entries(_inputs).reduce(
      (p, [k, v]) => ({...p, [k]: Array.isArray(v) ? v : [v]}),
      {} as InputConfig<string[]>);
  }
  
  update = (event: KeyboardEvent) => {
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
