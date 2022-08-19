import { createStyles } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { getColor, isDarkTheme } from 'utils/theme.utils';

// const scrolled = (scrollY: number) => scrollY > 20;
export type PageLayoutStyle = {
  offset: number;
  padSticky: boolean;
  backgroundType: boolean | 'sticky';
  withAppbar: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line max-len
export default createStyles((theme, { withAppbar, offset, padSticky, backgroundType }: PageLayoutStyle) => {
  const isDark = isDarkTheme(theme);
  const [scroll] = useWindowScroll();
  const { spacing } = theme;

  const appbarHeight = withAppbar ? theme.other.headerHeight : 0;

  const extraPadding = theme.spacing.xl + appbarHeight;
  const showShadow = scroll.y > offset + 10;

  const backgroundColor = isDark ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 2);

  const bgColor = backgroundType === true
    ? backgroundColor
    : backgroundType === 'sticky' && showShadow ? backgroundColor : 'none';

  return {
    wrapper: {
      position: 'relative',
      minHeight: `calc(100vh - ${extraPadding}px)`,
      paddingBottom: theme.spacing.xl * 3,
    },
    stickyWrapper: {},
    withBackground: {
      backgroundColor: bgColor,
    },
    header: {
      padding: `${spacing.xs}px ${spacing.md}px`,
      transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:first-of-child': {},
      '&:last-child': {},
    },
    sticky: {
      position: 'sticky',
      top: appbarHeight,
      padding: padSticky ? `${spacing.xs}px ${spacing.md}px` : '0',
      backgroundColor: isDark ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 2),
      zIndex: 100,
      // '> *': {
      //   maxWidth: '95%',
      // },
      // transition: 'box-shadow 0.2s ease-in-out',
      // padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
      // margin: `-${theme.spacing.sm}px -${theme.spacing.md}px`,
    },
    aside: {
      position: 'sticky',
      top: appbarHeight + offset,
    },
    shadow: {
      boxShadow: showShadow ? theme.shadows.sm : 'none',
    },
    body: {},
    devtools: {
      // width: `calc(100% + ${spacing.md * 2}px)`,
      width: '100%',
      height: 600,
      // margin: `-${spacing.xs}px -${spacing.md}px`,
      border: 0,
      margin: '0 auto',
      marginTop: 0,
    },
  };
});
