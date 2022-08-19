import { createModel } from 'xstate/lib/model';
/**
 * @dev not used yet
 */
export const counterModel = createModel(
  {
    count: 0,
    max: 10,
  },
  {
    events: {
      // increment: (value: number) => ({ count: value + 1 }),
      // decrement: (value: number) => ({ count: value - 1 }),
      // setMin: () => ({ count: 0 }),
      // setMax: ({ max }: { max: number }) => ({ count: max }),
      // setValue: ({ max }: { max: number }, { value }: { value: number }) => ({
      //   count: value <= 0 ? 0 : value >= max ? max : value,
      // }),
    },
  }
);
