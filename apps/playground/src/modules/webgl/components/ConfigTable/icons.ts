import { TControllerType } from "modules/webgl/libs/types";
import { Icon, Keyboard, Mouse } from "tabler-icons-react";

export const deviceIcons: { [key in TControllerType]: Icon } = {
  keyboard: Keyboard,
  mouse: Mouse,
  // gamepad: DeviceGamepad2
};
