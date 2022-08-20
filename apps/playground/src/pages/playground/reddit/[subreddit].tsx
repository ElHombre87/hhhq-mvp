import { Button, Center, Group, Code, ActionIcon, Select } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMachine } from '@xstate/react';
import PageLayout from 'layouts/PageLayout';
import { RedditPostsList } from 'modules/playground/reddit/components/Reddit.postsList';
import { createSubredditMachine } from 'modules/playground/reddit/machines/subreddit.machine';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { ChevronLeft, Refresh, RefreshAlert, X } from 'tabler-icons-react';
import { DEMO_SUBREDDITS } from 'modules/playground/reddit/constants';
import { NextPage } from 'next';

interface Props {
  subreddit: string;
  onSelect: (subreddit: string) => void;
}
// eslint-disable-next-line max-len
// export function SubredditPageComponent({ subreddit, onSelect }: Props) {
export const SubredditPageComponent: NextPage<Props> = ({ subreddit, onSelect }) => {
  const machine = useMemo(() => createSubredditMachine(subreddit), [subreddit]);
  const [state, send] = useMachine(machine, {
    devTools: true,
    actions: {
      notifyError: (context, event) => {
        showNotification({
          id: 'reddit-fetch-fail',
          title: 'Reddit Deck Error',
          message: `${(event.data as Error).message} posts for r/${context.subreddit}`,
          color: 'red',
          icon: <X size={14} />,
        });
      },
    },
  });

  const handleReload = () => {
    switch (true) {
      case state.matches('loaded'):
        return send('REFRESH');
      case state.matches('failed'):
        return send('RETRY');
      default:
        return null;
    }
  };
  const [selected, setSelected] = React.useState(subreddit);
  const handleSelect = useCallback(
    (name: string) => {
      // setSelected(name);
      onSelect && onSelect(name);
    },
    [setSelected]
  );

  // eslint-disable-next-line max-len
  const selectItems = DEMO_SUBREDDITS.map((s) => ({ value: s, label: s }));

  const controls = (
    <Group>
      <Select
        searchable
        size="xs"
        variant="filled"
        data={selectItems}
        onChange={handleSelect}
        value={selected}
        placeholder="Select a sub"
      />
      <ActionIcon
        color="primary"
        variant="filled"
        onClick={handleReload}
        disabled={state.matches('loading')}
      >
        {state.matches('failed') ? <RefreshAlert size={18} /> : <Refresh size={18} />}
      </ActionIcon>
    </Group>
  );

  return (
    <PageLayout
      p="xl"
      size="xl"
      sticky={
        // <Center>
        <Group spacing="xl" position="apart">
          <Link href="/playground/reddit" passHref>
            <Button uppercase variant="subtle" leftIcon={<ChevronLeft size={16} />} component="a">
              Back
            </Button>
          </Link>
          <Code sx={(theme) => ({ fontSize: theme.fontSizes.xl })}>r/{subreddit}</Code>
          {controls}
        </Group>
        // </Center>
      }
    >
      <Center>
        {state.matches('loading') && <p>Loading posts...</p>}
        {state.matches('failed') && <p>Loading error</p>}
      </Center>
      {state.matches('loaded') && <RedditPostsList posts={state.context.posts} />}
    </PageLayout>
  );
};

export function SubredditPage() {
  const router = useRouter();
  const { subreddit } = router.query as { subreddit: string };
  const onSelect = (name: string) => {
    const path = `/playground/reddit/${name}`;
    router.push(path);
    // router.replace(path);
  };
  return React.createElement(SubredditPageComponent, { subreddit, onSelect });
}
// export default SubredditPageComponent;
export default SubredditPage;
