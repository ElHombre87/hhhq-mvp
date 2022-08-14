import { createMachine, assign } from 'xstate';
import { functions } from '../libs';
import type { MRedditOld } from './types';

export const redditMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcB0swBswBjTSbfAewEMMA7KAYggtrG3VoDcKBrNgMzCYiACwD6sAK4AjVBAyZEoAA4VYWdCyUgAHogCsAZmwAOAExmAbPssmALCZOGAnABoQATwMBGAOzY-WwAGXzsHS0tvfQBfaPc5BVwCYlIIcmo6RjBkZApkbGV8Kkx+PIBbbEFhcSlZNCxtVXVMTVptPQRDO29sQ0MTIO8gsyNLO2crdy9O82wzIOdnQ0GbE19vS1j4+swGAGUAUQAZA4BhABVGtQ0tJF1EbxNLbF9nbzM7Pu9x2zspgzsL2cQSCJmcYzs1hsZlicRAtAoEDg2gSWHYEEIV2arXaD2MGyCX0ehMMvhs+n+CEs-leIPBGwZVi2IFRODwhBIZEoNA4UCxNzadw6AFoTNhCdSxtZuqS-IZKYZLM4Xgs3pFum8gnZmaykhzUukaJB+S1bqAOo4AoSnL5Fd5DFYupSpS8HY9DN9+t9tXDdeyUmR+FR0IQICacULEKTnqE7CMzO9xusyZT9GFsJLfGCLBNvN5nDqdnqA2G7k0BbiEMKHeLFb4pWn7cnKWZwSrFg7qc4bHZfIX5A0y9dTYLzYhhTZa5LIY3Zb5KdWgnNVXm+pYXBt17DokA */
  createMachine(
    {
      context: { subreddit: undefined, posts: [], flairs: [] },
      tsTypes: {} as import('./reddit.machine.old.typegen').Typegen0,
      schema: {
        context: {} as MRedditOld.Context,
        events: {} as MRedditOld.Event,
        services: {} as MRedditOld.Services,
      },
      id: 'reddit',
      initial: 'idle',
      states: {
        idle: {},
        selected: {
          initial: 'loading',
          states: {
            loading: {
              invoke: {
                src: 'fetchPosts',
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
            loaded: {},
            failed: {},
          },
        },
      },
      on: {
        SELECT: {
          actions: 'assignSubreddit',
          target: '.selected',
        },
      },
    },
    {
      actions: {
        assignSubreddit: assign((_, { payload }) => ({ subreddit: payload.name })),
        assignPosts: assign((_, { data }) => ({ posts: data })),
        registerFlairs: assign((_, { data }) => ({ flairs: functions.extractFlairs(data) })),
      },
      services: {
        fetchPosts: async ({ subreddit }) => functions.fetchSubreddit(subreddit ?? ''),
      },
    }
  );

export default redditMachine;
