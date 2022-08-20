import { ActionIcon } from '@mantine/core';

interface CounterButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
}
export default function CounterButton({ icon, onClick, disabled }: CounterButtonProps) {
  return (
    <ActionIcon size="lg" variant="light" color="primary" onClick={onClick} disabled={disabled}>
      {icon}
    </ActionIcon>
  );
}
