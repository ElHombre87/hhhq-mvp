import { Text, NumberInput } from '@mantine/core';
import type { NumberInputProps } from '@mantine/core';

interface Input extends NumberInputProps {
  symbol: 'C' | 'F' | 'K';
}
export const Input: React.FC<Input> = ({ value, onChange, symbol, ...other }) => {
  const isKelvin = symbol === 'K';
  const isError = isKelvin && value && value < 0;

  return (
    <NumberInput
      value={value}
      onChange={onChange}
      icon={<Text>{symbol}</Text>}
      error={isError ? 'Kelvin must be greater than 0' : false}
      {...other}
    />
  );
};

export default Input;
