import { Badge, Card, Divider, Group, Image, Spoiler, Stack, Text } from '@mantine/core';

import dayjs from 'dayjs';

import React from 'react';
import { RedditPost as TRedditPost } from '../libs';
import { extractFlair } from '../libs/functions';

const REDDIT_BASE = 'https://reddit.com';
const makePostUrl = (permalink: string) => `${REDDIT_BASE}${permalink}`;
const makeUserUrl = (user: string) => `${REDDIT_BASE}/u/${user}`;

const getImage = (post: TRedditPost): string | undefined => post.thumbnail;
// TODO: move into generic utils
const formatUTC = (utc: number) => dayjs.unix(utc).utc().format('DD/MM/YYYY HH:mm');

export const RedditPostVertical: React.FC<{ post: TRedditPost }> = ({ post }) => {
  // const theme = useMantineTheme();
  const image = getImage(post);
  return (
    <Card>
      {image && (
        <Card.Section component="a" href={makePostUrl(post.permalink)} target="_blank">
          <Image
            src={image} // ?? post.thumbnail ?? undefined}
            alt="post image"
            height={105}
            withPlaceholder
            // radius=""
          />
        </Card.Section>
      )}
      {/*  style={{ marginBottom: 5, marginTop: theme.spacing.sm }} */}
      <Group position="apart" sx={(theme) => ({ marginBottom: 5, marginTop: theme.spacing.sm })}>
        <Text
          weight={700}
          variant="link"
          component="a"
          href={makePostUrl(post.permalink)}
          target="_blank"
        >
          {post.title}
        </Text>
        <Text
          size="sm"
          variant="link"
          component="a"
          href={makeUserUrl(post.author)}
          target="_blank"
        >
          @{post.author}
        </Text>
      </Group>
      <Card.Section>
        <Divider size="xs" my="md" />
      </Card.Section>
      <Spoiler maxHeight={64} showLabel="show more" hideLabel="hide" mb="sm">
        <Text lineClamp={10}>{post.selftext}</Text>
      </Spoiler>
      {/* <Card.Section> */}
      {/* <Button component="a" href={makePostUrl(post.permalink)} fullWidth variant="outline" rightIcon={<ExternalLinkIcon />}>
        Open in new tab
      </Button> */}
      {/* </Card.Section> */}
    </Card>
  );
};

export function RedditPostHorizontal({ post }: { post: TRedditPost }) {
  const image = getImage(post);
  const flair = extractFlair(post);
  return (
    <Card radius="md" withBorder>
      <Card.Section>
        {/* <Group align="flex-start" grow spacing="xs" position="left"> */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            src={image}
            width={120}
            height={120}
            withPlaceholder
            alt="post image"
            sx={{ maxWidth: 120 }}
          />
          <Stack pl="md">
            <Text
              weight={700}
              variant="link"
              component="a"
              href={makePostUrl(post.permalink)}
              target="_blank"
            >
              {post.title}
            </Text>
            <Text
              size="sm"
              variant="link"
              component="a"
              href={makeUserUrl(post.author)}
              target="_blank"
            >
              @{post.author}
            </Text>
          </Stack>
        </div>
        {/* </Group> */}
      </Card.Section>
      <Card.Section>
        <Divider size="xs" mb="md" />
      </Card.Section>
      <Group sx={{ width: '100%' }} position="apart">
        <Text size="xs">posted {formatUTC(post.created_utc)}</Text>
        <Badge variant="light" color={flair.background}>
          {flair.text}
        </Badge>
      </Group>
    </Card>
  );
}

export type RedditPosts = {
  post: TRedditPost;
  variant?: 'vertical' | 'horizontal';
};
export const RedditPost: React.FC<RedditPosts> = ({ variant = 'vertical', post }) => {
  switch (variant) {
    case 'horizontal':
      return <RedditPostHorizontal post={post} />;
    case 'vertical':
    default:
      return <RedditPostVertical post={post} />;
  }
};

export default RedditPost;
