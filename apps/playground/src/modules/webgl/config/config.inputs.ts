import type { TInputsConfiguration, TControlsConfig } from "../controllers/InputController/types";

/** Configuration for axis inputs. */
/**
 * takes a TInputConfiguration object and parses it to finalize
 * its structure
 */
export function createConfig(c: TInputsConfiguration): TControlsConfig {
  const entries = Object.entries(c);
  const mapped = entries.map(([axis, controls]) => [
    axis,
    controls.map((control) => ({
      ...control,
      axis,
      type: control.type ?? 'digital',
      scale: control.scale ?? 1,
    }))
  ]);
  return Object.fromEntries(mapped);
}

export const config = createConfig({
  forward: [
    {
      name: "forward",
      controller: "keyboard",
      inputs: ["KeyW", "ArrowUp"],
      scale: 1
    },
    {
      name: "backward",
      controller: "keyboard",
      inputs: ["KeyS", "ArrowDown"],
      scale: -1
    }
  ],
  left: [
    {
      name: "strafe left",
      controller: "keyboard",
      inputs: ["KeyA", "ArrowLeft"],
      scale: 1
    },
    {
      name: "strafe right",
      controller: "keyboard",
      inputs: ["KeyD", "ArrowRight"],
      scale: -1
    }
  ],
  up: [
    {
      name: "strafe up",
      controller: "keyboard",
      inputs: ["KeyR"],
      scale: 1
    },
    {
      name: "strafe down",
      controller: "keyboard",
      inputs: ["KeyF"],
      scale: -1
    }
  ],
  yaw: [{ name: "yaw", controller: "mouse", inputs: ["x"], scale: 1, type: 'analog' }],
  pitch: [{ name: "pitch", controller: "mouse", inputs: ["y"], scale: -1, type: 'analog' }],
  roll: [
    {
      name: "roll left",
      controller: "keyboard",
      inputs: ["KeyQ"],
      scale: 1
    },
    {
      name: "roll right",
      controller: "keyboard",
      inputs: ["KeyE"],
      scale: -1
    }
  ]
});
