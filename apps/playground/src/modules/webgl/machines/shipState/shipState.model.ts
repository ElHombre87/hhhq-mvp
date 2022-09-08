import { createModel } from "xstate/lib/model";
import { Vector3 } from 'three'
import type { Vector3 as Vec3Like } from '@react-three/fiber'
import { interpret } from "xstate";

export const model = createModel({
  position: new Vector3(),
  rotation: new Vector3(),
  speed: new Vector3(),
  acceleration: new Vector3(),
}, {
  events: {
    SET_POSITION: (pos: Vec3Like) => ({ pos: parseVec3(pos) }),
    SET_ROTATION: (rot: Vec3Like) => ({ rot: parseVec3(rot) }),
  }
});

export default model;

function parseVec3(v: Vec3Like): {x:number, y: number, z: number} {
  if (typeof v === 'number')
    return { x: v, y: v, z: v }
  if (v instanceof Vector3)
    return { x: v.x, y: v.y, z: v.z }
  // array values
  return { x: v[0], y:v[1], z:v[2] }
}

const machine = model.createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SET_POSITION: {
          actions: [
            model.assign((_, evt) => ({
              position: new Vector3(evt.pos.x, evt.pos.y, evt.pos.z),
            }))
          ]
        },
      },

    },
  }
});

export const service = interpret(machine).start();
