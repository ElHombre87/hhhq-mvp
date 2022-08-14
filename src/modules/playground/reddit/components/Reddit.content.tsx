import { Box, Divider, ScrollArea } from '@mantine/core';

import { useReddit } from '../contexts';
import { usePosts } from '../hooks';
import { RedditLoaderOverlay } from './Reddit.loadingOverlay';
import { RedditPostsList } from './Reddit.postsList';

export interface RedditContent {
  height?: string | number;
  overlay?: boolean;
}
export const RedditContent: React.FC<RedditContent> = ({ height = '100%', overlay = false }) => {
  const [state] = useReddit();

  const [posts, selectedPosts] = usePosts();
  const hasPosts = posts.length > 0;

  const Wrapper = overlay ? RedditLoaderOverlay : Box;
  const wrapperProps = overlay ? { relative: true } : {};

  return (
    <Wrapper>
      {hasPosts && (
        <Divider
          my="xl"
          size="sm"
          variant="dashed"
          labelPosition="center"
          label={`posts from r/${state.context.subreddit}`}
        />
      )}
      <ScrollArea offsetScrollbars style={{ height: hasPosts ? height : 0 }}>
        {selectedPosts && <RedditPostsList posts={selectedPosts} />}
      </ScrollArea>
    </Wrapper>
  );
};
