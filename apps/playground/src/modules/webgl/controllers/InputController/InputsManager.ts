import { clamp } from "@mantine/hooks";
import {
  IControlsManager,
  IControlsManagerConstructor,
  IInputsManager
} from "./interfaces";
import {
  TControlAxis,
  TControlAxisValues,
  TControlsConfig,
  TControlType
} from "./types";

type ControllersMap = { [key in TControlType]?: number };

function shouldTrigger(options: TControlType[], type: TControlType) {
  return options.length === 0 || options.includes(type);
}

export class InputsManager implements IInputsManager {
  public running = false;
  public controllers: IControlsManager[];
  private cMap: ControllersMap;

  public values: TControlAxisValues;

  constructor(
    public config: TControlsConfig,
    controllers: IControlsManagerConstructor[] = []
  ) {
    this.controllers = [];
    this.cMap = {};
    // setup initial axis state
    this.values = {} as TControlAxisValues;
    this.setInitialValues();

    controllers.forEach((Controller) => {
      const c = new Controller(this);
      c.setup(this);
      this.cMap[c.type] = this.controllers.length;
      this.controllers.push(c);
    });
  }

  update() {
    this.running = this.controllers.some((c) => c.active);
  }

  receiveInput(axis: TControlAxis, value: number, source: TControlType) {
    let newValue: number;
    const current = this.values[axis];

    const shouldChange = (v: number) => current !== v;

    if (source === "keyboard") {
      // handle digital inputs from keyboard
      // TODO: should add an 'input_type' of sort on the controllers so
      // we can send digital inputs from the mouse/pad (buttons)
      newValue = clamp(current + value, -1, 1);
    } else {
      // for analog inputs we just assign the new value, at least for now
      newValue = clamp(value, -1, 1);
    }

    if (!shouldChange(newValue)) return;
    this.values[axis] = newValue;
  }

  start = (...values: TControlType[]) => {
    console.info('🎲 starting input manager')
    this.controllers.forEach(({ type, active, ...controller }) => {
      if (shouldTrigger(values, type) && !active) controller.start();
    });
    this.update();
  }
  stop = (...values: TControlType[]) => {
    console.info('🎲 stopping input manager')
    this.controllers.forEach(({ type, active, ...controller }) => {
      if (shouldTrigger(values, type) && active) {
        controller.stop();
      }
      this.setInitialValues();
    });
    this.update();
  }

  getController(type: TControlType): IControlsManager | null {
    const idx = this.cMap[type];
    if (!idx) return null;
    return this.controllers[idx];
  }

  setInitialValues() {
    this.values = Object.keys(this.config).reduce(
      (p, v) => ({ ...p, [v]: 0 }),
      {} as TControlAxisValues
    );
  }
}
