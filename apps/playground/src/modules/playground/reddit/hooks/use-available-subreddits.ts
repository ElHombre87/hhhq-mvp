import { useMemo } from 'react';
import { uniqueArray } from 'utils/filters';
import { DEMO_SUBREDDITS } from '../constants';
import { useSubredditsList } from '../contexts';

export function useAvailableSubreddits() {
  const cachedSubs = useSubredditsList();
  return useMemo(() => uniqueArray([...DEMO_SUBREDDITS, ...cachedSubs]), []);
}
