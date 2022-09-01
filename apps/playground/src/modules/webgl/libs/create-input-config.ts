import type {
  TConfiguration,
  TConfigurationSource,
  TControllerType,
  TInputType,
  UserInputConfiguration,
} from "./types";
import { OptionalPropertyOf, Optionals, } from "libs/types";

/**
 * Create and finalize an axis configuration object with safe typing
 * @param options extra arguments to provide for setting up the config object
 * @param options.defaults default values to apply to missing control configuration, if any
 *        note: object is required anyway even if empty.
 * @param config actual configuration parameters to finalize
 */
export function createConfiguration<
  Axis extends Readonly<string>,
  ControllerType extends TControllerType,
  InputType extends TInputType,
  InShape extends UserInputConfiguration<ControllerType, InputType, Axis>,
  Source extends TConfigurationSource<ControllerType, InputType, Axis, InShape>,
  Options extends {
    defaults: Defaults;
  },
  // defaults config shape, based on base TInputType and dynamic values.
  // properties of TInputType are added down internally
  DefaultsKeys extends Exclude<OptionalPropertyOf<InShape>, "name" | "axis">,
  Defaults = { [key in DefaultsKeys]: Exclude<InShape[key], undefined> }
>(
  options: Options,
  config: Source
): TConfiguration<keyof Source, ControllerType, InputType, InShape> {
  const entries = Object.entries(config) as [
    keyof Source,
    Source[keyof Source]
  ][];
  const baseDefaults = { scale: 1, type: "digital" };
  const finalize = (axis: keyof Source, control: InShape) => ({
    axis,
    name: axis,
    ...baseDefaults,
    ...options.defaults,
    ...control
  });
  const mapped = entries.map(([axis, controls]) => [
    axis,
    controls.map((control) => finalize(axis, control))
  ]);
  return Object.fromEntries(mapped);
}
