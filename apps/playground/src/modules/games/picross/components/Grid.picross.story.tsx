import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PicrossGrid } from './Grid.picross';
import { GridCell } from './GridCell.picross';
import { Hints } from './GridHints.picross';
import { GameWrapper } from './GameWrapper';

import { TChoices, TGrid, TSelection } from '../types';
import * as functions from '../state/functions';
import seedrandom from 'seedrandom';

// Helpers ===================================================================

const WrappedGrid: React.FC<PicrossGrid & Omit<GameWrapper, 'children'>> = ({children, size, ...props}) => (
  <GameWrapper size={size}>
    <Hints hints={[]} />
    <Hints hints={[]} horizontal/>
    <PicrossGrid {...props} />
  </GameWrapper>
)

type GetSelection = () => TSelection

function getRandomGrid(rows: number, cols: number, seed = 'random seed'): TGrid {
  return functions.generate(rows, cols, seed);
}

function getChoices(rows: number, cols: number, value: (TSelection | GetSelection) = null): TChoices {
  return Array(rows*cols).fill(typeof value === 'function' ? value() : value);
}

function getRandomChoices(rows:number , cols: number, seed = 'random seed'): TChoices {
  const rng = seedrandom(seed);
  return getChoices(rows, cols, () => {
    const v = rng();
    return v > 0.5 ? null : v > 0.35 ? true : false;
  })
}
function getHints(grid: TGrid, rows:number, cols: number) {
  return {
    rows: functions.hints(grid, rows, cols),
    columns: functions.hints(grid, cols, rows, true),
  }
}
const DEMO = {
  fiveByFive:{
    grid: getRandomGrid(5, 5),
    choices: getRandomChoices(5, 5),
    },
  fiveByTen:{
    grid: getRandomGrid(5, 10),
    choices: getChoices(5, 10),
    },
  tenByTen:{
    grid: getRandomGrid(10, 10),
    choices: getChoices(10, 10),
    },

}

// Stories ===================================================================

export default {
  title: 'Games/Picross/Grid',
  component: PicrossGrid,
  parameters: {
    layout: 'centered',
  },
  subcomponents: { GridCell: GridCell, Hints: Hints },
} as ComponentMeta<typeof WrappedGrid>;


const Template: ComponentStory<typeof WrappedGrid> = (args) => (
  <WrappedGrid {...args} />
);

export const FiveByFive = Template.bind({});
FiveByFive.args = {
  grid: DEMO.fiveByFive.grid,
  choices: DEMO.fiveByFive.choices,
  size: {rows: 5, cols: 5}
};
export const FiveByFiveSolved = Template.bind({});
FiveByFiveSolved.args = {
  grid: DEMO.fiveByFive.grid,
  choices: DEMO.fiveByFive.choices,
  size: {rows: 5, cols: 5},
  solved: true,
};
export const FiveByTen = Template.bind({});
FiveByTen.args = {
  grid:  DEMO.fiveByTen.grid,
  choices: DEMO.fiveByTen.choices,
  size: {rows: 5, cols: 10}
};
export const TenByTen = Template.bind({});
TenByTen.args = {
  grid: DEMO.tenByTen.grid,
  choices: DEMO.tenByTen.choices,
  size: {rows: 5, cols: 10}
};
