export type TControlType = "keyboard" | "mouse" | "gamepad";

/** internal type used to set up the inputs configuration */
export type TControlConfiguration = {
  controller: TControlType;
  inputs: string[];
  scale?: number;
  name: string;
};

/** aggregate type of {[name of axis to control]: Control } */
export type TInputsConfiguration<
  T extends TControlConfiguration = TControlConfiguration
> = {
  forward: T[];
  left: T[];
  up: T[];
  yaw: T[];
  pitch: T[];
  roll: T[];
};

export type TControlAxis<K extends TControlsConfig = TControlsConfig> = keyof K;

export type TControlAxisValues = { [axis in TControlAxis]: number };

// can be used when a single object is required for all values
export type TControlConfig<C extends TControlConfiguration = TControlConfiguration> = C & { axis: TControlAxis };
export type TControlsConfig = TInputsConfiguration<TControlConfig>;
