import { MouseEvent, useMemo, useState } from 'react';
import { UnstyledButton } from '@mantine/core';
import { X } from 'tabler-icons-react';
import { getColor } from 'utils';
import { useCellStyles } from './Grid.picross.styles';
import type { TPosition, TSelection } from '../types';

export interface GridCell {
  size:number;
  position: TPosition;
  value?: boolean;
  selected: TSelection;
  /** Callback that takes the coordinates of the cell to toggle it */
  onClick?: (row: number, col: number, status: boolean|null) => void;
  solved?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GridCell: React.FC<GridCell> = ({ size, position, selected, value, onClick, solved }) => {
  const { row, col } = position;
  const { theme, classes, cx } = useCellStyles({ size });
  
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // we don't want to toggle if the cell is game is ended
    // if (solved) return;

    // pick the status to send to the callback
    const wantedStatus = e.button === 0 ? true : false;
    const actualStatus = selected === wantedStatus ? null : wantedStatus;

    if (onClick) onClick(row, col, actualStatus);
  };

  const correct = useMemo(() => {
    // either match or it's a `falsy` cell and player didn't select it
    return value === selected || (value === false && selected === null)
  }, [value, selected]);

  return (
    <UnstyledButton
      data-row={position.row}
      data-col={position.col}
      onContextMenu={handleClick}
      onClick={handleClick}
      className={cx('picross-cell', classes.cell, {
        [classes.selected]: selected === true,
        [classes.blocked]: selected === false,
        // results color depend on the game status (solved) if the matching
        // is correct and on the player's selection. If the player selected
        // the wrong cell (either true or false), the cell will be red.
        // all errors are shown with the X icon regardless (including missing values)
        [classes.correct]: solved && correct && selected,
        [classes.wrong]: solved && !correct && selected !== null,
      })}
    >
      { (solved && !correct) && <X color={getColor(theme, 'red', 9)} size={20} /> }
    </UnstyledButton>
  );
};
