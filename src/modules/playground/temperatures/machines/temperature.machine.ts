import { assign, createMachine } from 'xstate';
import * as functions from '../functions';

export type TemperatureEvent =
  | { type: 'CELSIUS'; payload: number }
  | { type: 'FAHRENHEIT'; payload: number }
  | { type: 'KELVIN'; payload: number };

export type TemperaturesContext = {
  C: number | undefined;
  F: number | undefined;
  K: number | undefined;
};

const INITIAL_TEMP_CELSIUS = 24;
const isZero = (value: number | undefined) => (value && value === 0) || false;

export const temperatureMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcwFsAOYBOBDZArtnAHS4DGyAlgG5gDEioGA9rFdSwHZMgAeiAEwA2AAwkAzFICc0gBwBWQQBYxygDQgAnogCMKktNELlE43MGjlggOwKAvvc2pMOfETj0AwgFEAMgDKAJIAqgG8rOycPEj8iAC0groKJMLCcunC1ra6yYKaOgjKNoaCJjY2otISqvJyjs7oWHiExLD0AGIAggASAEo+AHI9PkEAKhFsHFTcvAIIiSKSynIyGRUSghLCBXrKuiQqCjb6csryJtIOTiAuze5t9ADS-gBqQYOTUTMxoPOJuRIlQqCmECmkwLMO20Qk2qVEugk+lEWVEaIk1xuXBYEDgvDublapAo1DoX2ms1i82KuwQGOEhlk1WUCN0cnZDVuTUJHngsUiFN+cQQW1pCgORhMSV00ksbJOykcjiAA */
  createMachine(
    {
      context: { C: undefined, F: undefined, K: undefined },
      tsTypes: {} as import('./temperature.machine.typegen').Typegen0,
      schema: { context: {} as TemperaturesContext, events: {} as TemperatureEvent },
      id: 'temperatures',
      initial: 'active',
      states: {
        active: {
          entry: assign({
            C: () => INITIAL_TEMP_CELSIUS,
            F: () => functions.celsiusToFahrenheit(INITIAL_TEMP_CELSIUS),
            K: () => functions.celsiusToKelvin(INITIAL_TEMP_CELSIUS),
          }),
          always: {
            actions: 'setZeroKelvin',
            cond: (_, event) => isZero(event.payload),
          },
        },
      },
      on: {
        CELSIUS: {
          actions: 'convertCelsius',
        },
        FAHRENHEIT: {
          actions: 'convertFarhenheit',
        },
        KELVIN: {
          actions: 'convertKelvin',
        },
      },
    },
    {
      actions: {
        convertCelsius: assign({
          C: (_, event: TemperatureEvent) => event.payload,
          F: (_, event: TemperatureEvent) => functions.celsiusToFahrenheit(event.payload),
          K: (_, event: TemperatureEvent) => functions.celsiusToKelvin(event.payload),
        }),
        convertFarhenheit: assign({
          C: (_, event: TemperatureEvent) => functions.fahrenheitToCelsius(event.payload),
          F: (_, event: TemperatureEvent) => event.payload,
          K: (_, event: TemperatureEvent) => functions.fahrenheitToKelvin(event.payload),
        }),
        convertKelvin: assign({
          C: (_, event: TemperatureEvent) => functions.kelvinToCelsius(event.payload),
          F: (_, event: TemperatureEvent) => functions.kelvinToFahrenheit(event.payload),
          K: (_, event: TemperatureEvent) => event.payload,
        }),
        setZeroKelvin: assign({
          K: 0,
          C: () => functions.kelvinToCelsius(0),
          F: () => functions.kelvinToFahrenheit(0),
        }),
      },
    }
  );
