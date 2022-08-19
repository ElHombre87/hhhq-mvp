const fillers = (amnt: number) =>
  Array(amnt)
    .fill(0)
    .map((_, i) => `Todo ${i + 1}`);
const MOCK_TODOS = new Set<string>([
  'Take bins out',
  'Clean up',
  'Work',
  'Make dinner',
  'Walk the dog',
  'Sleep',
  ...fillers(0),
]);

export const loadTodos = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
  // throw new Error('Error loading todos');
  return Array.from(MOCK_TODOS);
};

export const saveTodo = async (todo: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
  MOCK_TODOS.add(todo);
  // throw new Error('Error saving todo');
};

export const deleteTodo = async (todo: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
  MOCK_TODOS.delete(todo);
  // throw new Error('Error deleting todo');
};
