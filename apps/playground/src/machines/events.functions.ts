// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable max-len */
/* eslint-disable */

///////////////////////////////////////////////////////////////////////////////
// @module machines/events.functions
//
// @description
// Contains utility functions to handle state and events.
//
// Working on some strongly typed event builders to make it easier to create
// events to pass down in the state machines.
// Issues:
// - Current issue is that the return value of the event builder can't interpet
//   the payload correctly and returns `unknown` which breaks the type system
//   for the `send` function of the state machines.
////////////////////////////////////////////////////////////////////////////////

/**
 * Generic base event with only type
 */
export type TEventSimple = { type: string };
export type TEventPayload<P = any> = { payload: P };
export type TEvent = TEventSimple | (TEventSimple & TEventPayload);
// union of all types for the given event or union of events
export type TActionType<E extends TEvent> = E['type'];

export function makeEvents<Event extends TEvent>() {
  // return eventBuilder;
  // function builder<T extends Event['type']>(type: T): { type: T };
  // function builder<T extends Event['type']>(type: T, payload:Extract<Event, { type: T }> extends { payload: infer TP } ? TP : never): { type: T, payload: typeof payload };
  // function builder<T extends Event['type']>(type: T, payload:Extract<Event, { type: T }>): { type: T, payload: typeof payload };
  function builder<T extends Event['type']>(
    ...args: Extract<Event, { type: T }> extends { payload: infer TPayload }
      ? [type: T, payload: TPayload]
      : [type: T]
  ) {
    if (args.length === 1) return { type: args[0] };
    return { type: args[0], payload: args[1] as typeof args[1] };
  }
  return builder;
}

// Testing section /////////////////////////////////////////////////////////////
const authEvent = makeEvents<LoginEvents>();
// const aa = authEvent('LOGIN', { userId: '' });
// const dd = authEvent('LOGOUT');
// const bb = authEvent('LOGIN');
// const cc = authEvent('LOGOUT', { not: 'valid' });

type _Login = { type: 'LOGIN'; payload: { userId: string } };
type _Logout = { type: 'LOGOUT' };
type LoginEvents = _Login | _Logout;

type Types<E extends TEvent> = E['type'];
let b: Types<LoginEvents>;
type Par<Event, T> = Extract<Event, { type: T }> extends { payload: infer TP } ? TP : never;
let p: Par<LoginEvents, 'LOGIN'>;

// const authEvent = makeEvents<TEvents['user']>();
const login = (userId: string) => authEvent('LOGIN', { userId });
const logout = () => authEvent('LOGOUT');
