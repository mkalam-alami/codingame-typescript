import emptyBoard from "@/utils/emptyBoard";
import playMoves from "@/utils/playMoves";
import { initInputs, turnInputs } from "./input";
import { runBot } from "./runner";

describe('Bot', () => {

  it('should parse inputs and play its turn', () => {
    const board = emptyBoard();
    playMoves(board, [4, 4]);

    const inputs = [
        ...initInputs(),
        ...turnInputs(board)
    ];

    const outputs = runBot(inputs);

    expect(outputs.length).toBe(1);
  });

});
