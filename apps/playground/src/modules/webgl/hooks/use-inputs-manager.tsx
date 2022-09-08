import { useEffect } from "react";
import { config } from "../config/config.inputs";
import { InputsManager, KeyboardManager, MouseManager } from "../controllers/InputController";

export const inputs = new InputsManager(config, [KeyboardManager, MouseManager]);

export const useInputManager = () => {
  // useEffect(() => inputs.stop, []);
  return inputs;
}

class A {
  constructor(a: number, b: string) {}
}
