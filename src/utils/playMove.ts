import { Connect4Board, Connect4Cell, Connect4Move } from "@/model/connect4state";
import { setCellAtUnsafe } from "./cellAt";
import fallingRow from "./fallingRow";

export default function playMove(board: Connect4Board, column: number, newCellValue: Connect4Cell): number {
  const row = fallingRow(board, column);
  setCellAtUnsafe(board, column, row, newCellValue);
  return row;
}
