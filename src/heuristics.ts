import { Minimax } from "./minimax/minimax";
import Connect4State, { COLUMNS, Connect4Board, Connect4Move } from "./model/connect4state";
import { getCellAtUnsafe } from "./utils/cellAt";
import { IS_SET_MASK, p0ChainLengths, p1ChainLengths, PLAYER_0, PLAYER_MASK } from "./utils/cellData";
import fallingRow from "./utils/fallingRow";

// TODO Use move heuristic to sort them?
export const moveHeuristic = (move: Connect4Move, state: Connect4State): number => {
  const board = state.get();
  const row = fallingRow(board, move.column);
  const cellData = getCellAtUnsafe(board, move.column, row);
  return Math.pow(2, Math.max(...p0ChainLengths(cellData), ...p1ChainLengths(cellData)));
}

export const stateHeuristic = (state: Connect4State, verbose = false): number => {
  const board = state.get();
  let heuristic = 0;
  let verboseOutput = '';
  let playerSign = (state.ourPlayerIndex === 0) ? 1 : -1;

  for (let column = 0; column < COLUMNS; column++) {
    // Choose rows to visit for that column
    let fRow = fallingRow(board, column);
    let visitRows = [fRow - 1, fRow, fRow + 1, fRow + 2].filter(r => r >= 0 && r <= 6);

    for (const row of visitRows) {
      const cellData = getCellAtUnsafe(board, column, row);
      let cellHeuristic = 0;

      if (cellData & IS_SET_MASK) {
        // Filled cell
        if ((cellData & PLAYER_MASK) === PLAYER_0) {
          const lengths = p0ChainLengths(cellData);
          if (Math.max(...lengths) === 3) return Number.MAX_VALUE * playerSign;
          cellHeuristic = lengths.reduce((a,b) => (a+1)*(b+1)) * playerSign;
        } else {
          const lengths = p1ChainLengths(cellData);
          if (Math.max(...lengths) === 3) return Number.MAX_VALUE * -playerSign;
          cellHeuristic = lengths.reduce((a,b) => (a+1)*(b+1)) * -playerSign;
        }

      } else {
        // Possible move
        cellHeuristic = (p0ChainLengths(cellData).reduce((a,b) => (a||1)*(b||1)) - p1ChainLengths(cellData).reduce((a,b) => (a||1)*(b||1)))
          * ((state.ourPlayerIndex === 0) ? 1 : -1);
      }

      if (verbose) verboseOutput += `r${row}c${column}: ${cellHeuristic}, `;
      heuristic += cellHeuristic;
    }

  }

  if (verbose) console.debug(verboseOutput);

  return heuristic;
}

export const connect4minimax = new Minimax<Connect4Board, Connect4Move>({
  // maxIterations: 1000,
  //printClock: true,
  maxDepth: 4,
  strategy: 'depth-first',
  timeoutInMs: 85,
  // printFinalBranch: true,
  //exportFinalGraph: true,
  printIterationCount: true,
  // printFinalGraph: 2
});

export default connect4minimax;
