import { AControlsManager } from "./AControlsManager";
import { InputConfiguration, TControllerType } from "../../libs/types";

function matchingBinding(
  manager: KeyboardManager,
  mappings: Readonly<InputConfiguration[]>,
  eventCode: string
) {
  return mappings.filter(
    ({ controller, inputs: value, scale }) =>
      controller === manager.type && value.includes(eventCode)
  )[0];
}

export class KeyboardManager extends AControlsManager {
  public readonly type: TControllerType = "keyboard";

  update(event: KeyboardEvent) {}

  start() {
    if (!this.isInitialized()) return;
    if (this.active) return;
    window!.addEventListener("keydown", this.handleKeyPress);
    window!.addEventListener("keyup", this.handleKeyUp);
    super.start();
  }
  stop() {
    if (!this.isInitialized()) return;
    window!.removeEventListener("keydown", this.handleKeyPress);
    window!.removeEventListener("keyup", this.handleKeyUp);
    super.stop();
  }

  private handleKeyPress = ({ code }: KeyboardEvent) => {
    if (!this.isInitialized()) return;
    const { config } = this.parent;
    Object.entries(config).forEach(([axis, mappings]) => {
      const key = matchingBinding(this, mappings, code);
      if (key) this.sendParent(axis, key.scale, this.type);
    });
  };

  private handleKeyUp = ({ code }: KeyboardEvent) => {
    if (!this.isInitialized()) return;
    const { config } = this.parent;
    Object.entries(config).forEach(([axis, mappings]) => {
      const key = matchingBinding(this, mappings, code);
      if (key) this.sendParent(axis, -key.scale, this.type);
    });
  };
}
