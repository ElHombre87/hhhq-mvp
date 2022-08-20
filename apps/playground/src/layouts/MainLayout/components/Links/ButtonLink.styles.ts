import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

export default createStyles((theme) => ({
  buttonLink: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // color: theme.white,
    color: theme.fn.rgba(isDarkTheme(theme) ? getColor(theme, 'dark', 2) : getColor(theme, 'gray', 8), 0.8),

    opacity: 0.75,
    transition: 'opacity 0.2s ease-in-out color 0.2s ease-in-out background-color 0.2s ease-in-out',
    '&:hover': {
      opacity: 0.9,
      color: isDarkTheme(theme) ? theme.white : getColor(theme, 'primary', 6),
    },
    '&.active': {
      opacity: 1,
      color: theme.white,
      '&, &:hover': {
        backgroundColor: getColor(theme, 'primary', 7),
      },
    },
  },
}));
