import { createMachine, assign } from 'xstate';
// import { RMCharacter } from '../models';
import { ApiContext, ApiEvent, ApiServices } from './api.machine.types';

export const rickAndMortyFetcherMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCcCWBjA1gWgIYDsJsBbAe2QBcBPbAMzAvQAsxkA6VCAGzAGIAxAKIAVAMIAJRKAAOpWKgqpS+KSAAeiAEwBGAMxsAHAFYAnJqNHtJ7ToAMANiMAaEFUTZtAdjb2ALNt9NTyMdAwDfPwBfSJc0LDxCEnJqOgZmVjZ6RiZUfCheCGUwDnwAN1JMYqzmbAhcClxVWXlFZVUNBE97fVtLbXsHf1tdRxc3BHsDNhNA20D-TU1bMN9o2IwcAiIyShpqlnZ93PzWZHI2aS562nJiTLSmWvrGpBBmhSUVV47+-RMB-4OSaLXQmAxjRABbxGXwOXTaXq+XS6TyeAxrEBxTaJHYpfYZI55XhqWANCjFXC0cnIAAURlsDIAlLwsQltsk9g8CQ9jk05B82t9EMDDDZ6ctPIFPEEIQgdPY2P17ACYcFNPCMaytkldqlshlYABXdDoOCwXh8lqfdqIXwzRUoxa2JWaEyS2WuxW+Iy6XywowGV303TomKYjZsnV4rnsU7kXgAJRECYAmpaBV9QB0lrYfEZ7OYDLpegG3b4PX5Fcr7AEjJLTA5NRHtbjOfr2IpiGBSIaKInk2nXu9Wpn1IhPAi2OYGUrtHPPP8K74q44DNKfXWldEw-hSBA4KotTiOXr0uxODx0yObQhvVMrD7zF57CYQsZZdgfaL8zNfIGwj6TbxC2J74ocPJ5Fe1pCggKImGwcwvrYE5BtoRYegybB2iYZgGLY1jIYGQHYuyupgWwRommaUGClmwqVjWJgjL6Xh-r6H5fgBL5+v+2iAWGR6kdG7ZsHGyA0aOHTYPomgRCYtiumCAbOoGziuFo+E+NWIY1p4EqycRkatqeBxsJ23a9hJN5rrmyLBKCIamHhJiymh2jTDhTHSnpMyNgJzbHmRMZWTB2BBFOckKThxh4WhmgfjYCponpqJBrMUTbkAA */
  createMachine({
  context: { data: [], info: null, query: {} },
  tsTypes: {} as import('./api.machine.typegen').Typegen0,
  schema: { context: {} as ApiContext, services: {} as ApiServices, events: {} as ApiEvent },
  id: 'rick-and-morty-fetcher',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: {
          actions: 'updateQuery',
          target: 'fetching',
        },
      },
    },
    fetching: {
      invoke: {
        src: 'fetchData',
        id: 'fetch-data',
        onDone: [
          {
            actions: 'assignData',
            target: 'success',
          },
        ],
        onError: [
          {
            actions: 'notifyError',
            target: 'error',
          },
        ],
      },
      after: {
        '5000': {
          target: 'timeout',
        },
      },
    },
    success: {
      always: {
        target: 'idle',
      },
    },
    error: {
      on: {
        RETRY: {
          target: 'fetching',
        },
      },
    },
    timeout: {
      entry: 'notifyTimeout',
      description: 'fetch timed out.\ndelay time is set in context',
      on: {
        RETRY: {
          target: 'fetching',
        },
      },
    },
  },
}, {
    actions: {
      assignData: assign((_, { data }) => ({
        data: data.results,
        info: data.info,
        lastUpdated: Date.now(),
      })),
      updateQuery: assign((ctx, { type, ...query }) => ({ query: { ...ctx.query, ...query } })),
    },
  }
);
