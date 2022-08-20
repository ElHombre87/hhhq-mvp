import { ContextModalProps, ModalsProvider } from '@mantine/modals';
// import modals from '../components/Modals';

export type Modals = Record<string, React.FC<ContextModalProps<any>>>;

export function ModalsDecorator(props: { children: React.ReactNode; modals: Modals }) {
  return <ModalsProvider modals={props.modals}>{props.children}</ModalsProvider>;
}

export const withModals =
  (modals: Modals = {}) =>
  (story: Function) =>
    <ModalsDecorator modals={modals}>{story()}</ModalsDecorator>;

export default withModals;
