import { useSelector } from '@xstate/react';
import { useMemo } from 'react';
import { useActiveSubreddit } from '../contexts/reddit.context';
import { Flair } from '../libs/types';

export const useFlairs = (): {
  flairs: Flair[];
  activeFlairs: string[];
} => {
  const active = useActiveSubreddit();
  // const flairs = useSelector(active, state => state.context.flairs);
  // const activeFlairs = useSelector(active, state => state.context.activeFlairs);

  if (!active) {
    return { flairs: [], activeFlairs: [] };
  }
  const flairs = useSelector(active, (state) => state.context.flairs);
  const activeFlairs = useSelector(active, (state) => state.context.activeFlairs);

  return useMemo(() => ({ flairs, activeFlairs }), [flairs, activeFlairs]);
};

export default useFlairs;
