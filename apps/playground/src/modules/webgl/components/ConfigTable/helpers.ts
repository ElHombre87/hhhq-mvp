import { TControlType, TControlConfig, TControlsConfig } from "modules/webgl/controllers/InputController/types";
import { Icon } from "tabler-icons-react";

export const getIcon = (control: TControlType, icons: { [key in TControlType]: Icon }): Icon => icons[control];
export const splitCamelCase = (text: string): string[] => {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
};

export const cleanKeyValue = (text: string): string => {
  const s = splitCamelCase(text);
  return s[0] === "Key" ? s[1] : s.join(" ");
};

export const formatInputValue = (text: string, control: TControlConfig): string => {
  let value = text;
  if (control.controller === "mouse") {
    const direction = text === "y" ? "forward / backward" : "left / right";
    value = `${direction}`;
  }
  return cleanKeyValue(value);
};

export const getMaxInputsCount = (controls: TControlsConfig) => {
  let value = 0;
  Object.values(controls).forEach((control) => {
    control.forEach(({ inputs: { length } }) => {
      value = length > value ? length : value;
    });
  });
  return value;
};
