import { TControllerType } from "modules/webgl/controllers/InputController/types";
import { Icon, Keyboard, Mouse, DeviceGamepad2 } from "tabler-icons-react";

export const deviceIcons: { [key in TControllerType]: Icon } = {
  keyboard: Keyboard,
  mouse: Mouse,
  gamepad: DeviceGamepad2
};
