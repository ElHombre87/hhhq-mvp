import {
  TControlAxis,
  TControlAxisValues,
  TControlsConfig,
  TControlType
} from "./types";

type MaybeInitialized = { parent?: IInputsManager };
type Initialized = { parent: IInputsManager };

export interface IControlsManager {
  readonly type: TControlType; // static property to identify the controller type
  // parent: IInputsManager;
  active: boolean;

  /** allows the InputsManager to complete setting up the controller */
  setup<T extends MaybeInitialized>(
    parent: IInputsManager
  ): this is T & Initialized;
  /** Trigger a component update with some event
   * TODO: Generalize the Event so that we can actually pass down what we need
   * @deprecated
   */
  update: (event: KeyboardEvent) => void;

  start(): void;
  stop(): void;
}

export interface IControlsManagerConstructor {
  new (parent: IInputsManager): IControlsManager;
}

/**
 * Parent Input manager. Wraps, controls and uses an unspecified number of IControlsManager
 * objects to update its internal status of the desired user input.
 */
export interface IInputsManager {
  running: boolean;
  config: TControlsConfig;
  controllers: IControlsManager[];

  values: TControlAxisValues;

  start(...values: TControlType[]): void;
  stop(...values: TControlType[]): void;

  receiveInput(axis: TControlAxis, value: number, source?: TControlType): void;
}

export interface IInputsManagerConstructor {
  managers: IControlsManager[];
  new (
    config: TControlsConfig,
    controllers: IControlsManagerConstructor[]
  ): IInputsManager;
}
