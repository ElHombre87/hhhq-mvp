import { GetServerSidePropsContext } from 'next';

import './styles.global.css';
// import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { useHotkeys } from '@mantine/hooks';
import { hotkeys } from 'config/core';
import * as cookies from 'utils/cookies.utils';
import { useColorScheme, useCustomTheme } from 'hooks/theme';
import { APP_NAME } from 'config/core/common';
import { ModalsProvider } from '@mantine/modals';

import { openSpotlight } from '@mantine/spotlight';
import SpotlightProvider from 'components/Spotlight/Provider';
import { LayoutProvider } from 'contexts/Layout.context';
import Mainlayout from 'layouts/MainLayout';

import { inspect } from '@xstate/inspect';
// import XstateDevtools from 'components/XstateDevtools';

if (typeof window !== 'undefined') {
  inspect({});
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const { colorScheme, toggleColorScheme } = useColorScheme(props.colorScheme);
  const theme = useCustomTheme(colorScheme);

  useHotkeys([
    hotkeys.on.toggleTheme(() => toggleColorScheme()),
    hotkeys.on.openSpotlight(() => openSpotlight()),
  ]);

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <ModalsProvider modals={{}} modalProps={{ centered: true }}>
            <NotificationsProvider position="top-right" zIndex={2077}>
              <SpotlightProvider>
                <LayoutProvider navbarCollapsed>
                  <Mainlayout>
                    <Component {...pageProps} />
                  </Mainlayout>
                </LayoutProvider>
              </SpotlightProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: cookies.getConfig(ctx, 'color-scheme', 'dark'),
  sidebarCollapsed: cookies.getConfig(ctx, 'sidebarCollapsed', false),
});
