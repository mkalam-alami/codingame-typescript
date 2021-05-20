import { Connect4Board, Connect4Cell, Connect4Move } from "@/model/state";
import { setCellAtUnsafe } from "./cellAt";
import fallingRow from "./fallingRow";

export default function playMove(board: Connect4Board, column: number, newCellValue: Connect4Cell): void {
  const row = fallingRow(board, column);
  setCellAtUnsafe(board, column, row, newCellValue);
}
