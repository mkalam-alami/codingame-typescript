import testBestMove from "./test/testBestMove";
import testBoard from "./test/testBoard";

describe('heuristics: defense level 2', () => {

  it('should avoid an eventual loss', () => {
    // .........
    // .........
    // ..1......
    // ..0.1101.
    // ..100100.
    // 0.110010.
    // 01100110.
    const board = testBoard([
      4, 5, 3, 3, 4, 2, 5, 5,
      0, 6, 0, 1, 4, 4, 7, 6,
      7, 2, 3, 2, 2, 2, 7, 7,
      6, 5, 6
    ]);

    for (let i = 0; i < 10; i++) {
      const column = testBestMove(board);
      expect(column).not.toBe(8);
    }
  });

});
