import { Alert, Center, Code, Container, Group, Text } from '@mantine/core';
import PageLayout from 'layouts/PageLayout';
// import { RedditApp } from 'modules/playground';
import { App as RedditDemoApp } from 'modules/playground/reddit/demo.app';

export default function Playground() {
  return (
    // <RedditProvider>
    <PageLayout
      size="md"
      header={
        <Container size="lg">
          <Center my="xl">
            This demo app uses the new split machine system all inside the component. The final
            objective is to split the app into components and a React Context to handle all the
            stuff through hooks.
          </Center>
          <Alert my="xl">Use the select box to toggle between predefined subreddits</Alert>
        </Container>
      }
      sticky={
        <>
          <Group align="center" position="right">
            <Text size="xs">component</Text>
            <Code>modules/playground/reddit/demo.app</Code>
            <Text size="xs">page</Text>
            <Code>pages/playground/reddit/demo</Code>
          </Group>
        </>
      }
    >
      <RedditDemoApp />
    </PageLayout>
    // </RedditProvider>
  );
}
