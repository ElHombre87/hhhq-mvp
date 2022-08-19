import { useMemo } from "react";
import { useSelector } from "@xstate/react";

import { usePicrossContext } from "../contexts";
import { PicrossGrid, Hints, GameWrapper, PicrossProgress } from '../components';

/**
 * 
 * Picross Game board with hints and grid, hooked to `PicrossContext`
 */
export const PicrossGame = () => {
  const { sizes, grid, hints, choices, handleClick, solve, solved, service } = usePicrossContext();
  const progress = useSelector(service, state => state.context.progress || 0);
  const cellSize = useMemo(() => {
    const cells = sizes.cols*sizes.rows;
    return cells >= 100 ? 55 : cells >= 50 ? 72 : 110;
  },[sizes])
  /**
   * The layout is handled by the wrappers through css grid.
   * `container` ensures that the grid is centered and properly sized.
   * `gridWrapper` handles the CSS grid layout for the grid and hints.
   */
  return (
    <>
    {/* <Container size="xs" my="xl">
      <Progress size="xl" value={progress} label={`${progress.toFixed(2)}%`} />
      <RingProgress sections={[{value: progress, color: 'green'}]} label={`${progress.toFixed(2)}%`} />
    </Container> */}
    <GameWrapper size={sizes}>
      <Hints hints={hints.columns} />
      <Hints hints={hints.rows} horizontal />
      <PicrossProgress progress={progress} onClick={solve} />
      <PicrossGrid
        grid={grid}
        solved={solved}
        choices={choices}
        onClick={handleClick}
        columns={sizes.cols}
        cellSize={cellSize}
      />
    </GameWrapper>
    </>
  );
};
