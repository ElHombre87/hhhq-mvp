import { useEffect, useMemo } from 'react';
import {
  Navbar,
  ScrollArea,
  Group,
  Drawer,
  ActionIcon,
} from '@mantine/core';
import type { TSimpleNavLink } from 'config/navigation';

import { ChevronRight, ChevronLeft } from 'tabler-icons-react';
import ColorScheme from 'components/ColorSchemeToggle';
import * as cookies from 'utils/cookies.utils';
import { GetServerSidePropsContext } from 'next';
import { useLayoutNavbar, useLayoutRefs, useLayoutSize } from 'contexts/Layout.context';
import { Link } from './components/Links';

import useStyles from './Navbar.styles';

export interface NavBarProps {
  active: string;
  links: TSimpleNavLink[];
  onClick?: () => void;
  showCollapse?: boolean;
}

// eslint-disable-next-line max-len
export function NavBar({
  active,
  links,
  onClick,
  showCollapse = true,
  sidebarCollapsed,
  ...other
}: NavBarProps & { sidebarCollapsed?: boolean }) {
  const navbar = useLayoutNavbar();
  const size = useLayoutSize();
  const refs = useLayoutRefs();
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (sidebarCollapsed) navbar.collapse();
  }, [sidebarCollapsed]);

  const showDefaultLinks = useMemo(() => size === 'large' || size === 'small', [size]); //islarge || isSmall;

  const collapsed = !navbar.collapsed && showDefaultLinks;
  const LinkItem = collapsed ? Link.Default : Link.Button;
  const defaultWidths = { base: '100%', sm: 64, lg: 260, xl: 300 };
  const collapsedWidths = { base: 64 };

  return (
    <Navbar
      p="xs"
      pt="xl"
      ref={refs.navbar}
      position={{ top: 0, left: 0 }}
      classNames={{ root: cx(classes.navbar) }}
      hiddenBreakpoint="sm"
      hidden={!navbar.isOpen}
      width={navbar.collapsed ? collapsedWidths : defaultWidths}
      {...other}
    >
      {/* <Navbar.Section my="md">
        <Group direction="column" align="center" spacing="sm" />
      </Navbar.Section> */}

      <Navbar.Section grow component={ScrollArea}>
        {/* scrollable content here */}
        <Group direction="column" align="center" spacing="sm">
          {links.map((link) => (
            <LinkItem {...link} key={link.label} onClick={onClick} active={link.href === active} />
          ))}
        </Group>
      </Navbar.Section>

      <Navbar.Section my="md">

        <Group sx={{ width: '100%' }} spacing="sm" position="apart" px="xs">
          {showCollapse && showDefaultLinks && (
            <ActionIcon onClick={navbar.collapse} variant="hover">
              {navbar.collapsed ? <ChevronRight size={32} /> : <ChevronLeft size={32} />}
            </ActionIcon>
          )}
          <Group align="center" spacing="sm" position="apart">
            <ColorScheme.Button size="md" />
            <ActionIcon variant="hover" disabled>
              ?
            </ActionIcon>
          </Group>
        </Group>
        {/* Footer with user */}
        {/* <Group position="apart">
          <ColorSchemeToggle size='md'/>
        </Group> */}
      </Navbar.Section>
    </Navbar>
  );
}

NavBar.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  sidebarCollapsed: cookies.getConfig(ctx, 'sidebarCollapsed', false),
});

/**
 * Navbar wrapped inside a mantine drawer.
 * Used for mobile view and rendered conditionally only on small window sizes
 * to prevent issues with other UI elements and logic that rely on the navbar
 * being available by default on wider screen sizes.
 * @props Accepts all the props from Navbar except onClick for semantic reasons.
 *        `onClose` will be passed down for the onClick.
 */
export function NavDrawer(props: Omit<NavBarProps, 'onClick'>) {
  const navbar = useLayoutNavbar();

  return (
    <Drawer
      size="100%"
      overlayBlur={3}
      opened={navbar.isOpen}
      onClose={navbar.close}
      transition="fade"
      transitionDuration={250}
      transitionTimingFunction="ease"
    >
      <NavBar showCollapse={false} onClick={navbar.close} {...props} />
    </Drawer>
  );
}
