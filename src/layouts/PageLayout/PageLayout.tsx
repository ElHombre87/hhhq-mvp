import { Box, Card, Container, ContainerProps, Sx } from '@mantine/core';

import { XstateDevtools } from 'components/XstateDevtools';
import { useLayoutContext, useLayoutStickyOffset } from 'contexts/Layout.context';
import useStyles from './PageLayout.styles';

export interface PageLayout extends ContainerProps {
  /** Page header with description, landing content, CTA, ... */
  header?: React.ReactElement;
  /**
   * Sticky element of the page. usually a toolbar or something similar. should not be
   * more than one line of content at least on desktop.
   * */
  sticky?: React.ReactElement;
  /** @deprecated - currently not in use */
  aside?: React.ReactElement;
  /** if `true` the `header` and `sticky` components will have a background color matching the MainLayout */
  withBackground?: boolean | 'sticky';
  /** add a shadow on the sticky element. defaults to `true` */
  withShadow?: boolean;
  /** padding on the sticky element. defaults to `true`*/
  padSticky?: boolean;
  /** if `false` renders a div instead of a mantine Container to wrap the children */
  withContainer?: boolean;
  /** if true shows the xstate devtools in the header */
  withDevtools?: boolean | number;
  sx?: ContainerProps['sx'] & {
    header?: Sx,
    sticky?: Sx,
    aside?: Sx,
    body?: Sx,
  }
}

export const PageLayout: React.FC<PageLayout> = ({
  header,
  children,
  aside,
  sticky,
  withBackground = true,
  withShadow = true,
  padSticky = true,
  withContainer = true,
  withDevtools = false,
  sx = {},
  ...other
}) => {
  const offset = useLayoutStickyOffset();
  const { refs, withAppbar } = useLayoutContext();

  const { classes, cx } = useStyles({
    offset,
    padSticky,
    withAppbar,
    backgroundType: withBackground,
  });

  const Wrapper = withContainer ? Container : Box;

  return (
    <Box ref={refs.wrapper} className={classes.wrapper}>
      {withDevtools && process.env.NODE_ENV === 'development' && (
        <XstateDevtools height={withDevtools} className={classes.devtools} />
      )}
      {header && ( // header section
        <Box
          component="div"
          // id="page-layout--header"
          ref={refs.header}
          sx={sx?.header ?? {}}
          className={cx(
            'page-layout--header',
            classes.header,
            'main',
            cx({
              [classes.withBackground]: withBackground,
            })
          )}
        >
          {header}
        </Box>
      )}
      {sticky && (
        <Box // Sticky wrapper
          // id="page-layout--sticky"
          sx={sx?.sticky ?? {}}
          ref={refs.sticky}
          className={cx(
            'page-layout--sticky',
            classes.header, classes.sticky, {
            [classes.shadow]: withShadow,
            [classes.withBackground]: withBackground,
          })}
        >
          {sticky}
        </Box>
      )}

      <Wrapper sx={sx?.body ?? {}} pt="xl" {...other} id="page-layout--content">
        {children}
      </Wrapper>

      {/* {aside && <Card>{aside}</Card>} */}
    </Box>
  );
};

export default PageLayout;
