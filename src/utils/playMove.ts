import { analyzeBoardAroundCell } from "@/boardAnalyzer";
import { Connect4Board, Connect4Cell } from "@/model/connect4state";
import { setCellAtUnsafe } from "./cellAt";
import { PLAYER_0, PLAYER_1 } from "./cellData";
import fallingRow from "./fallingRow";

export default function playMove(board: Connect4Board, column: number, playerIndex: number): number {
  const row = fallingRow(board, column);
  setCellAtUnsafe(board, column, row, playerIndex ? PLAYER_1 : PLAYER_0);
  analyzeBoardAroundCell(board, column, row);
  return row;
}
