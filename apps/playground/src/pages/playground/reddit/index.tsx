import {
  Title,
  Alert,
  Code,
  Container,
  Space,
  Box,
  Grid,
  useMantineTheme,
  Button,
  Group,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { InfoCircledIcon } from '@modulz/radix-icons';
import { ButtonsGroup } from 'components/ButtonGroup/ButtonGroup';
import PageLayout from 'layouts/PageLayout';
// import { RedditApp } from 'modules/playground';
import {
  RedditProvider,
  RedditContent,
  RedditChips,
  RedditForm,
  RedditLoaderOverlay,
} from 'modules/playground/reddit';
import { DEMO_SUBREDDITS } from 'modules/playground/reddit/constants';
import Link from 'next/link';

const SubredditNavigation = (props: Partial<ButtonsGroup>) => (
  <ButtonsGroup {...props}>
    <Link passHref key="demo" href="/playground/reddit/demo">
      <Button component="a" variant="filled">
        demo
      </Button>
    </Link>
    {DEMO_SUBREDDITS.map((subreddit) => (
      <Link passHref key={subreddit} href={`/playground/reddit/${subreddit}`}>
        <Button component="a" variant="outline">
          {subreddit}
        </Button>
      </Link>
    ))}
  </ButtonsGroup>
);

export default function Playground() {
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false);

  return (
    <RedditProvider>
      <PageLayout
        size="md"
        sticky={
          <Grid
            align="center"
            justify="flex-end"
            gutter="xs"
            style={{ flexDirection: 'row-reverse' }}
          >
            <Grid.Col sm={12} md={4} lg={3}>
              <RedditForm withReset />
            </Grid.Col>
            <Grid.Col sm={12} md={8} lg={9}>
              <RedditChips withScroll position={isSmall ? 'center' : 'left'} />
            </Grid.Col>
          </Grid>
        }
        header={
          <Box>
            <Title align="center" py="xl" my={0}>
              RedditDeck
            </Title>
            <Container size="xs" pb="md">
              <Alert color="teal" variant="light" icon={<InfoCircledIcon />}>
                This is a demo of the <Code>Reddit</Code> machine with <Code>React Context</Code>.
                <Space />
                Search for a subreddit and explore a few of the posts.
              </Alert>
            </Container>
            <Group align="center" direction="column" spacing={0}>
              <Title order={5}>Subreddit pages</Title>
              <SubredditNavigation m="xl" />
            </Group>
            {/* <RedditForm /> */}
          </Box>
        }
      >
        <RedditLoaderOverlay />
        <RedditContent overlay />
      </PageLayout>
    </RedditProvider>
  );
}
