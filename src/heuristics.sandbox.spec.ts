import { analyzeBoard } from "./boardAnalyzer";
import connect4minimax, { stateHeuristic } from "./heuristics";
import Connect4State from "./model/connect4state";
import { setCellAt } from "./utils/cellAt";
import { PLAYER_0, PLAYER_1 } from "./utils/cellData";
import emptyBoard from "./utils/emptyBoard";

xdescribe('heuristics: sandbox', () => {

  it('test', () => {
    const board = emptyBoard();
    setCellAt(board, 4, 5, PLAYER_1);
    setCellAt(board, 4, 6, PLAYER_0);
    analyzeBoard(board);

    const state = new Connect4State(0, true, board);
    const move = connect4minimax.searchBestMove(state);
    console.log('Result: ' + move.column);
  });
  
});
