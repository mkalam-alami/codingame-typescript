import { moveHeuristic, stateHeuristic } from "@/heuristics";
import { Minimax } from "@/minimax/minimax";
import Connect4State from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMove from "@/utils/playMove";
import printBoard from "@/utils/printBoard";


const board = emptyBoard();
playMove(board, 3, 1);
playMove(board, 3, 1);
playMove(board, 3, 1);
printBoard(board);

const state = new Connect4State(0, true, board);
const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 2 });
const bestMove = minimax.searchBestMove(state, { printGraph: true });

console.log("Best move", bestMove.column);
