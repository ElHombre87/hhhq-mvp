import { assign, createMachine } from 'xstate';
import type { MSubreddit } from './types';
import { functions } from '../libs';

export const createSubredditMachine = (subreddit: string) =>
  /** @xstate-layout N4IgpgJg5mDOIC5SwK4CMBOkIEsAuAdADYD2AhrgHZQDEEJlYBOlAbiQNZMBmYeAxgAsAtKkzZ8iUAAcSsfDgZSQAD0TCAjBoCcBACwAmAKwBmDXo0AOAOwGTABm2WANCACeia7vtGLhx6baWtYAviGuYlgQuISkFCy0YBgYJBgE0kRkeNypALYEvAIikRJ4yrLyeIqUymoIerYE9hpGgaZG2taWRq4eCNomBK1+ls0AbNYaBgbaYRHoUTHE5BCQNABKAKIAYlsAygAS5XIKSkiqiBomgx1OGj5GY5aWY72XV02+Gk-WFtdjBj0cxAJWi+AKZBwRDWWwAKusAJrHSrVWqIBxGAhTFpjPQOF7mbQ9dzvQY+Cw-P4mAFjMLhECUEireDnUFLOJUKDI041c51bEEaz2PTPb6WPRjIzGFwkhDCSy6AYdAxWZoGAkmYFs8EcyDcqpnUD8uwEaYihwmIWmX7aN4IHSYhUAjTWMbNKX2HxahalCFQvXnCo8tEIdVjAjdDpPOw6IIGO0OiPaZ2u90GT1Gb3iMFlQMnA28o3qcyDQymcxWWwOJx2zQAghK7QqynmIyWOkhIA */
  createMachine(
    {
      context: {
        subreddit, // subreddit name
        posts: [],
        flairs: [],
        activeFlairs: [],
        lastUpdated: undefined,
      },
      tsTypes: {} as import('./subreddit.machine.typegen').Typegen0,
      schema: {
        context: {} as MSubreddit.Context,
        events: {} as MSubreddit.Event,
        services: {} as MSubreddit.Services,
      },
      id: 'subreddit',
      initial: 'loading',
      states: {
        loading: {
          after: {
            // timeout
            2500: 'failed',
          },
          invoke: {
            src: 'fetch',
            id: 'fetch-subreddit',

            onDone: [
              {
                actions: ['assignPosts', 'registerFlairs'],
                target: 'loaded',
              },
            ],
            onError: [
              {
                actions: 'notifyError',
                target: 'failed',
              },
            ],
          },
        },
        loaded: {
          entry: 'registerFlairs',
          on: {
            REFRESH: {
              target: 'loading',
            },
            SET_FLAIRS: {
              actions: 'setFlairs',
            },
            REMOVE_FLAIRS: {
              actions: 'removeFlairs',
            },
          },
        },
        failed: {
          on: {
            RETRY: {
              target: 'loading',
            },
          },
        },
      },
    },
    {
      actions: {
        assignPosts: assign((_, { data }) => ({
          lastUpdated: Date.now(),
          posts: data,
        })),
        registerFlairs: assign((_, { data }) => ({
          flairs: functions.extractFlairs(data),
          activeFlairs: functions.extractFlairs(data).map((f) => f.text),
        })),
        setFlairs: assign((ctx, { payload }) => ({
          activeFlairs: ctx.activeFlairs
            .concat(...payload.flairs)
            .filter((f, i, list) => list.indexOf(f) === i),
        })),
        removeFlairs: assign((ctx, { payload }) => ({
          activeFlairs: ctx.activeFlairs.filter((f) => payload.flairs.indexOf(f) === -1),
        })),
      },
      services: {
        fetch: async (context) => functions.fetchSubreddit(context.subreddit),
      },
    }
  );
