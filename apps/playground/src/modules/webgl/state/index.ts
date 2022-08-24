import { model } from './ship.model';
export type { TShipContext, TShipEvent } from './ship.model';
const { initialContext } = model;
export { model as state, initialContext };

export { machine } from './ship.machine';
export type { TMachineState } from './ship.machine';
export * as selectors from './ship.selectors';
// export * from './ship.functions';
export * as inputs from './inputs';
