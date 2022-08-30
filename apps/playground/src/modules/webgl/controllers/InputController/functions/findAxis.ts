import { TControlConfig, TControlAxis, TControlsConfig, TControlType } from "../types";

// Configuration helpers /////////////////////////////////////////////////////////////////////////////////////////////////

export type FilterPredicate<T> = (param: T) => (entry: [axis: string, inputs: TControlConfig[]]) => boolean;

/** predicate for `findAxis` function that returns all controller configurations with the given `type` */
export  const filterByControlType: FilterPredicate<TControlType> = (type) => ([, options]) => {
  return options.filter(input => input.controller === type).length !== 0;
}

/** predicate for `findAxis` function that returns all controller configurations with the given key `binding` */
export  const filterByInputValues: FilterPredicate<string> = (binding) => ([, options]) => {
  return options.filter(input => input.inputs.includes(binding)).length !== 0;
}

/**
 * Lookup helper to search a given set of controls based on the provided predicate.
 * Predicate function should be a function that takes `[axis: string, TControlConfig[]] (object entries)
 * and returns `boolean`.
 * If search parameters are _dynamic_ the predicate can be set up as closure such as
 * ```ts
 *     const myPredicate = (name: string) => ([axis, options]) => options.filter(input => input.name === name);
 * ```
 * expected type for the predicate is `FilterPredicate<T>` found in this same module.
 * @param config Key bindings configuration to look up
 * @param predicate function to execute the search
 * @returns filtered dictionary (object) of controls configuration.
 */
export  function findAxis<T>(config: TControlsConfig, predicate: ReturnType<FilterPredicate<T>>): {[key in TControlAxis]?: TControlConfig[]} {
  const entries = Object.entries(config);
  return Object.fromEntries(entries.filter(entry => predicate(entry)))
}

export default findAxis;

