import { createMachine, assign } from 'xstate';

export type CounterEvents =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_MIN' }
  | { type: 'SET_MAX' }
  | { type: 'SET_VALUE'; payload: { value: number } };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const counterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwDo0tsBLTKAYkVAAdVZSzVMaQAPRAWgEYAGAOwEArHzEAOACwA2QdMl9pAGhABPbgCYAzDwJbRATj4bt4rRuHStAX2sriOfJQCSAOQDCAJQCiAWW+uACps9IzMrEgcmjwGInw8OjwWkgJ8ksIq6ghc0tLiBHwG0jySCjzCGpIG4rb2GI54lAAi3l5+AcGRoUykLGycCKIE4tpaxWkaAuLSwqWZ3Ln5hcWl8RVVNXYgDriNAMregQD6AGoAggAyAKreIQw9fZEDXAJaBTJFKcICkjw8AvNsosCkUSmV1tVatt6rtKAdjr4zgANO5hXoRUADDR8fJaIzCWYCf4EsxaQFcab5Sx-EzyYTiRQGKE7Jzwo6+Nyoh4YqLZLRaIQC7HVLTiWbSAw8cmUkTFBKS748Mw8WxbTCoCBwNgswg7chQLnhfrcKQEKaS9LCUXVIrKNTcSTYggaEYCDTSAQCEWTGxbHUEAC2AEMBnR7kanogYrFCmMDCZJFpHQYDGT7dkEm8xTj+TIeItpMyYfhA+RDejjXzJFSjJTZoJ9BpyUrhMNROIpPHqtWZEWSPhy49MdwhSJa3l668KuSDFbZX9fuZBI7NrYgA */
  createMachine(
    {
      context: { count: 0, max: 10, min: -5 },
      tsTypes: {} as import('./counter.machine.typegen').Typegen0,
      schema: { events: {} as CounterEvents },
      id: 'counter',
      initial: 'min',
      states: {
        counting: {
          always: [
            {
              cond: 'isMin',
              target: 'min',
            },
            {
              cond: 'isMax',
              target: 'max',
            },
          ],
        },
        max: {},
        min: {},
      },
      on: {
        INCREMENT: {
          actions: 'increment',
          target: '.counting',
        },
        DECREMENT: {
          actions: 'decrement',
          target: '.counting',
        },
        SET_VALUE: {
          actions: 'setValue',
          target: '.counting',
        },
        SET_MAX: {
          actions: 'setMax',
          target: '.max',
        },
        SET_MIN: {
          actions: 'setMin',
          target: '.min',
        },
      },
    },
    {
      actions: {
        increment: assign({
          count: (ctx) => ctx.count + 1,
        }),
        decrement: assign({
          count: (ctx) => ctx.count - 1,
        }),
        setMin: assign((ctx) => ({ ...ctx, count: ctx.min })),
        setMax: assign(({ max }) => ({ count: max })),
        setValue: assign(({ max, min }, { payload: { value } }) => ({
          count: clamp(value, min, max),
        })),
      },
      guards: {
        isMin: (ctx) => ctx.count <= ctx.min,
        isMax: (ctx) => ctx.count >= ctx.max,
      },
    }
  );

export default counterMachine;
