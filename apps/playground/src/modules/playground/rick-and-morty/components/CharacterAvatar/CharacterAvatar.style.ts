import { createStyles } from '@mantine/core';
import { isDarkTheme } from 'utils/theme.utils';

export const useStyles = createStyles((theme) => ({
  avatar: {
    zIndex: 2,
    border: `${theme.spacing.xs / 2}px solid ${isDarkTheme(theme) ? theme.colors.dark[6] : theme.white}`,
  },
}));
