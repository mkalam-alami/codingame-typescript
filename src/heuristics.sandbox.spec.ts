import { stateHeuristic } from "./heuristics";
import Connect4State from "./model/connect4state";
import testBoard from "./test/testBoard";
import printBoard from "./utils/printBoard";

xdescribe('heuristics: sandbox', () => {

  it('test', () => {
    const board7 = testBoard([4, 4, 5, 3, 7]);
    const board5 = testBoard([4, 4, 5, 3, 5]);

    printBoard(board5);
    console.log(5 + '>', stateHeuristic(new Connect4State(0, true, board5), true));

    printBoard(board7);
    console.log(7 + '>', stateHeuristic(new Connect4State(0, true, board7), true));
  });

});
