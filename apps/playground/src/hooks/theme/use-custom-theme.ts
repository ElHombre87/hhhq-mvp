import { ColorScheme, MantineThemeOverride } from '@mantine/core';
import customThemes from 'config/core/theme';
import { useEffect, useState } from 'react';

function getTheme(name: ColorScheme): MantineThemeOverride {
  return customThemes[name];
}

export const useCustomTheme = (theme: ColorScheme) => {
  const [customTheme, setCustomTheme] = useState<MantineThemeOverride>(getTheme(theme));
  useEffect(() => setCustomTheme(getTheme(theme)), [theme]);
  return customTheme;
};

export default useCustomTheme;
