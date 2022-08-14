export type TGridData = boolean[][];
export type TSelection = boolean|null;
export type TPosition = {
  row: number;
  col: number;
};

// 1D Array types for functions
// TODO: refactor and use the other type names
export type TGrid = boolean[];
export type TChoices<T extends TSelection = TSelection> = T[]
export type THints = number[][];
export type TGridHints = {
  rows: THints;
  columns: THints;
}
