import { SimpleGrid } from '@mantine/core';
import { useMachine } from '@xstate/react';
import { temperatureMachine } from '../machines';
import { Input } from './Input.temperature';

export default function TemperatureConverter() {
  const [state, send] = useMachine(temperatureMachine);
  const { C, F, K } = state.context;
  return (
    <SimpleGrid cols={3}>
      <Input
        symbol="C"
        value={C}
        onChange={(value) => send({ type: 'CELSIUS', payload: value ?? 0 })}
      />
      <Input
        symbol="F"
        value={F}
        onChange={(value) => send({ type: 'FAHRENHEIT', payload: value ?? 0 })}
      />
      <Input
        min={0}
        value={K}
        symbol="K"
        onChange={(value) => send({ type: 'KELVIN', payload: value ?? 0 })}
      />
    </SimpleGrid>
  );
}
