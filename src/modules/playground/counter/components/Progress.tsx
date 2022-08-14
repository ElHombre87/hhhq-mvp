import { Center, RingProgress, ThemeIcon, Text } from '@mantine/core';
import { Check } from 'tabler-icons-react';

const formatNumber = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const CompleteIcon = () => (
  <Center>
    <ThemeIcon color="teal" variant="filled" radius="xl" size="xl">
      <Check size={22} />
    </ThemeIcon>
  </Center>
);

const CounterText = ({ value }: { value: number }) => (
  <Text color="primary" weight={700} align="center" size="xl">
    {formatNumber(value)}%
  </Text>
);

export default function Progress({
  current,
  max,
  min = 0,
}: {
  current: number;
  max: number;
  min?: number;
}) {
  const percentage = ((current - min) / (max - min)) * 100;
  const done = percentage === 100;

  return (
    <RingProgress
      roundCaps
      sections={[{ value: percentage, color: 'teal' }]}
      thickness={done ? 24 : undefined}
      label={done ? <CompleteIcon /> : <CounterText value={percentage} />}
    />
  );
}
