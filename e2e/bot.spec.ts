import connect4minimax, { stateHeuristic } from "@/heuristics";
import Connect4State from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMove from "@/utils/playMove";
import printBoard from "@/utils/printBoard";

describe('Bot', () => {

  it('should support playing a game without crashing', () => {
    const board = emptyBoard();

    for (let turn = 0; turn < 50; turn++) {
      const p0state = new Connect4State(0, true, board);
      const p0move = connect4minimax.searchBestMove(p0state);
      playMove(board, p0move.column, 0);
      if (stateHeuristic(p0state) === Number.MAX_VALUE) break;

      const p1state = new Connect4State(1, true, board);
      const p1move = connect4minimax.searchBestMove(p0state);
      playMove(board, p1move.column, 1);
      if (stateHeuristic(p1state) === Number.MAX_VALUE) break;
    }

    // printBoard(board);
  });

});
