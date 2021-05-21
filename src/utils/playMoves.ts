import { Connect4Board, Connect4Cell } from "@/model/connect4state";
import playMove from "./playMove";

export default function playMoves(board: Connect4Board, columns: number[]): void {
  let value: Connect4Cell = 0;
  for (const column of columns) {
    playMove(board, column, value);
    value = value === 0 ? 1 : 0;
  }
}
