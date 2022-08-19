import React, { useCallback, useEffect, useState } from 'react';
import { Card, Group, Stack, ActionIcon, Checkbox, Divider } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { X } from 'tabler-icons-react';

export interface TodoItem {
  todo: string;
  onDelete: (todo: string) => void;
  deleting?: string;
}

export const TodoItem: React.FC<TodoItem> = ({ todo, onDelete, deleting }) => {
  const { hovered, ref } = useHover();
  const [isDeleting, setDeleting] = useState(deleting === todo);
  const [checked, setChecked] = useState(Math.random() > 0.0);
  useEffect(() => {
    setDeleting(deleting === todo);
  }, [deleting]);

  const handleDelete = useCallback(() => {
    if (isDeleting || deleting || !onDelete) return;
    onDelete(todo);
  }, [todo, deleting, onDelete]);

  return (
    <Card
      shadow={hovered ? 'xl' : 'none'}
      p="lg"
      ref={ref}
      sx={{ transition: 'box-shadow 0.2s ease-in-out' }}
    >
      <Group position="apart">
        <Checkbox
          radius="xl"
          size="md"
          checked={checked}
          onChange={() => setChecked((p) => !p)}
          color="green"
          label={todo}
        />
        {(hovered || isDeleting) && (
          <ActionIcon
            size="sm"
            color="red"
            variant={isDeleting ? 'transparent' : 'outline'}
            loading={isDeleting}
            disabled={!!deleting}
            onClick={handleDelete}
          >
            <X size={16} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
};

export interface TodoList {
  todos: string[];
  onDeleteTodo: (todo: string) => void;
  deleting?: string;
}
export const TodoList: React.FC<TodoList> = ({ todos, onDeleteTodo, deleting }) => (
  <Stack sx={{ width: '100%' }}>
    {todos.map((todo, index) => (
      <React.Fragment key={`${todo}_${index}`}>
        <TodoItem todo={todo} onDelete={onDeleteTodo} deleting={deleting} />
        {index !== todos.length - 1 && <Divider variant="dotted" size="sm" />}
      </React.Fragment>
    ))}
  </Stack>
);

export default TodoList;
