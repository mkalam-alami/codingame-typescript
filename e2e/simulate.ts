import { moveHeuristic, stateHeuristic } from "@/minimax";
import Connect4State from "@/model/state";
import { Minimax } from "@/search/minimax";
import { setCellAt } from "@/utils/cellAt";
import emptyBoard from "@/utils/emptyBoard";
import printBoard from "@/utils/printBoard";

const board = emptyBoard();
setCellAt(board, 0, 8, 1);
printBoard(board);

const state = new Connect4State(0, true, emptyBoard());
export const connect4minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2 });
const move = connect4minimax.searchBestMove(state, { printGraph: true });

console.log("Best move", move.column);
