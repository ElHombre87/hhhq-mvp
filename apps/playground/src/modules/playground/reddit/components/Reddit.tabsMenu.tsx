import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import type { TabsProps } from '@mantine/core';
import { useReddit } from '../contexts';
import { useActions, useAvailableSubreddits } from '../hooks';
import { useActiveSubredditName } from '../contexts/reddit.context';

interface RedditTabsMenuProps extends Omit<TabsProps, 'active' | 'onChange' | 'children'> {}

export function RedditTabsMenu(props: RedditTabsMenuProps) {
  const [active, setActive] = useState(2);
  const [
    {
      context: { subreddit },
    },
  ] = useReddit();
  const activeSub = useActiveSubredditName();
  const actions = useActions();

  const availableSubs = useAvailableSubreddits();

  useEffect(() => {
    setActive(availableSubs.indexOf(activeSub) ?? -1);
  }, [subreddit]);

  const onChange = (_: number, tabKey: string) => {
    setActive(active);
    actions.selectSubreddit(tabKey);
  };

  return (
    <>
      <Tabs active={active} onTabChange={onChange} variant="outline" {...props}>
        {availableSubs.map((name) => (
          <Tabs.Tab key={name} label={`/r/${name}`} tabKey={name} />
        ))}
      </Tabs>
    </>
  );
}
