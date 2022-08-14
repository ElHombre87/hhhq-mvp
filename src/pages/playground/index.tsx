import {
  Container,
  Title,
  Grid,
  Card,
  Code,
  Divider,
  Alert,
  Group,
  MantineTheme,
} from '@mantine/core';
import PageLayout from 'layouts/PageLayout';
import { TodoApp, CounterApp, TemperatureConverter } from 'modules/playground';
import { RedditApp } from 'modules/playground/reddit';

import { useState } from 'react';
import { ChevronDown } from 'tabler-icons-react';

interface Section {
  title: string;
  sm?: number;
  md?: number;
  lg?: number;
  size?: number;
}
const Section: React.FC<Section> = ({ title, children, size, sm = 12, md = 6, lg = 4 }) => (
  <Grid.Col sm={size ?? sm} md={size ?? md} lg={size ?? lg}>
    <Card shadow="md">
      <Title align="center" mb="xl" order={2}>
        {title}
      </Title>
      {children}
    </Card>
  </Grid.Col>
);

const HeaderWrapper: React.FC<{ landing?: boolean }> = ({ landing = false, children }) => {
  const landingSx = (theme: MantineTheme) => ({
    minHeight: `calc(100vh - ${theme.other.headerHeight * 2}px)`,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  });

  return (
    <Container sx={landing ? landingSx : {}} mt="xl" size={landing ? 'sm' : 'xl'}>
      <Group direction="column" align="center">
        {children}
        {landing && <ChevronDown size={64} />}
      </Group>
    </Container>
  );
};

export default function Playground() {
  const [counter] = useState(25);
  return (
    <PageLayout
      size="xl"
      header={
        <HeaderWrapper>
          <Title align="center" mb="xl">
            Playground
          </Title>
          <Alert color="cyan" title="Welcome to the playground">
            This section is meant to be a playground for testing components, features and
            functionalities; specifically it is a place to learn how to use the <Code>xtate</Code>,{' '}
            <Code>mantine</Code> libraries and how to integrate them with a real back end
            application and <Code>web3</Code> libraries.
          </Alert>
        </HeaderWrapper>
      }
    >
      <Grid mt="xl">
        <Section title="Todo Machine">
          <TodoApp height={350} />
        </Section>
        <Section title="Counter Machine">
          {/* <NumberInput value={counter} onChange={v => setCounter(v ?? 0)} /> */}
          <CounterApp max={counter} />
        </Section>
        <Section title="Temperatures">
          <Alert color="yellow" mb="sm" variant="outline">
            Testing multiple copies of a single state machine. These should be independent from each
            other.
          </Alert>
          <TemperatureConverter />
          <Divider my="sm" />
          <TemperatureConverter />
        </Section>
        {/* <Section title="Reddit Machine" size={12}>
          <RedditApp height={600} />
        </Section> */}
      </Grid>
    </PageLayout>
  );
}
