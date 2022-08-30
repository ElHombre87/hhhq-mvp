import {
  TControlsConfig,
  TControlConfig,
  TControlType
} from "../types";

import { filterByInputValues } from "./findAxis";
import { extractAxisControls } from "./extractAxisControls";

export * from "./extractAxisControls";
export * from "./findAxis";

// Configuration helpers /////////////////////////////////////////////////////////////////////////////////////////////////

function defaultErrorFunction<T extends string>(filter: T): string {
  return `multiple controls found for "${filter.toUpperCase()}"`;
}

/** given a ControlsConfig object and an input (binding), execute a lookup in the configuration object,
 * ensures that there is only one with that input value, and returns an `ExtendedControlConfig`,
 * containing all the actual configuration for that input plus the controlled `axis` property name.
 */
export function extractAxisControlByInput(
  config: TControlsConfig,
  input: string
): TControlConfig | undefined {
  // @ts-ignore fix typings on return value
  return extractAxisControls(config, input, filterByInputValues, {
    multiple: false,
    error: defaultErrorFunction
  });
}

export function extractAxisControlByController(
  config: TControlsConfig,
  input: TControlType
): TControlConfig[] | [] {
  // @ts-ignore fix typings on return value
  return extractAxisControls(config, input, filterByInputValues, {
    multiple: true,
    error: (filter) => `error looking up bindings for ${filter}`
  });
}
