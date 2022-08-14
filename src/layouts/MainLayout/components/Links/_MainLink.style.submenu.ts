import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

export type MainLinkParams = { open: boolean; menu: boolean };

export default createStyles((theme, params: MainLinkParams, getRef) => {
  const icon = getRef('icon');
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'block',
      width: '100%',
      // alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: isDarkTheme(theme) ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderTopRightRadius: theme.radius.md,
      borderBottomRightRadius: params.menu && params.open ? 0 : theme.radius.md,
      fontWeight: 500,
      // margin: `${theme.spacing.xs / 2}px 0`, // @dev testing
      '&:hover': {
        fontWeight: 600,
        backgroundColor: isDarkTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0],
        color: isDarkTheme(theme) ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: isDarkTheme(theme) ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: isDarkTheme(theme) ? theme.colors.dark[2] : theme.colors.gray[6],
      // marginRight: theme.spacing.xs,
    },

    linkActive: {
      '&, &:hover': {
        fontWeight: 700,
        backgroundColor: isDarkTheme(theme)
          ? theme.fn.rgba(getColor(theme, 'primary', 8), 0.25)
          : getColor(theme, 'primary', 0),
        color: isDarkTheme(theme) ? theme.white : getColor(theme, 'primary', 7),
        [`& .${icon}`]: {
          color: getColor(theme, 'primary', isDarkTheme(theme) ? 5 : 7),
        },
      },
    },

    chevron: {
      transform: params.open ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
      transition: 'transform 200ms ease',
    },
    subItem: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      // paddingLeft: 31,
      marginLeft: theme.spacing.xl,
      fontSize: theme.fontSizes.sm,
      color: isDarkTheme(theme) ? getColor(theme, 'dark', 0) : getColor(theme, 'gray', 7),
      backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 1),
      borderLeft: `1px solid ${isDarkTheme(theme) ? getColor(theme, 'dark', 4) : getColor(theme, 'gray', 3)}`,

      '&:hover': {
        backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 7) : getColor(theme, 'gray', 2),
        color: isDarkTheme(theme) ? theme.white : theme.black,
      },
      '& .active': {
        backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 8) : getColor(theme, 'gray', 2),
      },
    },
  };
});
