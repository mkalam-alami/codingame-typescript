import connect4minimax from "./heuristics";
import Connect4State from "./model/connect4state";
import testBestMove from "./test/testBestMove";
import testBoard from "./test/testBoard";
import emptyBoard from "./utils/emptyBoard";
import playMove from "./utils/playMove";
import playMoves from "./utils/playMoves";

describe('heuristics: defense level 1', () => {

  it('should avoid a losing move', () => {
    const board = emptyBoard();
    playMove(board, 3, 1);
    playMove(board, 3, 1);
    playMove(board, 3, 1);

    const state = new Connect4State(0, true, board);
    const bestMove = connect4minimax.searchBestMove(state);

    expect(bestMove.column).toBe(3);
  });

  it('should avoid a losing move #2', () => {
    // .........
    // .........
    // .........
    // .........
    // .........
    // ...1.11..
    // ...00100.
    const board = emptyBoard();
    playMoves(board, [3, 3, 4, 5, 6, 5, 7, 6]);

    const state = new Connect4State(0, true, board);

    for (let i = 0; i < 10; i++) {
      const bestMove = connect4minimax.searchBestMove(state);
      expect(bestMove.column).toBe(4);
    }
  });

  it('should avoid a losing move #3', () => {
    // .........
    // ...1.....
    // ...1.....
    // ...1.....
    // ...0.....
    // ...1.....
    // .0.0..00.
    const board = emptyBoard();
    playMoves(board, [3, 3, 3, 3, 1, 3, 7, 3, 6]);

    const state = new Connect4State(0, true, board);

    for (let i = 0; i < 10; i++) {
      const bestMove = connect4minimax.searchBestMove(state);
      expect(bestMove.column).toBe(3);
    }
  });

  it('should avoid a losing move #4', () => {
    // .........
    // ....0....
    // ....1....
    // ....0....
    // ....1....
    // .11.1....
    // 010.010.0
    const board = emptyBoard();
    playMoves(board, [8, 1, 6, 5, 4, 4, 0, 4, 4, 4, 4, 1, 2, 2]);

    const state = new Connect4State(0, true, board);

    for (let i = 0; i < 10; i++) {
      const bestMove = connect4minimax.searchBestMove(state);
      expect(bestMove.column).not.toBe(3);
    }
  });

  it('should avoid a losing move #5', () => {
    // .........
    // .........
    // .........
    // 1........
    // 1........
    // 1........
    // 0.0..0...
    const board = emptyBoard();
    playMoves(board, [0, 0, 5, 0, 2, 0]);

    const state = new Connect4State(0, true, board);

    for (let i = 0; i < 10; i++) {
      const bestMove = connect4minimax.searchBestMove(state);
      expect(bestMove.column).toBe(0);
    }
  });

  it('should avoid a losing move #6', () => {
    // ....0....
    // ....10...
    // ....11...
    // ....10...
    // ....01.1.
    // ....1010.
    // ....0100.
    const board = testBoard([
      4, 4, 4, 4, 7, 4, 7,
      4, 4, 5, 5, 5, 5, 5,
      5, 7, 6, 6
    ]);

    for (let i = 0; i < 10; i++) {
      const column = testBestMove(board);
      expect(column).not.toBe(6);
    }
  });

});
