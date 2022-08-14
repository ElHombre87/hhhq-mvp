import { useCallback, useEffect } from "react";
import { useInterpret, useSelector } from "@xstate/react";
import { createUseContext } from "utils";
import { machine, selectors, functions } from "../state";
import type { TChoices, TGrid, TGridHints, TSelection } from "../types";
import { InterpreterFrom } from "xstate";

export interface PicrossContext {
  sizes: {rows: number, cols: number},
  // grid: TGridData;
  grid: TGrid;
  // choices: TChoices;
  choices: TChoices;
  solved: boolean;
  seed: string;
  hints: TGridHints;
  handleClick: (row: number, col: number, state: TSelection) => void;
  createNew: (rows?: number, cols?: number, seed?:string) => void;
  changeSize: (rows: number, cols: number) => void;
  solve: () => void;
  service: InterpreterFrom<typeof machine>
}

const [PicrossContextProvider, usePicrossContext] = createUseContext({} as PicrossContext);

const PicrossProvider: React.FC = ({ children }) => {
  const service = useInterpret(machine, { devTools: true });

  // Hacky way to get the circumvent Random seed on server
  useEffect(() => {
    service.send('START');
  }, []);

  const sizes = useSelector(service, selectors.size);
  const grid = useSelector(service, selectors.grid);
  const choices = useSelector(service, selectors.choices);
  const solved = useSelector(service, selectors.solved);
  const seed = useSelector(service, selectors.seed);
  const hints = useSelector(service, selectors.hints);
  const state = useSelector(service, state => state.value);

  const handleClick = useCallback((row: number, col: number, state: TSelection) => {
    service.send('CELL_CLICKED', { row, col, value: state });
  },[service.send]);

  const createNew = useCallback((rows?: number, cols?: number, _seed?:string) => {
    const newSeed = _seed || Date.now().toString();
    service.send('NEW_GAME', { rows, cols, seed: newSeed });
  }, [service.send]);

  const changeSize = useCallback((rows: number, columns: number) => {
    service.send('CHANGE_SIZE', { rows, columns });
  }, [service.send]);

  const solve = useCallback(() => service.send('SOLVE'), [service.send]);

  const ctx: PicrossContext = {
    service,
    seed,
    grid,
    hints,
    choices,
    solved,
    sizes: { rows: sizes.rows, cols: sizes.columns },
    // functions
    solve,
    handleClick,
    changeSize,
    createNew,
  };


  return <PicrossContextProvider value={ctx}>{children}</PicrossContextProvider>
}

export {
  usePicrossContext,
  PicrossProvider,
};
