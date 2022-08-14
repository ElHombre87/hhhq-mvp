import { Box, BoxProps, createStyles } from '@mantine/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getColor, isDarkTheme } from 'utils/theme.utils';

const useStyles = createStyles((theme, { height }: { height: number }) => ({
  devtools: {
    width: `calc(100% + ${theme.spacing.md * 2}px)`,
    margin: `-${theme.spacing.xl}px -${theme.spacing.md}px`,
    minHeight: height ?? undefined,
    // border: `1px dashed ${isDarkTheme(theme) ? getColor(theme, 'dark', 2) : getColor(theme, 'gray', 9)}`,
    border: 0,
  },
}));

export interface XstateDevtools extends BoxProps<'iframe'> {
  height?: number | any,
  className?: string
};
export const XstateDevtools: React.FC<XstateDevtools> = ({ height, className }) => {
  const { classes, cx } = useStyles({ height });

  // if (typeof window === 'undefined') return <iframe title="render-side" />;
  return (
    <Box
      data-xstate
      component="iframe"
      title="xstate-inspector-iframe"
      className={cx(classes.devtools, className)}
      // title="render-side"
    />
  );
};

export default XstateDevtools;
