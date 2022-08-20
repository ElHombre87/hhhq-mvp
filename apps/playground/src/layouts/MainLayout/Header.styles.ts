import { createStyles } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { getColor, isDarkTheme } from 'utils/theme.utils';

const scrolled = (scrollY: number) => scrollY > 20;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default createStyles((theme) => {
  const [scroll] = useWindowScroll();
  return {
    primary: {
      backgroundColor: getColor(theme, 'primary', 5),
    },
    header: {
      border: 'none',
      backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 2),
      boxShadow: scrolled(scroll.y) ? theme.shadows.md : 'none',
      transition: 'box-shadow 0.2s ease-in-out',
      zIndex: 2000,
    },
  };
});
