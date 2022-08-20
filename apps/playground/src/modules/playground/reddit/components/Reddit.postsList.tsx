import React from 'react';
import { Space } from '@mantine/core';
import { RedditPost as TRedditPost } from '../libs';
import { RedditPost } from './Reddit.post';

export interface RedditPostsList {
  posts: TRedditPost[];
}
export const RedditPostsList: React.FC<RedditPostsList> = ({ posts }) => (
  <>
    {posts.map((post) => (
      <React.Fragment key={post.url}>
        <RedditPost post={post} variant="horizontal" />
        <Space h="sm" />
        {/* {i !== posts.length - 1 && <Divider variant="dotted" size="xs" my="xs" />} */}
      </React.Fragment>
    ))}
  </>
);
