import { NumberInput, NumberInputProps } from '@mantine/core';

export interface NumericInputProps extends NumberInputProps {}
export default function NumericInput({ max, min, value, onChange, ...others }: NumericInputProps) {
  return (
    <NumberInput
      min={min}
      max={max}
      value={value}
      hideControls
      variant="filled"
      stepHoldDelay={500}
      stepHoldInterval={100}
      styles={{ input: { width: 54, textAlign: 'center' } }}
      onChange={onChange}
      {...others}
    />
  );
}

// value => send({ type: 'SET_VALUE', value: value ?? 0 })
