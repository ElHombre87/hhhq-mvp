import { TShipEvent } from "./ship.model";

enum KEYS {
    LEFT = 'ArrowLeft',
    UP = 'ArrowUp',
    RIGHT = 'ArrowRight',
    DOWN = 'ArrowDown',
    W = 'KeyW',
    A = 'KeyA',
    S = 'KeyS',
    D = 'KeyD',
    SPACE = 'Space',
    Q = 'KeyQ',
    E = 'KeyE',
    Z = 'KeyZ',
};

type KeypressEvents = TShipEvent | {type: 'NONE' | 'RESET_POSITION' }

export function handleKeypress(e: KeyboardEvent): KeypressEvents {
  const { code, type } = e;
  switch (code) {
    case KEYS.W:
    case KEYS.UP:
      return { type: type === 'keydown' ? "START_ACCELERATE" : "STOP_ACCELERATE"};
    case KEYS.S:
    case KEYS.DOWN:
      return { type: type === 'keydown' ? "START_DECELERATE" : "STOP_ACCELERATE"};

    case KEYS.Z:
      return { type: "RESET_POSITION" };
    // case KEYS.LEFT:
    // case KEYS.RIGHT:
    case KEYS.A:
      return { type: type === 'keydown' ? 'ROTATE' : "NONE", direction: 1 };
    case KEYS.D:
      return { type: type === 'keydown' ? 'ROTATE' : "NONE", direction: -1 };
    case KEYS.SPACE:
    case KEYS.Q:
    case KEYS.E:
    default:
      return { type: "NONE" };
  }
}
