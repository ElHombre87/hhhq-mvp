import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

export default createStyles((theme) => {
  const isDark = isDarkTheme(theme);

  return {
    navbar: {
      zIndex: 260,
      border: 'none',
      // borderRight: `0.5px dotted ${isDark ? getColor(theme, 'dark',1) : getColor(theme, 'gray',1)}`,
      backgroundColor: isDark ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 2),
      // backgroundColor: isDark ? getColor(theme, 'dark',7) : getColor(theme, 'gray',1),
      // transition: 'width 0.2s ease-in-out',
    },
    colored: {
      backgroundColor: getColor(theme, 'primary', 6),
    },
    // thin navbar
    buttonLink: {
      width: 32,
      height: 32,
      borderRadius: theme.radius.sm,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // color: theme.white,
      color: theme.fn.rgba(isDark ? getColor(theme, 'dark', 2) : getColor(theme, 'gray', 8), 0.8),

      opacity: 0.85,
      transition: 'opacity 0.2s ease-in-out color 0.2s ease-in-out background-color 0.2s ease-in-out',
      '&:hover': {
        opacity: 0.9,
        backgroundColor: getColor(theme, 'primary', 5),
        color: theme.white,
      },
      '&.active': {
        opacity: 1,
        color: theme.white,
        '&, &:hover': {
          backgroundColor: getColor(theme, 'primary', 7),
        },
      },
    },
  };
});
