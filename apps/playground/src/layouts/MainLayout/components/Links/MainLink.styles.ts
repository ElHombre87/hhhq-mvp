import { createStyles } from '@mantine/core';
import { getColor, isDarkTheme } from 'utils/theme.utils';

const PRIMARY = 'primary';
const SECONDARY = 'orange';

export default createStyles((theme, _, getRef) => {
  const icon = getRef('icon');
  const subitem = getRef('subitem');
  const active = getRef('active');

  const hoverColor = (color:string):string => getColor(theme, color, isDarkTheme(theme) ? 2 : 8);
  // eslint-disable-next-line max-len
  const activeBackground = (color:string):string => getColor(theme, color, 7);
  const iconColor = (color:string):string => getColor(theme, color, isDarkTheme(theme) ? 2 : 5);
  // eslint-disable-next-line max-len
  const iconActiveColor = (color:string):string => getColor(theme, color, isDarkTheme(theme) ? 5 : 2);

  return {
    link: {
      ...theme.fn.focusStyles(),
      width: '100%',
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      borderRadius: theme.radius.md,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      color: getColor(theme, 'gray', isDarkTheme(theme) ? 4 : 9),
      '&:hover': {
        fontWeight: 600,
        backgroundColor: isDarkTheme(theme) ? getColor(theme, 'dark', 6) : getColor(theme, 'gray', 1),
        color: hoverColor(PRIMARY),

        [`& .${icon}`]: { color: iconColor(PRIMARY) },
        [`&.${subitem}`]: {
          [`& .${icon}`]: { color: iconColor(SECONDARY) },
        },
      },
    },

    icon: {
      ref: icon,
      color: getColor(theme, PRIMARY, isDarkTheme(theme) ? 6 : 6),
      marginRight: theme.spacing.xs,
    },

    active: {
      ref: active,
      '&, &:hover': {
        fontWeight: 700,
        backgroundColor: activeBackground(PRIMARY),
        [`& .${icon}`]: {
          color: iconActiveColor(PRIMARY),
        },
      },
    },
    subitem: {
      ref: subitem,
      paddingLeft: 32,
      '&:hover': {
        color: hoverColor(SECONDARY),
      },
      [`& .${icon}`]: {
        color: iconActiveColor(SECONDARY),
      },
      [`&.${active}`]: {
        backgroundColor: activeBackground(SECONDARY),
      },
    },
  };
});
