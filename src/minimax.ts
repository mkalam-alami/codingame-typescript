import Connect4State, { COLUMNS, Connect4Board, Connect4Move, EMPTY, ROWS } from "./model/state";
import { Minimax } from "./search/minimax";
import { MoveHeuristic } from "./search/move";
import { StateHeuristic } from "./search/state";
import { getCellAt, getCellAtUnsafe } from "./utils/cellAt";
import chainLength from "./utils/chainLength";
import fallingRow from "./utils/fallingRow";
import NEIGHBOR_OFFSETS, { Offset } from "./utils/neighborOffsets";

const FULL_PASS_NEIGHBOR_OFFSETS: Offset[] = [
  { dx: 0, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 1, dy: 1 }
];

export const moveHeuristic: MoveHeuristic<Connect4Board, Connect4Move> = (move: Connect4Move, state: Connect4State): number => {
  const board = state.get();
  const row = fallingRow(board, move.column);

  let heuristic = 0;
  for (const offset of NEIGHBOR_OFFSETS) {
    const cellValue = getCellAt(board, move.column + offset.dx, row + offset.dy);
    if (cellValue === state.ourPlayerIndex) {
      heuristic++;
    }
    if (cellValue === EMPTY) {
      heuristic += 0.5;
    }
  }

  return heuristic;
}

export const stateHeuristic: StateHeuristic<Connect4Board, Connect4Move> = (state: Connect4State): number => {
  const board = state.get();
  let heuristic = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const value = getCellAtUnsafe(board, column, row);
      if (value !== EMPTY) {
        for (let offset of FULL_PASS_NEIGHBOR_OFFSETS) {
          const length = chainLength({ column, row }, offset, board);
          heuristic += Math.pow(2, length) * ((value === state.ourPlayerIndex) ? 1 : -1);
        }
      }
    }
  }

  return heuristic;
}

export const connect4minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 10 });

export default connect4minimax;
