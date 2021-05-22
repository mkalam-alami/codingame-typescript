import { COLUMNS, Connect4Board, ROWS } from "./model/connect4state";
import { getCellAt, getCellAtUnsafe, setCellAt } from "./utils/cellAt";
import { PLAYER_0, PLAYER_MASK, withLength } from "./utils/cellData";
import NEIGHBOR_DIRS from "./utils/neighborDir";

export function analyzeBoard(board: Connect4Board) {
  for (let column = 0; column < COLUMNS; column++) {
    for (let row = 0; row < ROWS; row++) {
      analyzeCell(board, column, row);
    }
  }
}

export function analyzeBoardAroundCell(board: Connect4Board, column: number, row: number) {
  analyzeCell(board, column, row);
  for (let direction of NEIGHBOR_DIRS) {
    analyzeCell(board, column + direction.dx, row +  + direction.dy);
  }
}

export function analyzeCell(board: Connect4Board, column: number, row: number) {
  let newValue = getCellAtUnsafe(board, column, row) & PLAYER_MASK;

  let axisIndex = 0;
  let axisLengthP0 = 0, axisLengthP1 = 0;
  for (let direction of NEIGHBOR_DIRS) {
    axisIndex += 0.5;

    let directionValue = getCellAt(board, column + direction.dx, row + direction.dy) & PLAYER_MASK;
    if (directionValue !== 0) {

      let directionLength = 1;
      for (let distance = 2; distance <= 3; distance++) {
        if ((getCellAt(board, column + direction.dx * distance, row + direction.dy * distance) & PLAYER_MASK) === directionValue) {
          directionLength++
        } else {
          break;
        }
      }

      if (directionValue === PLAYER_0) axisLengthP0 += directionLength;
      else axisLengthP1 += directionLength;
    }

    if (axisIndex % .5 === 0) {
      newValue = withLength(newValue, axisLengthP0, axisIndex, 0);
      newValue = withLength(newValue, axisLengthP1, axisIndex, 1);
    }
  }

  setCellAt(board, column, row, newValue);
}
