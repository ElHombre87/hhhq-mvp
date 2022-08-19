// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    notifyLoadSuccess: 'done.invoke.todos.loading_todos:invocation[0]';
    assignTodosToContext: 'done.invoke.todos.loading_todos:invocation[0]';
    notifyError:
      | 'error.platform.todos.loading_todos:invocation[0]'
      | 'error.platform.todos.deleting_todo:invocation[0]'
      | 'error.platform.todos.new_todo.saving_todo:invocation[0]';
    assignErrorToContext:
      | 'error.platform.todos.loading_todos:invocation[0]'
      | 'error.platform.todos.new_todo.saving_todo:invocation[0]';
    assignDeletingTodo: 'delete_todo';
    resetDeletingTodo:
      | 'done.invoke.todos.deleting_todo:invocation[0]'
      | 'error.platform.todos.deleting_todo:invocation[0]';
    assignInputToContext: 'form_input_changed';
    resetNewTodo: 'reset_new_todo';
    notifyLoadStart:
      | 'refresh_todos'
      | 'done.invoke.todos.deleting_todo:invocation[0]'
      | 'done.invoke.todos.new_todo.saving_todo:invocation[0]';
  };
  internalEvents: {
    'done.invoke.todos.loading_todos:invocation[0]': {
      type: 'done.invoke.todos.loading_todos:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.todos.loading_todos:invocation[0]': {
      type: 'error.platform.todos.loading_todos:invocation[0]';
      data: unknown;
    };
    'error.platform.todos.deleting_todo:invocation[0]': {
      type: 'error.platform.todos.deleting_todo:invocation[0]';
      data: unknown;
    };
    'error.platform.todos.new_todo.saving_todo:invocation[0]': {
      type: 'error.platform.todos.new_todo.saving_todo:invocation[0]';
      data: unknown;
    };
    'done.invoke.todos.deleting_todo:invocation[0]': {
      type: 'done.invoke.todos.deleting_todo:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.todos.new_todo.saving_todo:invocation[0]': {
      type: 'done.invoke.todos.new_todo.saving_todo:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    loadTodos: 'done.invoke.todos.loading_todos:invocation[0]';
    deleteTodo: 'done.invoke.todos.deleting_todo:invocation[0]';
    saveTodo: 'done.invoke.todos.new_todo.saving_todo:invocation[0]';
  };
  missingImplementations: {
    actions: 'notifyLoadSuccess' | 'notifyError' | 'notifyLoadStart';
    services: 'loadTodos' | 'deleteTodo' | 'saveTodo';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos:
      | 'refresh_todos'
      | 'done.invoke.todos.deleting_todo:invocation[0]'
      | 'done.invoke.todos.new_todo.saving_todo:invocation[0]';
    deleteTodo: 'delete_todo';
    saveTodo: 'submit_todo';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'loading_todos'
    | 'todos_loaded'
    | 'deleting_todo'
    | 'loading_error'
    | 'new_todo'
    | 'new_todo.show_form_input'
    | 'new_todo.saving_todo'
    | 'delete_todo_error'
    | { new_todo?: 'show_form_input' | 'saving_todo' };
  tags: never;
}
