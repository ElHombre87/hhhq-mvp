/**
 * Module contains the application's color palette to be used in the theme(s)
 * Refer to https://mantine.dev/theming/extend-theme/#extend-or-replace-colors
 * on how to generate palettes
 */

import type { Tuple } from '@mantine/core';

// Mantine colors shape. {[name]: [shades,...]} going from lighter to darker
export type Color = Tuple<string, 10>;
export type Colors = Record<string, Color>;

export const primaryGreen: Color = [
  '#dcffef', '#afffd7', '#7effbd', '#4dffa4', '#21ff8a',
  '#0ee671', '#00b357', '#00803d', '#004d23','#001c07',
];
export const primaryOrange: Color = [
  '#fff2de', '#fddcb3', '#f9c586', '#f5ae56', '#f29728',
  '#d97d10', '#a9610a', '#784505', '#492900', '#1d0d00',
];
