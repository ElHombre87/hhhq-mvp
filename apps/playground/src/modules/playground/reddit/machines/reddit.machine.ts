import { createMachine, assign, spawn } from 'xstate';
import { createSubredditMachine } from './subreddit.machine';
import type { MReddit } from './types';

export const redditMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcDEBlAogDL4DCAKoqAA4D2sW6NAdpSAB6ICMAHAGwB0AdgCcnAEwAWAMxTOE4b24SANCACeiAKwShwgAx7uCiRN6bNvMQF8bqpjQhxWqCBkz90EADZhWtepiMLEjsXFL8nLx6Mpw80VKCFpqqGgi8groGCpE5Yry2IC5u-LBgPgDGmJB+dAzMrBwInMJi-NxS0Xq8+oLciSrqiGKanPzCMtycUmKCZiK8+VaqRVg1AUENiAC0nHptUgqKk4eSUsmDCFsd-GJ6wi0m-Zy9Uos2QA */
  createMachine(
    {
      context: { active: '', subreddit: null, subreddits: {} },
      tsTypes: {} as import('./reddit.machine.typegen').Typegen0,
      schema: {
        events: {} as MReddit.Event,
        context: {} as MReddit.Context,
      },
      id: 'reddit',
      initial: 'idle',
      states: {
        idle: { id: 'reddit-iddle' },
        selected: { id: 'subreddit-selected' },
      },
      on: {
        SELECT: {
          id: 'select-subreddit',
          actions: 'selectSubreddit',
          target: '.selected',
        },
        REFRESH_CURRENT: {
          // TODO: fix typing error on ctx
          // actions: send({ type: 'REFRESH' }, { to: (ctx) => ctx.subreddit }),
        },
      },
    },
    {
      actions: {
        selectSubreddit: assign((context, event) => {
          const {
            payload: { name },
          } = event;

          let subreddit: MReddit.SubredditActor = context.subreddits[name]; // existing ActorRef
          if (subreddit) {
            return { ...context, subreddit, active: name };
          }

          subreddit = spawn(createSubredditMachine(name));
          return {
            // ...context,
            active: name,
            subreddit,
            subreddits: { ...context.subreddits, [name]: subreddit },
          };
        }),
      },
    }
  );

export default redditMachine;
