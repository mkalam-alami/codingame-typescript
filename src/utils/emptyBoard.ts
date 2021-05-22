import { COLUMNS, Connect4Board, ROWS } from "@/model/connect4state";

export default function emptyBoard(): Connect4Board {
  let board: Connect4Board = new Array(ROWS * COLUMNS);
  board.fill(0);
  return board;
}