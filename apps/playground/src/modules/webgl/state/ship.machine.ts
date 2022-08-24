import { model, TShipContext, TShipEvent } from './ship.model'
import { isIdle, isMaxSpeed, isMoving } from './ship.functions'
import { InterpreterFrom } from 'xstate';
import * as THREE from 'three';

export const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5SwBYEsAOBaWAXAhrmAHRoQA2YAxAIIDCdAogDKMBKNAKo4qBgPaw0uNPwB2vEAA9EWAMwA2ABzEALHKUAGVQEYATEr0B2VQtWqANCACeiOQE4dxRUdeLHuhXrkBfH1dRMHAIiYgBbfgA3NDEoKkkBIRFxSRkELABWTTliJXtNDIz7VS0dTW8Mq1sELxyMnSMGuTkMloUdDL8A9Gw8QmoAZUZOAH02AHlOLgBJcYA5BMFhUQkkaUQ9HXtibLMFTU0jDKMC+z0qu00FYgzVe1b7RyNlJQ6-fxAxfgg4SUDekIkMiURZJFapWRmba7RTaHTqLJKC4IVTaYj2DRKDIKIx6QoOToff7BfrhKIxKDEH4AM3wAFdyLhQcsUms0qjiO1NEpVEYlEozC09AoFMjWioCkZHI8tpiuiBiX1QhForFiPgAMYasCUABOhApzOSq1AaU2nLKSjkqj09i5ej0lhsiH210lxVMRjkem5SnlisBZNVlJ+2r1BtiRvBbI2mlyPNtRx9Ip0OjMyN5ccleXqCkKOL0-p6JOV5Mja0SLJN63SOVTx3KvIxmMUyIcEuOjnqVoyBlURaCSrAUdZpshXp2ilhugR3LbW2cOKO9xxxx57x8QA */
model.createMachine({
  predictableActionArguments: true,
  schema: {
    context: {} as TShipContext,
    events: {} as TShipEvent,
  },
  tsTypes: {} as import('./ship.machine.typegen').Typegen0,
  id: 'ship-state',
  initial: 'idle',
  on: {
    SET_ROTATION: { actions: 'assignRotation' },
    SET_POSITION: { actions: 'assignPosition' },
    SET_TRANSFORM: { actions: 'assignTransform' },
    ROTATE: { actions: 'rotate' },
    // STOP_ROTATE: { actions: 'stopRotate' },
  },
  states: {
    idle: {
      always: [
        {
          cond: isMoving,
          target: 'moving',
        }
      ],
      on: {
        START_ACCELERATE: {
          target: 'moving.accelerating',
        },
      },
    },
    moving: {
      initial: 'default',
      exit: ['resetSpeed', 'resetAcceleration'],
      states: {
        default: {
          always: {
            cond: 'isIdle',
            target: '#ship-state.idle',
          },
          on: {
            START_ACCELERATE: { target: 'accelerating' },
            START_DECELERATE: { target: 'decelerating' },
          }
        },
        accelerating: {
          entry: ['accelerate', 'changeSpeed'],
          always: {
            cond: 'isMaxSpeed',
            target: 'default',
            actions: 'resetAcceleration',
          },
          on : {
            START_ACCELERATE: {
              // actions: ['accelerate'],
              target: 'accelerating',
            },
            STOP_ACCELERATE: {
              target: 'default',
            }
          }
        },
        decelerating: {
          entry: ['decelerate', 'changeSpeed'],
          always: {
            cond: 'isIdle',
            target: '#ship-state.idle',
          },
          on : {
            START_DECELERATE: {
              // actions: ['decelerate'],
              target: 'decelerating',
            },
            STOP_DECELERATE: {
              target: 'default',
            }
          },
        }
      },
    },
  },
}, {
  guards: {
    isIdle,
    isMaxSpeed,
  },
  actions: {
    assignRotation: model.assign((ctx, {rotation}) => {
      if (ctx.rotation === rotation) return {}
      const { x, y, z, order } = rotation;
      return {
        rotation: new THREE.Euler( x, y, z, order),
      }
    }),
    // @ts-ignore
    assignTransform: model.assign((ctx, {position, rotation}) => {
      if (ctx.position === position) position = ctx.position;
      if (ctx.rotation === rotation) rotation = ctx.rotation;
      return { position, rotation }
    }),
    assignPosition: model.assign((ctx, {position}) => {
      if (ctx.position === position) return {}
      return { position: new THREE.Vector3(position.x, position.y, position.z) }
    }),
    // @ts-ignore
    accelerate: model.assign((ctx) => {
      const newAcc = Math.min(ctx.acceleration + ctx.accelerationFactor, ctx.maxAcceleration);
      return {
        acceleration: newAcc,
        speed: Math.min(ctx.maxSpeed, Math.max(ctx.speed + newAcc, 0))
      }
    }),
    decelerate: model.assign((ctx) => {
      const newAcc = Math.max(ctx.acceleration + ctx.decelerationFactor, ctx.maxDeceleration);
      return {
        acceleration: newAcc,
        speed: Math.min(ctx.maxSpeed, Math.max(ctx.speed + newAcc, 0))
      }
    }),
    // @ts-ignore
    resetSpeed: model.assign(() => ({ speed: 0 })),
    // @ts-ignore
    resetAcceleration: model.assign(() => ({ acceleration: 0 })),
    // @ts-ignore
    changeSpeed: model.assign((ctx) => ({
      speed: Math.min(ctx.maxSpeed, Math.max(ctx.speed + ctx.acceleration, 0)),
    })),
    rotate: model.assign(({rotation, rotationSpeed}, evt) => ({
      rotation: new THREE.Euler(
        rotation.x,
        rotation.y + (rotationSpeed * evt.direction),
        rotation.z,
        rotation.order)
      }
    )),
  },
});

export type TMachineState = InterpreterFrom<typeof machine>['state'];
