// import { useMemo } from 'react';
import { useSelector } from '@xstate/react';

// import { useRedditContext } from '../contexts';
import { filterPosts } from '../libs/functions';
import { useFlairs } from './use-flairs';
import { useActiveSubreddit } from '../contexts/reddit.context';
import { RedditPost } from '../libs';

export const usePosts = (): [RedditPost[], RedditPost[]] => {
  const active = useActiveSubreddit();
  const { activeFlairs } = useFlairs();
  if (!active) return [[], []];
  return [
    useSelector(active, ({ context }) => context.posts),
    useSelector(active, ({ context }) => filterPosts(context.posts, activeFlairs)),
  ];

  // const { service } = useRedditContext();
  // const { activeFlairs } = useFlairs();
  // const posts = useSelector(service, (state) => state.context.posts);
  // return ([
  //   posts,
  //   useMemo(() => filterPosts(posts, activeFlairs), [posts, activeFlairs]),
  // ]);
};
