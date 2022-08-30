import { AControlsManager } from "./AControlsManager";
import { TControlConfig, TControlAxis, TControlType } from "./types";

function matchingBinding(
  manager: KeyboardManager,
  mappings: TControlConfig[],
  eventCode: string
) {
  return mappings.filter(
    ({ controller, inputs: value, scale }) =>
      controller === manager.type && value.includes(eventCode)
  )[0];
}

export class KeyboardManager extends AControlsManager {
  public readonly type: TControlType = "keyboard";

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
      if (key) this.sendParent(axis as TControlAxis, key.scale, this.type);
    });
  };

  private handleKeyUp = ({ code }: KeyboardEvent) => {
    if (!this.isInitialized()) return;
    const { config } = this.parent;
    Object.entries(config).forEach(([axis, mappings]) => {
      const key = matchingBinding(this, mappings, code);
      if (key) this.sendParent(axis as TControlAxis, -key.scale, this.type);
    });
  };
}
