import type { MantineThemeOverride } from '@mantine/core';
import { Tuple, DefaultMantineColor } from '@mantine/core';

export type CustomColor = DefaultMantineColor;
  // | 'svasti';
  // | 'secondaryColorName'

export type ColorMap = Record<CustomColor, Tuple<string, 10>>;
/** Extends Mantine theme interface */
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: ColorMap;
  }

  export interface MantineThemeOther {
    headerHeight: number;
    colors: {
      /** replicated `theme.primaryColor` for consistency */
      primary: CustomColor;
      secondary: CustomColor;
      info: CustomColor;
      warning: CustomColor;
      error: CustomColor;
      success: CustomColor;
    };
  }
  export type OtherColor = keyof MantineThemeOther['colors'];
  export type ThemeColor = CustomColor | OtherColor | 'white';
  export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const primaryColor: CustomColor = 'blue';

/**
 * Base theme with shared common configurations.
 * Overrides (light|dark) should only contain colors and colorScheme
 * configurations.
 */
export const base: MantineThemeOverride = {
  defaultRadius: 'sm',
  primaryColor,
  other: {
    headerHeight: 60,
    colors: {
      primary: primaryColor,
      secondary: 'orange',
      info: 'cyan',
      warning: 'yellow',
      error: 'red',
      success: 'green',
    },
  },
  // TODO: Add "standard" default colors
  // for states (info, warn, error, success,...)
  // primary (existing) secondary
  // layout sections (nav, header, ...)
};

export default base;
