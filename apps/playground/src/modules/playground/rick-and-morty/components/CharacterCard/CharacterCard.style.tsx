import { createStyles } from '@mantine/core';
import { isDarkTheme } from 'utils/theme.utils';

export const useStyles = createStyles((theme, _, getRef) => ({
  image: {
    ref: getRef('image'),
  },
  avatar: {
    zIndex: 2,
    border: `${theme.spacing.xs / 2}px solid ${isDarkTheme(theme) ? theme.colors.dark[6] : theme.white}`,
    // borderTopLeftRadius: 64,
    // borderTopRightRadius: 64,
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  indicator: {
    borderColor: `${isDarkTheme(theme) ? theme.colors.dark[6] : theme.white}`,
    width: '60%',
  },
  statDivider: {
    flexGrow: 2,
    background: `${isDarkTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[3]}`,
    height: 1,
    opacity: 0.5,
  },
  header: {
    padding: 48,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.colors.dark[isDarkTheme(theme) ? 8 : 2],
    [`& .${getRef('image')}`]: {
      position: 'absolute',
      top: '-50%',
      left: 0,
      width: '100%',
      objectFit: 'cover',
      zIndex: 0,
    },
  },

}));
