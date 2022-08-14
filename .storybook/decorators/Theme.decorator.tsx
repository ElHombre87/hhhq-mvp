import React, { useEffect, useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useDarkMode } from 'storybook-dark-mode';
import useCustomTheme from '../../src/hooks/theme/use-custom-theme';

const darkModeToColorScheme = (isDarkMode: boolean) => (isDarkMode ? 'dark' : 'light');

export function ThemeDecorator(props: { children: React.ReactNode }) {
  const isDarkMode = useDarkMode();
  const [scheme, setScheme] = useState<ColorScheme>(darkModeToColorScheme(isDarkMode));
  const theme = useCustomTheme(scheme);

  useEffect(() => {
    setScheme(darkModeToColorScheme(isDarkMode));
  }, [isDarkMode]);

  return (
    <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={() => {}}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {props.children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export const withTheme = () => (story: Function) => <ThemeDecorator>{story()}</ThemeDecorator>;
export default withTheme;
