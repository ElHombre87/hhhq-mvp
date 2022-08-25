/* eslint-disable max-len */
import _ from 'lodash';
import common, { CustomColor } from 'config/core/theme/base.theme';
import {  MantineThemeOverride, ColorIndex, MantineTheme, OtherColor, ThemeColor } from '@mantine/core';

function hasColor(theme: MantineThemeOverride, color: ThemeColor): boolean {
  // return _.has(theme, color);
  return !!theme.other && color in theme.other.colors;
}
/**
 * Generate an override for the mantine theme from a base optional theme.
 * @param overrides Final overrides for the generated theme
 * @param base optional - base theme to override
 * @returns Mantine theme override
 */
export const extendTheme = (overrides: MantineThemeOverride, base: MantineThemeOverride = common): MantineThemeOverride => {
  const theme = _.merge({}, base, overrides);
  // check if 'primary' color is overridden. if so replace 'primaryColor'
  // for consistency. 'other.colors.primary' color takes priority over
  // theme.primaryColor
  if (overrides.primaryColor) {
    theme.primaryColor = overrides.primaryColor;
  }
  if (hasColor(overrides, 'primary')) {
    theme.primaryColor = overrides.other?.colors.primary;
  }
  return theme;
};

export const isDarkTheme = (theme: MantineTheme): boolean => theme.colorScheme === 'dark';

/**
 * Extract a color from the theme, either just the name or the actual color value
 * depending if `value` has been passed or not
 * @param theme Mantine theme
 * @param color Color to pick, either a default one or a custom one specified in
 *        `config/core/theme/base.theme` overrides (`theme.other.colors`),
 *         i.e., `secondary`, `info`, ...
 * @param value `[0...9]` Optional value to use for the color, if not specified, the
 *       actual color name will be returned (for custom colors).
 */
export function getColor<K extends ThemeColor>(theme: MantineTheme, color: K): CustomColor;
export function getColor<K extends ThemeColor>(theme: MantineTheme, color: K, value: ColorIndex): string;
export function getColor<K extends ThemeColor>(theme: MantineTheme, color: K, value?: ColorIndex): CustomColor | string {
  let _color: string = color;
  if (_color === 'white') {
    return theme.white; // white has no gradient and is stored in the root
  }
  if (color in theme.other.colors) {
    _color = theme.other.colors[color as OtherColor];
  }
  if (value) return theme.colors[_color][value];
  return _color;
}
