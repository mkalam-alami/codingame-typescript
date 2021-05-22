import { Minimax } from "./minimax/minimax";
import { StateHeuristic } from "./minimax/state";
import Connect4State, { COLUMNS, Connect4Board, Connect4Move, Coords, EMPTY, ROWS } from "./model/connect4state";
import { getCellAtUnsafe } from "./utils/cellAt";
import chainLength from "./utils/chainLength";
import { Offset } from "./utils/neighborOffsets";

const FULL_PASS_NEIGHBOR_OFFSETS: Offset[] = [
  { dx: 0, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 1, dy: 1 }
];

// TODO Only compute heuristic at empty cells?
// TODO (Optimize) Holding heuristic at coords locally per cell (fraction?) to avoid full pass
export const stateHeuristic: StateHeuristic<Connect4Board, Connect4Move> = (state: Connect4State): number => {
  let heuristic = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const partialHeuristic = heuristicAtCoords(state.get(), state.ourPlayerIndex, { column, row }, FULL_PASS_NEIGHBOR_OFFSETS);
      if (partialHeuristic === Number.MAX_VALUE || partialHeuristic === -Number.MAX_VALUE) return partialHeuristic;
      heuristic += partialHeuristic;
    }
  }

  return heuristic;
}

function heuristicAtCoords(board: Connect4Board, ourPlayerIndex: number, coords: Coords, checkOffsets: Offset[]): number {
  const value = getCellAtUnsafe(board, coords.column, coords.row);
  let heuristic = 0;
  if (value !== EMPTY) {
    for (let offset of checkOffsets) {
      const length = chainLength(coords, offset, board);
      if (length >= 4) {
        return (value === ourPlayerIndex ? 1 : -1) * Number.MAX_VALUE;
      }
      heuristic += Math.pow(2, length) * ((value === ourPlayerIndex) ? 1 : -1);
    }
  }
  return heuristic;
}

export const connect4minimax = new Minimax<Connect4Board, Connect4Move>({
  maxDepth: 3,
  // maxIterations: 1000,
  //printClock: true,
  timeoutInMs: 90,
  exportFinalGraph: true,
  printIterationCount: true
});

export default connect4minimax;
