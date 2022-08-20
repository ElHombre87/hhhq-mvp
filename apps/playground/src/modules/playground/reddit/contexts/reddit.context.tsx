import { useMemo } from 'react';
import { InterpreterFrom } from 'xstate';
import { useActor, useInterpret, useSelector } from '@xstate/react';
import { createUseContext } from 'utils';
import { redditMachine } from '../machines/reddit.machine';

type RedditMachine = typeof redditMachine;

export interface RedditContext {
  service: InterpreterFrom<RedditMachine>;
  actions: {
    selectSubreddit: (name: string) => void;
  };
}

const [Provider, useRedditContext] = createUseContext<RedditContext>({} as RedditContext);

export const RedditProvider: React.FC = ({ children }) => {
  const _machine = useMemo(() => redditMachine, [redditMachine]);
  const redditService = useInterpret<RedditMachine>(_machine, {
    devTools: true,
    actions: {},
  });

  const ctxValue: RedditContext = {
    service: redditService,
    actions: {
      selectSubreddit: (name: string) => redditService.send('SELECT', { payload: { name } }),
    },
  };

  return <Provider value={ctxValue}>{children}</Provider>;
};

export { useRedditContext };
export const useReddit = () => {
  const { service } = useRedditContext();
  const actor = useActor(service);
  return actor;
};

export const useIsIdle = () => {
  const { service } = useRedditContext();
  return useSelector(service, state => state.matches('idle'));
};

/** returns the currently selected subreddit or null if none have been fetched already */
export const useActiveSubreddit = () => {
  const [state] = useReddit();
  if (state.matches('idle')) {
    return null;
  }
  return state.context.subreddit;
};

/** returns the list of cached subreddits */
export const useSubredditsList = () => {
  const { service } = useRedditContext();
  return useSelector(service, (state) => Object.keys(state.context.subreddits));
};

export const useActiveSubredditName = () => {
  const subreddit = useActiveSubreddit();
  if (!subreddit) {
    return '';
  }
  const [state] = useActor(subreddit);
  return state.context.subreddit;
};
