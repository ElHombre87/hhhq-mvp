import { usePosts } from './use-posts';

export const usePostsCount = () => {
  const [total, filtered] = usePosts();
  return [total.length, filtered.length];
};
