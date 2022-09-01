import {
  TConfiguration,
  TControllerType
} from "../../libs/types";

type MaybeInitialized = { parent?: IInputsManager };
type Initialized = { parent: IInputsManager };
export type InputConfigurationValues = { [key: string]: number };

export interface IControlsManager {
  readonly type: TControllerType; // static property to identify the controller type
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
  config: TConfiguration;
  controllers: IControlsManager[];

  values: InputConfigurationValues;

  update(): void;
  start(...values: TControllerType[]): void;
  stop(...values: TControllerType[]): void;

  receiveInput(axis: string, value: number, source?: TControllerType): void;

  getController(type: TControllerType): IControlsManager | null;
}

export interface IInputsManagerConstructor {
  managers: IControlsManager[];
  new (
    config: TConfiguration,
    controllers: IControlsManagerConstructor[]
  ): IInputsManager;
}
