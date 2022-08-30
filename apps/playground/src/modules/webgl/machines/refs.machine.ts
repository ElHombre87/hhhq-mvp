import { useSelector } from "@xstate/react";
import { MutableRefObject } from "react";
import { Camera, Object3D } from "three";
import { ContextFrom, EventFrom, interpret, State } from "xstate";
import { createModel } from "xstate/lib/model";

const initialContext = {
  ship: null! as MutableRefObject<Object3D>,
  mesh: null! as MutableRefObject<Object3D>,
  camera: null! as MutableRefObject<Camera>,
  target: null! as MutableRefObject<Object3D>,
  canvas: null! as MutableRefObject<HTMLCanvasElement>,
} as const;

// possible ref names in context
export type Ref3DName = keyof typeof initialContext;
// ref type
export type RefObj<T> = T extends MutableRefObject<infer R> ? R : never;

export type Ref3DObject<K extends Ref3DName> = typeof initialContext[K];

type A = Ref3DObject<'camera'>

const model = createModel({
  ...initialContext
}, {
  events: {
    SET_REF: <N extends Ref3DName>(name: N, obj: typeof initialContext[N]) => ({ name, obj }),
  }
});

type Ctx = ContextFrom<typeof model>;
type Evt = EventFrom<typeof model>;

export const refsMachine = model.createMachine({
  id: 'react-refs-state',
  tsTypes: {} as import("./refs.machine.typegen").Typegen0,
  schema: {
    context: {} as Ctx,
    events: {} as Evt,
  },
  initial: 'default',
  states: {
    default: {
      on: {
        SET_REF: {
          actions: [
            model.assign((_, {name, obj}) => ({ [name]: obj })),
            // (ctx, { name, obj }) => console.info('refs updated', name, obj, ctx),
          ],
        }
      },

    }
  }
}, {})

export const service = interpret(refsMachine).start();

export const use3dRef = <N extends Ref3DName>(name: N): Ref3DObject<N> => useSelector(service, state => state.context[name]);

export const useShip = () => use3dRef('ship');
export const useMesh = () => use3dRef('mesh');
export const useCamera = () => use3dRef('camera');
export const useTarget = () => use3dRef('target');
export const useCanvas = () => use3dRef('canvas');

export const sendRef = <N extends Ref3DName>(name: N, obj:Ref3DObject<N>) => {
  service.send('SET_REF', {name, obj })
}
