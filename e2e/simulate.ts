import { moveHeuristic, stateHeuristic } from "@/heuristics";
import { Minimax } from "@/minimax/minimax";
import Connect4State, { COLUMNS } from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMoves from "@/utils/playMoves";
import printBoard from "@/utils/printBoard";

const board = emptyBoard();
playMoves(board, [3, 3, 3, 3, 1, 3, 7, 3, 6]);
printBoard(board);

let bestMoves: number[] = [];

for (let i = 0; i < 50; i++) {

  const state = new Connect4State(0, true, board);
  const minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 4, maxIterations: 50 });
  const bestMove = minimax.searchBestMove(state, { printBranches: false, printFinalGraph: false });
  bestMoves.push(bestMove.column);

}

console.log(bestMoves + '\n');

for (let column = 0; column < COLUMNS; column++) {
  console.log(`${column}: ${Math.round(100. * bestMoves.filter(b => b === column).length / bestMoves.length)}%`)
}
