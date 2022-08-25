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
