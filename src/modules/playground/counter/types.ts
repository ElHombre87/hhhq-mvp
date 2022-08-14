//@dev these should be inferred from the machine somehow
export type State = 'max' | 'min' | 'counting';

export type Event = 'INCREMENT' | 'DECREMENT' | 'SET_MIN' | 'SET_MAX';
export type IAction = {
  disabledOn: State;
  action: Event;
  icon: JSX.Element;
};
