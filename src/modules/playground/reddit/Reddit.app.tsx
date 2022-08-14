/**
 * Example of an assembled Reddit app that uses xstate machines inside context
 */
import { Box } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';
import { RedditProvider } from './contexts';
import { RedditContent } from './components/Reddit.content';
import { RedditTabsMenu } from './components/Reddit.tabsMenu';
import { RedditChips } from './components/Reddit.chips';
import { RedditForm } from './components/Reddit.form';
import { RedditLoaderOverlay } from './components/Reddit.loadingOverlay';

export function RedditApp({ height = 600 }: { height?: string | number }) {
  return (
    <RedditProvider>
      {/* <RedditHeader /> */}
      <RedditLoaderOverlay>
        <RedditForm />
      </RedditLoaderOverlay>
      <RedditTabsMenu
        position="left"
        variant="outline"
        color="indigo"
        // styles={theme => ({
        //   // tabsList: { backgroundColor: 'cyan' },
        //   // root: { marginLeft: theme.spacing.xl },
        //   // tabControl: { backgroundColor: 'teal' },
        //   // tabActive: { color: getColor(theme, 'orange', 5) },
        //   // tabInner: { backgroundColor: 'purple' },
        //   // // tabLabel: { color: getColor(theme, 'teal', 5) },
        //   // tabLabel: { color: getColor(theme, 'primary', 6) },
        //   // tabIcon: { backgroundColor: 'magenta' },
        // })}
      />
      <Box
        sx={(theme) => ({
          background: isDarkTheme(theme) ? getColor(theme, 'dark', 7) : getColor(theme, 'gray', 0),
          padding: theme.spacing.sm,
        })}
      >
        <RedditChips />
        <RedditContent height={height} />
      </Box>
    </RedditProvider>
  );
}
