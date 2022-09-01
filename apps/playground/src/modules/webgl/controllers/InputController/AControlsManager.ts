import { IControlsManager, IInputsManager } from "./interfaces";
import { InputsManager } from "./InputsManager";
import { TControllerType } from "../../libs/types";

type MaybeInitialized = { parent?: IInputsManager };
type Initialized = { parent: IInputsManager };

export abstract class AControlsManager implements IControlsManager {
  public active = false;
  public abstract readonly type: TControllerType;
  public parent?: IInputsManager = undefined;

  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  setup<T extends MaybeInitialized>(
    parent: IInputsManager
  ): this is T & Initialized {
    if (this.isInitialized(this)) return true;
    if (!parent) return false;

    this.parent = parent;
    return true;
  }
  update(event: KeyboardEvent) {}
  start() {
    if (!this.isInitialized()) return;
    this.active = true;
  }
  stop() {
    if (!this.isInitialized()) return;
    this.active = false;
  }
  /** Communicate to the parent InputsManager changes in the inputs */
  sendParent = (...args: Parameters<IInputsManager["receiveInput"]>) => {
    if (this.isInitialized()) {
      this.parent.receiveInput(...args);
    }
  };
  protected isInitialized<T extends MaybeInitialized>(
    obj = this
  ): this is T & Initialized {
    return this.parent instanceof InputsManager;
  }
}
