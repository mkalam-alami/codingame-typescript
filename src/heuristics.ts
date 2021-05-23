import { Minimax } from "./minimax/minimax";
import { StateHeuristic } from "./minimax/state";
import Connect4State, { COLUMNS, Connect4Board, Connect4Move } from "./model/connect4state";
import { getCellAtUnsafe } from "./utils/cellAt";
import { highestP1Length, highestP2Length, IS_SET_MASK, PLAYER_0, PLAYER_MASK } from "./utils/cellData";
import fallingRow from "./utils/fallingRow";

// TODO Use move heuristic to sort them
export const moveHeuristic = (move: Connect4Move, state: Connect4State): number => {
  const board = state.get();
  const row = fallingRow(board, move.column);
  const cellData = getCellAtUnsafe(board, move.column, row);
  return Math.pow(2, highestP1Length(cellData) + highestP2Length(cellData));
}

export const stateHeuristic: StateHeuristic<Connect4Board, Connect4Move> = (state: Connect4State): number => {
  const board = state.get();
  let heuristic = 0;

  for (let column = 0; column < COLUMNS; column++) {
    let fRow = fallingRow(board, column);
    let visitRows: number[];
    if (fRow === -1) visitRows = [fRow + 1];
    else {
      visitRows = [fRow];
      if (fRow < 7) visitRows.push(fRow + 1);
    }

    for (const row of visitRows) {
      const cellData = getCellAtUnsafe(board, column, row);

      if (cellData & IS_SET_MASK) {
        // Filled cell
        if ((cellData & PLAYER_MASK) === PLAYER_0) {
          const highestLength = highestP1Length(cellData);
          if (highestLength === 3) return Number.MAX_VALUE * ((state.ourPlayerIndex === 0) ? 1 : -1);
        } else {
          const highestLength = highestP2Length(cellData);
          if (highestLength === 3) return Number.MAX_VALUE * ((state.ourPlayerIndex === 1) ? 1 : -1);
        }

      } else {
        // Possible move
        heuristic += Math.pow(2, highestP1Length(cellData)) - Math.pow(2, highestP2Length(cellData))
          * ((state.ourPlayerIndex === 0) ? 1 : -1);
      }
    }

  }

  return heuristic;
}

export const connect4minimax = new Minimax<Connect4Board, Connect4Move>({
  maxDepth: 4,
  // maxIterations: 1000,
  //printClock: true,
  timeoutInMs: 90,
  //exportFinalGraph: true,
  //printIterationCount: true
});

export default connect4minimax;
