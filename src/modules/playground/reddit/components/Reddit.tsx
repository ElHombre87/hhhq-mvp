import React from 'react';
import { useForm } from '@mantine/form';
import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Center,
  Chip,
  Chips,
  Divider,
  Group,
  LoadingOverlay,
  ScrollArea,
  TextInput,
} from '@mantine/core';
import { X } from 'tabler-icons-react';

import { showNotification } from '@mantine/notifications';
import { redditMachine } from '../machines/reddit.machine';
import { RedditPostsList } from './Reddit.postsList';

import { useFlairs, usePosts } from '../hooks';
import useStyles from './Reddit.styles';

/**
 * Reddit App w/ xstate machine and internal state management (useMachine)
 * @deprecated in favor of modular system with React.Context.
 *    Attempting to use this will break everything since the hooks have changed
 */
export function Reddit({ height = '100%' }: { height?: string | number }) {
  // State Machine ////////////////////////////////////////////////////////////
  const [state, send] = useMachine(redditMachine, {
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

  // Form /////////////////////////////////////////////////////////////////////
  const form = useForm({
    initialValues: {
      subreddit: '',
    },
    validate: {
      subreddit: (value: string) => (value.length > 0 ? undefined : 'Subreddit is required'),
    },
  });
  const handleSubmit = ({ subreddit }: typeof form.values) => {
    send({ type: 'SELECT', payload: { name: subreddit } });
  };

  // General //////////////////////////////////////////////////////////////////
  const { classes } = useStyles();
  const isLoading = state.matches('selected.loading');
  const btnDisabled = isLoading || !form.values.subreddit;

  const { flairs, activeFlairs, setActiveFlairs } = useFlairs(state.context);
  const [posts, selectedPosts] = usePosts(state.context, activeFlairs);
  const hasPosts = posts.length > 0;

  return (
    <>
      <Box className={classes.header}>
        <LoadingOverlay visible={isLoading} />
        <Center>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group align="center">
              <TextInput
                disabled={isLoading}
                placeholder="type your subreddit"
                {...form.getInputProps('subreddit')}
              />
              <Button uppercase type="submit" disabled={btnDisabled}>
                Fetch
              </Button>
            </Group>
          </form>
        </Center>

        <Group position="center" my="md">
          {flairs.length > 1 && (
            <Chip
              size="xs"
              radius="sm"
              color="green"
              variant="filled"
              checked={flairs.length === activeFlairs.length}
              onChange={(v) => setActiveFlairs(v ? flairs : [])}
            >
              Select All
            </Chip>
          )}
          <Chips
            multiple
            size="xs"
            radius="sm"
            position="center"
            value={activeFlairs}
            onChange={setActiveFlairs}
          >
            {state.context.flairs.map((flair) => (
              <Chip key={flair.text} value={flair.text} color={flair.background}>
                {flair.text}
              </Chip>
            ))}
          </Chips>
        </Group>
      </Box>
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
      {/* </Box> */}
    </>
  );
}

export function RedditApp() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <Reddit />
    // </Suspense>
  );
}

export default Reddit;
