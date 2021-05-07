import { stubTree } from "../src/io/input-stubs";
import { generateGameState } from "./generators/gamestate";
import { generateMapInput, RICHNESS_1_START, RICHNESS_2_START, RICHNESS_3_START } from "./generators/map";
import { runBot } from "./runner";

describe('Bot', () => {

  // Enlever le "x" de "xit" pour activer le test
  xit('should prefer completing moves with higher richness', () => {
    const input = [
      ...generateMapInput(),
      ...generateGameState({
          trees: [
            stubTree({ cellId: RICHNESS_3_START, size: 3 }),
            stubTree({ cellId: RICHNESS_2_START, size: 3 }),
            stubTree({ cellId: RICHNESS_1_START, size: 3 })
          ]
        },
        { possibleMovesIgnore: ['SEED'] })
    ];

    const output = runBot(input);

    expect(output).toEqual([`COMPLETE ${RICHNESS_3_START}`]);
  });

});
