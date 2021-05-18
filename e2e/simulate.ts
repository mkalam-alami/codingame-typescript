import connect4minimax from "@/minimax";
import Connect4State from "@/model/state";
import { setCellAt } from "@/utils/cellAt";
import emptyBoard from "@/utils/emptyBoard";
import printBoard from "@/utils/printBoard";

const board = emptyBoard();
setCellAt(board, 0, 8, 1);
printBoard(board);

const state = new Connect4State(true, emptyBoard());
const move = connect4minimax.searchBestMove(state, { printGraph: true });

console.log("Best move", move.column);