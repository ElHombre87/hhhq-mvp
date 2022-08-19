import { ColorIndex, createStyles, ThemeColor } from '@mantine/core';
import { CSSProperties } from 'react';
import { getColor } from 'utils';
import { isDarkTheme } from 'utils/theme.utils';

interface GridStyleProps { size:number, cols: number, rows:number }

const GAP = 1;

export const useGridStyles = createStyles((theme, props: GridStyleProps) => ({
  container: {
    // margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridWrapper: {
    // position: 'relative',
    // width: '100%',
    // height: '100%',
    display: 'grid',
    gridTemplateColumns: `auto ${props.cols}fr`,
    gridTemplateRows: `auto ${props.rows}fr`,
    gridGap: theme.spacing.xs,
    gridTemplateAreas: `
      "progress hints-cols"
      "hints-rows cells"`,
  },
  picrossGrid: {
    gridArea: 'cells',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
    gap: GAP,
  },
}));

export const useCellStyles = createStyles((theme, props: { size:number }, getRef) => {
  const border = (color: ThemeColor, intensity: ColorIndex = 6): CSSProperties => ({
    border: `1px solid ${theme.fn.rgba(getColor(theme, color, intensity), 0.75)}`
  });
  const shadow = (intensity: ColorIndex = 9, opacity = 0.875): CSSProperties => ({
    boxShadow: `inset 0px 0px 19px 0px ${theme.fn.rgba(getColor(theme, 'dark', intensity), opacity)}`,
  });

  const hover = (color: ThemeColor, intensity: ColorIndex = 6, _shadow: ColorIndex = 9, opacity = 0.975) => ({
    backgroundColor: getColor(theme, color, intensity),
    ...shadow(_shadow, opacity),
    ...border(color, 4),
  });

  return {
    cell: {
      width: props.size,
      height: props.size,
      borderRadius: theme.radius.xs,
      transition: 'background 0.1s ease-in-out, box-shadow 0.1s ease-in-out, border 0.1s ease-in-out',
      backgroundColor: getColor(theme, 'gray', isDarkTheme(theme) ? 6 : 2),
      ...shadow(1, 0.15),
      ...border('gray', 5),
      cursor: 'pointer',
      // debugging and development
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      '&:hover': {
        ...hover('yellow', 1, 5, 0.75),
        color: getColor(theme, 'gray', 2)
      },
    },
    // identifies cells that the player has selected to be filled
    selected: {
      ...shadow(),
      ...border('primary'),
      backgroundColor: getColor(theme, 'primary', 3),
      '&:hover': hover('primary', 5),
    },
    // identifies cells that the player has selected to be empty
    blocked: {
      ...shadow(7, 0.35),
      ...border('gray', 5),
      backgroundColor: getColor(theme, 'gray', isDarkTheme(theme) ? 7 : 5),
      '&:hover': hover('gray', 5, 7, 0.75),
    },
    // identifies cells that are selected and valid
    correct: {
      ...shadow(),
      ...border('green'),
      backgroundColor: getColor(theme, 'success', 5),
      '&:hover': hover('green', 6),
    },
    // identifies cells that are selected wrong
    wrong: {
      ...shadow(9, 0.75),
      ...border('red'),
      backgroundColor: getColor(theme, 'error', 4),
      '&:hover': hover('red', 5),
    },
  };
});

export const useHintsStyles = createStyles((theme, props: {horizontal: boolean}) => {
  const borderColor = getColor(theme, isDarkTheme(theme) ? 'gray' : 'dark', 3);

  return {
    wrapper: {
      display: 'grid',
      gap: GAP,
      gridAutoFlow: props.horizontal ? 'row':'column',
      width: '100%',
      '&.rows': {
        gridArea: 'hints-rows',
        gridAutoFlow: 'row',
      },
      '&.cols': {
        gridArea: 'hints-cols',
        gridAutoFlow: 'column',
      },
    },
    section: {
      display: 'flex',
      flexDirection: props.horizontal ? 'row': 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '&.rows': {
        flexDirection: 'row',
        '&:not(:last-of-type)': {
          borderBottom: `0.5px dotted ${theme.fn.rgba(borderColor, 0.5)}`,
        },
        '> .item': {
          padding: `0 ${theme.spacing.xs/2}px`,
        }
      },
      '&.cols': {
        flexDirection: 'column',
        '&:not(:last-of-type)': {
          borderRight: `0.5px dotted ${theme.fn.rgba(borderColor, 0.5)}`,
        },
      },
    },
  };
});
