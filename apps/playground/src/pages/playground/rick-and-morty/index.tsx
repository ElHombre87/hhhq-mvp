import { Container, Title } from '@mantine/core';
import PageLayout from 'layouts/PageLayout';
import { RickAndMorty, RickAndMortyProvider } from 'modules/playground/rick-and-morty';
import { Toolbar } from 'modules/playground/rick-and-morty/components';
import React, { Suspense } from 'react';

export const RickAndMortyHome: React.FC = () => (
  <RickAndMortyProvider>
  <PageLayout
    withDevtools
    // withContainer={false}
    // size="xl"
    size={2560}
    header={<Title align="center">The Rick and Morty API</Title>}
    sticky={
      <Container>
        <Toolbar />
      </Container>}
  >
    <Container size={2560} p="xl">
    <Suspense fallback={<div>Loading...</div>}>
      <RickAndMorty />
    </Suspense>
    </Container>
  </PageLayout>
  </RickAndMortyProvider>
);

export default RickAndMortyHome;
