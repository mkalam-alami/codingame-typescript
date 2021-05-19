import { Connect4Board, ROWS } from "@/model/state";
import { getCellAt } from "./cellAt";

/**
 * @returns -1 if the column is full
 */
export default function fallingRow(board: Connect4Board, column: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (getCellAt(board, column, 0) === -1) return row;
  }
  return -1;
}
