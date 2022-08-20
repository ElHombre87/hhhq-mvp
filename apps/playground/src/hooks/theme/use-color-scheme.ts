import { ColorScheme } from '@mantine/core';
import { setCookies } from 'cookies-next';
import { useState } from 'react';
import { getCookieName, saveLayoutConfig } from 'utils/cookies.utils';
import { useColorScheme as useMantineColorScheme } from '@mantine/hooks';

export interface ColorSchemeHook {
  colorScheme: ColorScheme;
  toggleColorScheme: (value?: ColorScheme | undefined) => void;
  setColorScheme: (value: ColorScheme) => void;
}
/**
 * Generic hook to set up the mantine color scheme management
 * @param scheme Mantine ColorScheme selector
 */
export function useColorScheme(scheme: ColorScheme): ColorSchemeHook {
  const preferredColorScheme = useMantineColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(scheme || preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies(getCookieName('color-scheme'), nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    saveLayoutConfig({ 'color-scheme': nextColorScheme });
    // setCookies(getCookieName('color-scheme'), nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  return { colorScheme, toggleColorScheme, setColorScheme };
}

export default useColorScheme;
