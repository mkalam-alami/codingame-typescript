import { moveHeuristic, stateHeuristic } from "./heuristics";
import { Minimax } from "./minimax/minimax";
import Connect4State from "./model/connect4state";
import emptyBoard from "./utils/emptyBoard";
import playMove from "./utils/playMove";

describe('heuristics', () => {

  describe('combined', () => {

    fit('should block a losing move from the opponent', () => {
      const board = emptyBoard();
      playMove(board, 3, 1);
      playMove(board, 3, 1);
      playMove(board, 3, 1);

      const state = new Connect4State(0, true, board);
      const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2 });
      const bestMove = minimax.searchBestMove(state, { printGraph: true });

      expect(bestMove.column).toBe(3);
    });

  });

  describe('state heuristic', () => {

    it('should give max value to a winning state', () => {
      const board = emptyBoard();
      playMove(board, 3, 0);
      playMove(board, 4, 0);
      playMove(board, 5, 0);
      playMove(board, 6, 0);

      const state = new Connect4State(0, true, board);
      const heuristic = stateHeuristic(state);
      expect(heuristic).toBe(Number.MAX_VALUE);
    });

    it('should give min value to a losing state', () => {
      const board = emptyBoard();
      playMove(board, 3, 1);
      playMove(board, 4, 1);
      playMove(board, 5, 1);
      playMove(board, 6, 1);

      const state = new Connect4State(0, true, board);
      const heuristic = stateHeuristic(state);
      expect(heuristic).toBe(-Number.MAX_VALUE);
    });

    it('should give zero value to empty board', () => {
      const board = emptyBoard();

      const state = new Connect4State(0, true, board);
      const heuristic = stateHeuristic(state);
      expect(heuristic).toBe(0);
    });

    it('should give zero value to identical chains', () => {
      const board = emptyBoard();
      playMove(board, 3, 0);
      playMove(board, 3, 0);
      playMove(board, 3, 0);
      playMove(board, 4, 1);
      playMove(board, 4, 1);
      playMove(board, 4, 1);

      const state = new Connect4State(0, true, board);
      const heuristic = stateHeuristic(state);
      expect(heuristic).toBe(0);
    });

    it('should give small value to longer but small chain', () => {
      const board = emptyBoard();
      playMove(board, 3, 0);
      playMove(board, 3, 0);
      playMove(board, 4, 1);

      const state = new Connect4State(0, true, board);
      const heuristic = stateHeuristic(state);
      expect(heuristic).toBeGreaterThan(0);
      expect(heuristic).toBeLessThan(10);
    });

  });

});
