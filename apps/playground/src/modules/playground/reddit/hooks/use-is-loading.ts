import { useSelector } from '@xstate/react';
import { useRedditContext } from '../contexts';

export const useIsLoading = (): boolean => {
  const { service } = useRedditContext();
  return useSelector(service, (state) => state.matches('selected.loading'));
};
