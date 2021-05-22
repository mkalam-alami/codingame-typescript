import { Minimax } from "./minimax/minimax";
import { StateHeuristic } from "./minimax/state";
import Connect4State, { COLUMNS, Connect4Board, Connect4Move } from "./model/connect4state";
import { getCellAtUnsafe } from "./utils/cellAt";
import { highestP1Length, highestP2Length } from "./utils/cellData";
import fallingRow from "./utils/fallingRow";

export const stateHeuristic: StateHeuristic<Connect4Board, Connect4Move> = (state: Connect4State): number => {
  const board = state.get();
  let heuristic = 0;

    for (let column = 0; column < COLUMNS; column++) {
      const row = fallingRow(board, column);
      const cellData = getCellAtUnsafe(board, column, row);
      heuristic += Math.pow(highestP1Length(cellData) + highestP2Length(cellData), 2);
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
