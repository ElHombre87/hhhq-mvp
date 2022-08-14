import { Title } from '@mantine/core';
import PageLayout from 'layouts/PageLayout';
import TodoApp from 'modules/playground/todo';

export default function Playground() {
  return (
    <PageLayout
      header={<Title align="center">Your todos</Title>}
    >
      <TodoApp />
    </PageLayout>
  );
}
