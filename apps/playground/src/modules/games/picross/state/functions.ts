import type { TChoices, TGrid, THints, TSelection } from '../types';
import seedrandom from 'seedrandom'
/**
 * Generate a random new grid using the provided seed as the random seed.
 * @param rows number of rows in the grid
 * @param columns number of columns in the grid
 * @returns 
 */
export function generate(rows: number, columns: number, seed: string): boolean[] {
  const rng = seedrandom(seed);
  return Array(rows*columns).fill(undefined).map(() => rng() > .5 ? true : false);
}
/** gets a list of `null` values matching the grid size (rows*cols) */
export function choices(rows: number, cols: number): TChoices<null> {
  return Array(rows*cols).fill(null);
}
/**
 * Get the value at the given position
 * @param grid the grid to get the value from
 * @param row the row to get the value from
 * @param col the column to get the value from
 * @param columns column count for each row. required for row-based grids
 */
export function get(row: number, col: number, data: TGrid|TChoices, columns: number = 5): TSelection {
  return data[(row * columns) + col];
}

/**
 * Given a 1D array of picross values return the hints for the picross puzzle.
 * @param data 1d array of boolean values
 * @param columns whether return hints for columns (true) or rows (false)
 * @returns 2D array of hints (truthy values)
 */
export function hints(data: TGrid, rows: number, cols: number, columns = false): THints {
  // swap rows and columns around if processing columns
  const [p, s] = columns ? [cols, rows] : [rows, cols];
  const hints = Array(p);

  for (let i = 0; i < p; i++) {
    hints[i] = [];
    let streak = 0;
    for (let j = 0; j < s; j++) {
      // get function args have an order, so swap them if processing columns
      const value = columns ? get(j, i, data) : get(i, j, data);
      if (value) {
        streak++;
        // add last item/set to the array if we're at the last item
        if (j >= s - 1 && streak > 0) {
          hints[i].push(streak);
          streak = 0;
        }
      } else if (streak > 0) {
        hints[i].push(streak);
        streak = 0;
      }
    }
  }
  return hints;  
}

export function updateValue(data: TChoices, row: number, col: number, columns: number, value: TSelection) {
  const _data = [...data];
  _data[(row*columns) + col] = value;
  return _data;
}
