import { getCellAtUnsafe } from "./utils/cellAt";
import emptyBoard from "./utils/emptyBoard";
import playMove from "./utils/playMove";
import printBoard from "./utils/printBoard";

describe('board analyzer', () => {

  it('should detect neighbor', () => {
    const board = emptyBoard();
    playMove(board, 4, 0);

    expect(getCellAtUnsafe(board, 3, 6)).toBe(0b00_0100_0000_0000_0000);
    expect(getCellAtUnsafe(board, 4, 5)).toBe(0b00_0000_0100_0000_0000);
    expect(getCellAtUnsafe(board, 5, 6)).toBe(0b00_0100_0000_0000_0000);
  });

  it('should detect chains', () => {
    const board = emptyBoard();
    playMove(board, 4, 0);
    playMove(board, 4, 0);
    playMove(board, 4, 0);
    playMove(board, 4, 0);

    expect(getCellAtUnsafe(board, 4, 2)).toBe(0b00_0000_1100_0000_0000);
    for (let row = 3; row < 7; row++) {
      expect(getCellAtUnsafe(board, 4, row)).toBe(0b01_0000_1100_0000_0000);
    }
  });

});
