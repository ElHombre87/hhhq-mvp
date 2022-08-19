import { useCallback, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import {
  Text,
  Button,
  Group,
  TextInput,
  ActionIcon,
  LoadingOverlay,
  ScrollArea,
} from '@mantine/core';
import { Notes, X } from 'tabler-icons-react';
import { UpdateIcon } from '@modulz/radix-icons';

import { TodoList } from './TodoItems';

import { todosMachine, actions } from '../machines';
import { services } from '../libs';

function TodoApp({ height = 'auto' }: { height?: string | number }) {
  const machine = useMemo(() => todosMachine, [todosMachine]);
  const [state, send] = useMachine(machine, {
    services: {
      loadTodos: services.loadTodos,
      saveTodo: (ctx) => services.saveTodo(ctx.newTodo),
      deleteTodo: (_, event) => services.deleteTodo(event.todo),
    },
    actions: {
      notifyLoadStart: () => actions.notifyLoadStart(),
      notifyLoadSuccess: (_, event) => actions.notifyLoadResult(event.data.length),
      notifyError: (_, event) => actions.notifyError(event.data as Error),
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: 'form_input_changed', value: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ type: 'submit_todo' });
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ type: 'reset_new_todo' });
  };

  const handleDeleteTodo = useCallback(
    (todo: string) => {
      send({ type: 'delete_todo', todo });
    },
    [send]
  );

  const isLoading = useMemo(() => state.matches('loading_todos'), [state.value]);
  const isSaving = useMemo(() => state.matches('new_todo.saving_todo'), [state.value]);
  const showForm = useMemo(
    () => state.matches('new_todo.show_form_input') || isSaving,
    [state.value]
  );

  return (
    <>
      <Group position="center" my="xl" py="md" sx={{ position: 'relative' }}>
        <LoadingOverlay visible={isSaving || isLoading} />
        {!showForm && (
          <>
            <Button size="sm" disabled={isLoading} onClick={() => send('create_new_todo')}>
              NEW TODO
            </Button>
            <ActionIcon
              size="lg"
              color="primary"
              disabled={isLoading}
              variant="light"
              onClick={() => send('refresh_todos')}
            >
              <UpdateIcon />
            </ActionIcon>
          </>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Group position="center">
              <TextInput
                autoFocus
                icon={<Notes size={14} />}
                placeholder="What needs to be done?"
                onChange={handleInputChange}
                width="100%"
              />
              <Button loading={isSaving} type="submit" disabled={!state.context.newTodo}>
                Submit
              </Button>
              <ActionIcon size="lg" color="red" type="reset" variant="light" disabled={isSaving}>
                <X size={18} />
              </ActionIcon>
            </Group>
          </form>
        )}
      </Group>
      <ScrollArea offsetScrollbars style={{ height }}>
        {state.context.todos.length ? (
          <TodoList
            todos={state.context.todos}
            onDeleteTodo={handleDeleteTodo}
            deleting={state.context.todoDeleting}
          />
        ) : (
          <Text align="center" size="lg" color="primary">
            Nothing to do
          </Text>
        )}
      </ScrollArea>
    </>
  );
}

export default TodoApp;
