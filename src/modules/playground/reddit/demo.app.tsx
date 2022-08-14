import React, { useMemo } from 'react';
import { useInterpret, useMachine, useSelector } from '@xstate/react';
import { showNotification } from '@mantine/notifications';
import { X } from 'tabler-icons-react';
import { Box, Button, Card, Center, Container, Group, Select, Text, Title } from '@mantine/core';
import { format } from 'utils';
// import { ActorRefFrom } from 'xstate';
import { redditMachine } from './machines/reddit.machine';
import { createSubredditMachine } from './machines/subreddit.machine';

const SUBREDDITS = ['frontend', 'reactjs', 'vuejs'];
// type SubredditMachine = ReturnType<typeof createSubredditMachine>;
// const Subreddit:React.FC<{ redditRef: ActorRefFrom<SubredditMachine> }> = ({ redditRef }) => {
export const Subreddit: React.FC<{ name: string }> = ({ name }) => {
  const subredditMachine = useMemo(() => createSubredditMachine(name), [name]);
  const [current, send] = useMachine(subredditMachine, {
    actions: {
      notifyError: (context, event) => {
        showNotification({
          id: 'reddit-fetch-fail',
          title: 'Reddit Deck Error',
          message: `${(event.data as Error).message} ${context.subreddit}`,
          color: 'red',
          icon: <X size={14} />,
        });
      },
    },
  });
  // const { posts, lastUpdated } = current.context;

  // const [current, send] = useActor(redditRef);
  // const current = useSelector(service, state => state);
  // const { send } = service;

  if (current.matches('failed')) {
    return (
      <div>
        Failed to load posts.{' '}
        <button type="button" onClick={() => send('RETRY')}>
          Retry?
        </button>
      </div>
    );
  }
  const { subreddit, posts, lastUpdated } = current.context;

  return (
    <section
      // data-machine={subreddit.id}
      data-machine={subredditMachine.id}
      data-state={current.toStrings().join(' ')}
    >
      {current.matches('loading') && (
        <Center>
          <Text>Loading posts...</Text>
        </Center>
      )}
      {posts && (
        <>
          <Group direction="column" align="center">
            <Title>{subreddit}</Title>
            <Text size="xs">Last updated: {format.time.utcToString(lastUpdated)}</Text>
            <Button type="button" onClick={() => send('REFRESH')}>
              Refresh
            </Button>
          </Group>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export const App = () => {
  const _machine = useMemo(() => redditMachine, [redditMachine]);
  // const [state, send] = useMachine(_machine);
  // const { active } = state.context;
  const service = useInterpret(_machine);
  const active = useSelector(service, (state) => state.context.active);
  // const subreddit = useSelector(service, state => state.context.subreddit);

  const { send } = service;

  const handleSelect = (name: string) => send('SELECT', { payload: { name } });

  return (
    <Box>
      <Container m="xl">
        <Center>
          <Select
            searchable
            onChange={handleSelect}
            placeholder="select subreddit"
            data={SUBREDDITS.map((s) => ({ value: s, label: s }))}
          />
        </Center>
      </Container>
      {/* {state && state.matches('idle') && (<Text align="center">Select a sub</Text>)} */}
      {active && (
        <Card>
          <Subreddit name={active} />
        </Card>
      )}
      {/* {subreddit && <Card><Subreddit redditRef={active} /></Card>} */}
    </Box>
  );
};
