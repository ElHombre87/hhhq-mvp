import { extendTheme } from 'utils/theme.utils';
import { primaryGreen, primaryOrange } from './palette';

export const withPalette = extendTheme({
  colors: {
    green: primaryGreen,
    orange: primaryOrange,
  },
  primaryColor: 'green',
  other: {
    //@ts-ignore
    colors: {
      primary: 'green'
    }
  }
});

export const light = extendTheme({
  colorScheme: 'light',
}, withPalette);

export const dark = extendTheme({
  colorScheme: 'dark',
}, withPalette);
