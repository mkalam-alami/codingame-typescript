import testBestMove from "./test/testBestMove";
import testBoard from "./test/testBoard";


describe('heuristics: attacks', () => {

  it('should not make easily blocked attacks', () => {
    const board = testBoard([ 4, 4, 5, 3 ]);
    const column = testBestMove(board);
    expect(column).not.toBe(6);
    expect(column).not.toBe(7);
  });

});
