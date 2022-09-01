import { createConfiguration } from "../libs";


export const config = createConfiguration({
  defaults: {},
},{
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
