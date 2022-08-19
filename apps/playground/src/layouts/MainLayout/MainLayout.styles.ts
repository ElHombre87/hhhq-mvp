import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default createStyles((theme) => {
  const isDark = isDarkTheme(theme);

  return ({
    body: {
      borderTopLeftRadius: theme.radius.lg,
      backgroundColor: isDark ? getColor(theme, 'dark', 7) : theme.white, // getColor(theme, 'gray', 1),
    },
    footer: {
      // height: 220,
      zIndex: -1,
      backgroundColor: isDark ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 0),
    },
  });
});
