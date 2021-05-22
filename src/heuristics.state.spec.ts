import { stateHeuristic } from "./heuristics";
import Connect4State from "./model/connect4state";
import emptyBoard from "./utils/emptyBoard";
import playMove from "./utils/playMove";

describe('heuristics: state evaluation', () => {

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

  fit('should give zero value to identical chains', () => {
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

  it('should give greater value to longer chain', () => {
    const board = emptyBoard();
    playMove(board, 3, 0);
    playMove(board, 3, 0);
    playMove(board, 4, 1);

    const state = new Connect4State(0, true, board);
    const heuristic = stateHeuristic(state);
    expect(heuristic).toBeGreaterThan(0);
  });

});
