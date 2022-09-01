import { AControlsManager } from "./AControlsManager";

import type { IInputsManager } from "./interfaces";
import type { InputConfiguration } from "../../libs/types";

import { extractAxisControlByInput } from './functions';
import { centerNormalize } from "modules/webgl/helpers/math";

export class MouseManager extends AControlsManager {
  public readonly type = "mouse";
  private xAxisControl?: InputConfiguration;
  private yAxisControl?: InputConfiguration;

  setup(parent: IInputsManager) {
    if (super.setup(parent)) {
      const { config } = this.parent as IInputsManager;
      this.xAxisControl = extractAxisControlByInput(config, "x");
      this.yAxisControl = extractAxisControlByInput(config, "y");
      if (!this.xAxisControl && !this.yAxisControl)
        throw new Error("No bindings assigned to mouse movement!");
    }
  }

  update(event: KeyboardEvent) {}

  start() {
    window!.addEventListener("mousemove", this.handleMouseMove);
    super.start();
  }
  stop() {
    window!.removeEventListener("mousemove", this.handleMouseMove);
    super.stop();
  }

  private handleMouseMove = (event: MouseEvent) => {
    // TODO: Normalize values with either window/frame/dom element or use useFrame from three
    const w = window.innerWidth;
    const h = window.innerHeight;
    let { x, y } = event;

    if (this.xAxisControl)
      this.sendParent(
        this.xAxisControl.axis,
        centerNormalize(x, 0, w) * this.xAxisControl.scale,
        this.type
      );
    if (this.yAxisControl)
      this.sendParent(
        this.yAxisControl.axis,
        centerNormalize(y, 0, h) * this.yAxisControl.scale,
        this.type
      );
  };
}
