import { Connect4Board, ROWS } from "@/model/connect4state";
import { getCellAt } from "./cellAt";
import { IS_SET_MASK } from "./cellData";

/**
 * @returns -1 if the column is full
 */
export default function fallingRow(board: Connect4Board, column: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!(getCellAt(board, column, row) & IS_SET_MASK)) return row;
  }
  return -1;
}
