
import { TControlsConfig, TControlConfig } from "../types";

import findAxis, { filterByInputValues, filterByControlType } from "./findAxis";
import type { FilterPredicate } from "./findAxis";

// union required for type checking on EACReturnValue
type ExtractOptions<T = any> =
  | {
      multiple?: false;
      error?: (filter: T) => string;
    }
  | {
      multiple?: true;
      error?: (filter: T) => string;
    };

type MultiControl = TControlConfig[] | [];
type SingleControl = TControlConfig | undefined;


// FIXME: Apparently this type isn't exactly working.
// seems to be ok here but when using extractAxisControl it only works for one
// of the types, not caring about the dynamic type
type EACResult<O extends ExtractOptions> = O extends { multiple?: true }
  ? MultiControl
  : SingleControl;

const _defaultOptions = {
  multiple: false,
  error: (..._: any[]) => "error while extracting"
};

export function extractAxisControls<T>(
  config: TControlsConfig,
  filter: T,
  predicate: FilterPredicate<T>,
  options: ExtractOptions<T>
): EACResult<typeof options> {
  const opts = { ..._defaultOptions, ...options };
  const axisInputs = Object.entries(findAxis(config, predicate(filter))); // [string, TControlConfig[]][]

  if (!opts?.multiple) {
    if (axisInputs.length > 1) {
      throw new Error(`[extracAxisControl] ${opts.error!(filter)}`);
    }
    const [, conf] = axisInputs.flat() as [string, TControlConfig[]];
    return conf[0];
  }

  // extracts the axis keys, already mapped inside the TControlConfig
  const axisMapValues = Object.values(axisInputs).map((m) => m[1]);
  return axisMapValues.flat();
}
