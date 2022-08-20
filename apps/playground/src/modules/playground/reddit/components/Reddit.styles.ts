import { createStyles } from '@mantine/core';
// import { isDarkTheme } from 'utils/theme.utils';

export default createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: theme.other.headerHeight, // + theme.spacing.xl,
    zIndex: 100,
    padding: theme.spacing.lg,
    // backgroundColor: isDarkTheme(theme) ? theme.colors.dark[9] : theme.colors.gray[1],
  },
}));
