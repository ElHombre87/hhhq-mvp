import { Box } from '@mantine/core';
import { useGridStyles } from './Grid.picross.styles';
export interface GameWrapper {
  size: { rows: number; cols: number }
}

/**
 * 
 * Picross Game Game board wrapper to properly group elements
 */
export const GameWrapper: React.FC<GameWrapper> = ({ children, size }) => {
  const { rows, cols } = size;
  const { classes } = useGridStyles({ size: 0, cols, rows });
  return (
    <Box className={classes.container} id="picross-container">
      <Box className={classes.gridWrapper} id="picross-grid-wrapper">
        {children}
      </Box>
    </Box>
  );
};
