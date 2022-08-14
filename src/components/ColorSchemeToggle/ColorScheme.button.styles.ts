import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

export default createStyles((theme) => ({
  icon: {
    backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 6) : getColor(theme, 'gray', 1),
    color: isDarkTheme(theme) ? getColor(theme, 'yellow', 4) : getColor(theme, 'blue', 8),
  },
}));
