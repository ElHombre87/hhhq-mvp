import { createMachine, assign } from 'xstate';

type Services = {
  loadTodos: { data: string[] };
  saveTodo: { data: void };
  deleteTodo: { data: void };
};

export type Events =
  | { type: 'refresh_todos' }
  | { type: 'create_new_todo' }
  | { type: 'form_input_changed'; value: string }
  | { type: 'submit_todo' }
  | { type: 'reset_new_todo' }
  | { type: 'delete_todo'; todo: string };

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQBtUEMIBLAOygH00NYBiDEsLUgN1QGtGrNcDizL0mBC1QBjfMiKoSAbQAMAXUSgADpiKTpykAA9EAWgBMANmNYA7OYAsADlsBWAIxWnATkcAaEAE8Djm4ZYhq6udvZycuaGNgEAvrFeXNh4hKQUSTRgAE5ZqFlYKjgSAGZ5ALZYSTyp-EnCJKzimrKK2mqwGlIk2noI+i6uWMaG9tH2po7jVsb2Xr59-oHBoQDMhpP2divG8YmC2EnkKRCQNKJZYBJg5AwA7gIYberNPQaGVuZD-sYRA5HmrlmPkQKzkg02I3sVjkxkcEUBuxAVUOx1OF2KF1gAAsHpgnh0XkhdIhxkFQTZRqF7CtbK5DHM-LYgiEKWCbI5XCsYojkfsjrxTiccGBkNcuPjOloib1+oZPi4af5XOZ7HTVcYGQgbCssK5bIY5NCVRM4gkkfssEKRWlcXRpIwRBxKharZJaoJ6o0JF15Eoie1Jd1pQZ3Dq5ByWVMKSZNfoVjSsNMbIaZi4ZoZDDyXWBhW70oJMjk8gUishSlkKlVXTauJ6xN7pL6JYTQDLXHIbFhVeyVtSocYbDNNRnAo5jJZ48mrGOXFnqNU+BRsrksjR0ZicUlm11Xn1zM4sDDHJNXAPJ+HY85O8ttcZJ-5zPG59w7risNjUPdy2VyKQVABXZAaG-X8SAA5ByFELF8DISBtylVtEEcCwaRhdYVk5dxTEiYcMywMdzHHEJ3gwuF7GfbBXy4d8sU-cgQL-QCaFgf8ACMyg0XF4KDRCEBWcxO3bISKRsSxqU8YE+McQJT2VdZYWiNYbAorAqMEGi6IYsCmMxEUbjAe5xX9Z4d2DBBgkCaxCJ+O9wnGelJP0aSLEBacPmVQ1HwpFS1Iwd98GYGsC3oB0GnYTgLV81B-MC90MDrJofVaYyCVM3irAww9T2hRwMPecMbFjFYD1PKc7CsQFVUcHyDLfWAAqCjBCxXEsSnKZ15yimLGtQBKGxaP1VBMhDiQQRZDxmRxzDkYInHHQwVk1fjPhCaxplMAJwkHFTXTFQRyGXPIaB0WBkCuLB8GKUUsgAChGOQAEoaCrHMRT2jADqLLJuN3fQfisCwImmgJppMKaloHLAMIBVVpjlMGVniM0SHQOBtCqY4evgFLA1+rlBiVKEBJCaF3CBeY42MAHSsNcqYVEqEVJRAUIB+syjFJH5gn3Mj3kfTU5CCQ1VRm-ix3cax7HMHbXrzLicZbUb9DpQYrAq8d+KhA1AU1JxdX1CyMsfJxEbNDHeBtQ7voVtKlZcZCPgHcJlQpfdBwFoW-gW-djAl2yasM9SPy-cpQPAtneJMTsfYwjC5HjR9Fskhb7Hw8cokNA1pv4zMzci2rqPq2L80eG2Rt6KwDSwMIOwzOGVV7JaAV1ZUXAiSEBOqvPOoLwQI6VvCTFVfjBxhDsaU1ZwCfHX3-i5NZhhl3N3tQT6V37tt3gsSZQX3fKOQh5CbGVDz-FH9YKI3kNqUTdXHxVSuwXJgwjd1Ac5HGCk1ksawkdiIA */
export const todosMachine = createMachine(
  {
    context: {
      todos: [] as string[],
      newTodo: '' as string,
      error: undefined as string | undefined,
      todoDeleting: undefined as string | undefined,
    },
    tsTypes: {} as import('./todos.machine.typegen').Typegen0,
    schema: { services: {} as Services, events: {} as Events },
    id: 'todos',
    initial: 'loading_todos',
    states: {
      loading_todos: {
        entry: 'notifyLoadStart',
        invoke: {
          src: 'loadTodos',
          onDone: [
            {
              actions: ['notifyLoadSuccess', 'assignTodosToContext'],
              target: 'todos_loaded',
            },
          ],
          onError: [
            {
              actions: ['notifyError', 'assignErrorToContext'],
              target: 'loading_error',
            },
          ],
        },
      },
      todos_loaded: {
        on: {
          create_new_todo: {
            target: 'new_todo',
          },
          refresh_todos: {
            target: 'loading_todos',
          },
          delete_todo: {
            target: 'deleting_todo',
            actions: 'assignDeletingTodo',
          },
        },
      },
      deleting_todo: {
        invoke: {
          src: 'deleteTodo',
          onDone: [
            {
              // actions: 'assignDeletingTodo',
              actions: ['resetDeletingTodo'],
              target: 'loading_todos',
            },
          ],
          onError: [
            {
              actions: ['resetDeletingTodo', 'notifyError'],
              target: 'delete_todo_error',
            },
          ],
        },
      },
      loading_error: {
        on: {
          refresh_todos: {
            target: 'loading_todos',
          },
        },
      },
      new_todo: {
        initial: 'show_form_input',
        states: {
          show_form_input: {
            on: {
              form_input_changed: {
                actions: 'assignInputToContext',
              },
              submit_todo: {
                target: 'saving_todo',
              },
              reset_new_todo: {
                actions: 'resetNewTodo',
                target: '#todos.todos_loaded',
              },
            },
          },
          saving_todo: {
            invoke: {
              src: 'saveTodo',
              onDone: [
                {
                  target: '#todos.loading_todos',
                },
              ],
              onError: [
                {
                  actions: ['assignErrorToContext', 'notifyError'],
                  target: 'show_form_input',
                },
              ],
            },
          },
        },
      },
      delete_todo_error: {
        after: {
          250: {
            target: 'todos_loaded',
          },
        },
      },
    },
  },
  {
    actions: {
      assignErrorToContext: assign((_, event) => ({ error: (event.data as Error).message })),
      assignTodosToContext: assign((_, event) => ({ todos: event.data })),
      assignInputToContext: assign((_, event) => ({ newTodo: event.value })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resetNewTodo: assign((_, __) => ({ newTodo: '' })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      assignDeletingTodo: assign((_, event) => ({ todoDeleting: event.todo })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resetDeletingTodo: assign((_, __) => ({ todoDeleting: undefined })),
    },
  }
);

export default todosMachine;
