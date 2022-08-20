import { useActor } from '@xstate/react';
import { useMemo } from 'react';
import { useRedditContext } from '../contexts';

export const useSubredditName = () => {
  const { service } = useRedditContext();
  const [state] = useActor(service);
  return useMemo(() => state.context.subreddit, [state.context.subreddit]);
};
