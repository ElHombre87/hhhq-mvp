import { getColor } from 'utils';
import type { ColorIndex, ThemeColor } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

export function useGetColor() {
  const theme = useMantineTheme();
  return <K extends ThemeColor>(color: K, index?: ColorIndex) =>
    // ternary for typescript to infer the return type
    index !== undefined
      ? getColor(theme, color, index)
      : getColor(theme, color);
}
