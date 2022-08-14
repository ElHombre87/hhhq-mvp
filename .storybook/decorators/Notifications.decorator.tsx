import { NotificationsProvider } from '@mantine/notifications';

export function NotificationsDecorator(props: { children: React.ReactNode }) {
  return <NotificationsProvider>{props.children}</NotificationsProvider>;
}

export const withNotifications = () => (story: Function) =>
  <NotificationsDecorator>{story()}</NotificationsDecorator>;

export default withNotifications;
