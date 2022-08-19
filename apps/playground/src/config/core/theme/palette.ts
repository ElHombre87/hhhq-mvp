/**
 * Module contains the application's color palette to be used in the theme(s)
 * Refer to https://mantine.dev/theming/extend-theme/#extend-or-replace-colors
 * on how to generate palettes
 */

import type { Tuple } from '@mantine/styles';

// Mantine colors shape. {[name]: [shades,...]} going from lighter to darker
export type Color = Tuple<string, 10>;
export type Colors = Record<string, Color>;
