import { showNotification, updateNotification, hideNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';

const TODOS_LOADING_ID = 'todos-loading';
const TODO_SAVING_ID = 'todos-saving';
// const TODOS_ERROR_ID = 'todos-error';

export function notifyLoadStart() {
  showNotification({
    id: TODOS_LOADING_ID,
    title: 'Loading Todos',
    message: 'Please wait',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });
}
export function notifyLoadResult(todosCount: number) {
  // hideNotification(TODOS_LOADING_ID);

  updateNotification({
    id: TODOS_LOADING_ID,
    title: 'Todos loaded',
    message: `Loaded ${todosCount} todos`,
    color: 'teal',
    icon: <Check size={18} />,
  });
}

export function notifyError(error: Error) {
  hideNotification(TODOS_LOADING_ID);
  hideNotification(TODO_SAVING_ID);

  showNotification({
    // id: TODOS_ERROR_ID,
    title: 'Error',
    message: error.message,
    color: 'red',
    icon: <X size={18} />,
  });
}

export function notifySaveStart() {
  showNotification({
    id: TODO_SAVING_ID,
    title: 'Saving Todos',
    message: 'Please wait',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });
}
