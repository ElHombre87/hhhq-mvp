import React from 'react';
import { Box } from '@mantine/core';
import { useGridStyles } from './Grid.picross.styles';
import { GridCell } from './GridCell.picross';
import { TChoices, TGrid } from '../types';

export interface PicrossGrid {
  /** 2D matrix of boolean values indicating the cells' value */
  grid: TGrid;
  // grid: TGridData;
  /** 2D matrix matching `grid` size of `Selection`s from the player */
  choices: TChoices;
  /** size in pixels to render the cells (width & height) */
  cellSize?: number;
  /** number of columns in the grid. used for generating the grid */
  columns: number;
  /** whether the game has ended or not */
  solved?: boolean;
  /**
   * callback for the individual cells onClick event.
   * @param row: number - the row of the cell that was clicked
   * @param column: number - the column of the cell that was clicked
   * @param value: boolean|null - the value of the cell that was clicked
   *               `true`|`false` for a selection, `null` for empty/unselected
  */
  onClick?: (row: number, col: number, status: boolean|null) => void;
}
export const PicrossGrid: React.FC<PicrossGrid> = ({ grid, columns, solved, choices, onClick, cellSize = 64 }) => {

  // const rows = grid.length;
  // const cols = grid[0].length;
  const cols = columns;
  const rows = grid.length / cols;
  const { classes } = useGridStyles({ size: cellSize, cols, rows });
  
  return (
    <Box className={classes.picrossGrid} id="picross-grid">
      {grid.map((value, i) => {
        const [row, col] = [Math.floor(i / cols), i % cols]
        return (
        <GridCell
          key={i}
          size={cellSize}
          onClick={onClick}
          position={{ row, col }}
          selected={choices[(row * columns) + col]}
          value={value}
          solved={solved}
        />
      )})}
    </Box>
  );
};
