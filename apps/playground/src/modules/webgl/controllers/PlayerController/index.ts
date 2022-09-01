/**
 * TODO: This module should replace the Speeds/Velocity classes, using what
 * works from those, to interface with the new InputsManager to do the same job:
 * Work as intermediary between the user (player) and the pawn/entity it's
 * supposed to control (ship/whatever).
 * 
 * Since we're using 3js, if we don't need to interact with react itself through
 * this system we can actually do EVERYTHING in here and call an `update` function
 * inside the `useFrame` fiber hook, moving `updateShipPosition` logic inside
 * this class, assigning it a reference for the controlled ship
 */

import { clamp } from "three/src/math/MathUtils";
import { isNearly } from "utils/math";
import { IInputsManager, InputConfigurationValues } from "../InputController";

/**
 * This is a copy of modules/helpers/state::Velocity (if it still exists)
 * and it has been copied over for clean up purposes.
 * TODO: Cleanup all files
 * TODO: Move into separate file with various state controllers (i.e.
 * Velocity w/o momentum, Digital inputs and whatnot)
 */
 export class VelocityWithMomentum {
  public current = 0;
  constructor(
    public max: number = 1,
    public acceleration = max / 100,
    public breakingFactor = 1,
  ) {}
  compute(amount: number, breaking?: boolean) {
    this.current = VelocityWithMomentum._compute(this, amount) + VelocityWithMomentum._break(this, breaking);
    return this.current;
  }
  /** enforces a slowing acceleration on this velocity vector */
  halt() {
    this.current = VelocityWithMomentum._compute(this, 0) + VelocityWithMomentum._break(this, true);
    return this.current;
  }
  private static _compute(self: VelocityWithMomentum, amount: number) {
    return clamp(self.current + (self.acceleration * amount), -self.max, self.max)
  }
  private static _break(self: VelocityWithMomentum, breaking?: boolean) {
    if (!breaking) return 0;
    if (isNearly(self.current, 0, self.acceleration)) return -self.current;
    return (self.current > 0 ? -self.acceleration : self.acceleration) * self.breakingFactor;
  }
}

export namespace PlayerController {

  export type Axis<Inputs extends IInputsManager> = Record<keyof Inputs['values'], VelocityWithMomentum>;
  export type Config<Inputs extends IInputsManager> = Record<keyof Inputs['values'], VelocityParams>;
  export type VelocityParams = ConstructorParameters<typeof VelocityWithMomentum>;
}

export class PlayerController<Inputs extends IInputsManager> {
  // Velocity maps based on configuration axis, INCLUDING rotation
  public readonly state: PlayerController.Axis<Inputs>;

  constructor(
    public readonly inputs: Inputs,
    config: Record<keyof Inputs['values'], PlayerController.VelocityParams>, //PlayerController.Config<Inputs>
  ) {
    const keys = Object.keys(inputs.values) as Array<keyof Inputs['values']>;

    this.state = keys.reduce((p, key) => ({
      ...p,
      [key]: new VelocityWithMomentum(...config[key] as PlayerController.VelocityParams)
    }), {} as PlayerController.Axis<Inputs>);
  }

  update() {
    this.inputs.update();
    const entries = Object.entries(this.state) as [keyof Inputs['values'], VelocityWithMomentum][];
    entries.forEach(([axis, velocity]) => {
      // FIXME: this `as type` is required because InputsManager is not dynamically typed
      // we need to generalize that class and all the types for this to work
      // smoothly
      const input = this.inputs.values[axis as keyof InputConfigurationValues];
      // TODO: Add a way to break with a key.
      // we need an ActionsMapping along with our axis control, basically.
      velocity.compute(input);
    });
  }
  get(axis: keyof Inputs['values']) {
    return this.state[axis].current;
  }
}
