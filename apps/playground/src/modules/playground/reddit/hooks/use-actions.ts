import { useMemo } from 'react';
import { useRedditContext } from '../contexts';

export const useActions = () => {
  const { actions } = useRedditContext();
  return useMemo(() => actions, [actions]);
};
