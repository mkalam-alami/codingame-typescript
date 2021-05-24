import { Connect4Board } from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMoves from "@/utils/playMoves";

export default function testBoard(moves: number[]): Connect4Board {
  const board = emptyBoard();
  playMoves(board, moves);
  return board;
}
