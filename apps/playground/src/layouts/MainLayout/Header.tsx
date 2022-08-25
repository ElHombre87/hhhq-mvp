/* eslint-disable no-alert */
import { Text, Header, Group, MediaQuery, Burger } from '@mantine/core';

// import { ColorScheme } from 'components/ColorSchemeToggle';
// import { WalletButton } from 'components/Web3/Wallet';
import { useLayoutContext } from 'contexts/Layout.context';

import useStyles from './Header.styles';
import * as CONFIG from 'config/core/common'

export interface MainHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = () => {
  const { classes, cx } = useStyles();
  const { navbar, breakpoints, refs } = useLayoutContext();
  // const refs = useLayout

  return (
    <Header px="md" height={60} classNames={{ root: cx(classes.header) }} ref={refs.appbar}>
      <Group sx={{ height: '100%' }} position="apart" mx="xs">
        <Group align="center" sx={{ alignItems: 'center' }}>
          <MediaQuery largerThan={breakpoints.small} styles={{ display: 'none' }}>
            {/* <Burger size="sm" opened={navOpen} onClick={toggleNav} /> */}
            <Burger size="sm" opened={navbar.isOpen} onClick={navbar.toggle} />
          </MediaQuery>
          <Text variant="text" component="h4">
            {CONFIG.APP_NAME}
          </Text>
        </Group>
        <Group position="apart">
          {/* <ColorScheme.Button size="md" /> */}
        </Group>
      </Group>
    </Header>
  );
};
