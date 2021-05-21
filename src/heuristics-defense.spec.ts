import { moveHeuristic, stateHeuristic } from "./heuristics";
import { Minimax } from "./minimax/minimax";
import Connect4State from "./model/connect4state";
import emptyBoard from "./utils/emptyBoard";
import playMove from "./utils/playMove";
import playMoves from "./utils/playMoves";
import printBoard from "./utils/printBoard";

describe('heuristics: defense', () => {

  it('should avoid a losing move', () => {
    const board = emptyBoard();
    playMove(board, 3, 1);
    playMove(board, 3, 1);
    playMove(board, 3, 1);

    const state = new Connect4State(0, true, board);
    const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2, printFinalGraph: true });
    const bestMove = minimax.searchBestMove(state);

    expect(bestMove.column).toBe(3);
  });

  it('should avoid a losing move #2', () => {
    const board = emptyBoard();
    playMove(board, 3, 0);
    playMove(board, 4, 0);
    playMove(board, 5, 1);
    playMove(board, 6, 0);
    playMove(board, 3, 1);
    playMove(board, 5, 1);
    playMove(board, 6, 1);

    const state = new Connect4State(0, true, board);
    const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2, printFinalGraph: true });
    const bestMove = minimax.searchBestMove(state);

    expect(bestMove.column).toBe(4);
  });

  it('should avoid a losing move #3', () => {
    const board = emptyBoard();
    playMoves(board, [3, 3, 3, 3, 1, 3, 7, 3, 6]);

    const state = new Connect4State(0, true, board);
    const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2, printFinalGraph: true });
    const bestMove = minimax.searchBestMove(state);

    expect(bestMove.column).toBe(4);
  });

  it('should avoid a losing move #4', () => {
    const board = emptyBoard();
    playMoves(board, [8,1,6,5,4,4,0,4,4,4,4,1,2,2]);

    const state = new Connect4State(0, true, board);
    const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2 });

    for (let i = 0; i < 10; i++) {
      const bestMove = minimax.searchBestMove(state);
      expect(bestMove.column).not.toBe(3);
    }
  });
});
