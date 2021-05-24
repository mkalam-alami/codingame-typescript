import connect4minimax from "@/heuristics";
import Connect4State, { Connect4Board } from "@/model/connect4state";

export default function testBestMove(board: Connect4Board, playerIndex = 0): number {
  const state = new Connect4State(playerIndex, true, board);
  return connect4minimax.searchBestMove(state).column;
}
