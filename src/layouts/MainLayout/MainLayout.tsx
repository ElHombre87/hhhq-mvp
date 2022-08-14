import { useRouter } from 'next/router';
import { AppShell } from '@mantine/core';

import navLinks from 'config/navigation';
// import { APP_NAME } from 'config/core/common';
import { useLayoutContext } from 'contexts/Layout.context';
import { useMemo } from 'react';
import { NavBar, NavDrawer } from './Navbar';
import useStyles from './MainLayout.styles';
import { MainHeader } from './Header';

export const MainLayout: React.FC = ({ children }) => {
  const { asPath: path } = useRouter();
  const { classes } = useStyles();
  const { withAppbar, size } = useLayoutContext();

  const NavbarComponent = useMemo(() => size === 'small' ? NavDrawer : NavBar, [size]);

  return (
    <AppShell
      fixed
      padding={0}
      classNames={{ body: classes.body }}
      navbar={<NavbarComponent active={path} links={navLinks} />}
      header={withAppbar ? <MainHeader /> : undefined}
      footer={<div className={classes.footer} />} // footer area
    >
      {children}
    </AppShell>
  );
};
