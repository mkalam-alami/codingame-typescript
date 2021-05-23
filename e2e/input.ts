import { Connect4Board } from "@/model/connect4state";
import { IS_SET_MASK } from "@/utils/cellData";
import { formatBoard } from "@/utils/printBoard";

export function initInputs(playerIndex = 0) {
  return playerIndex === 0 ? ['0 1'] : ['1 0'];
}

export function turnInputs(board: Connect4Board) {
  const turn = board.filter(c => c & IS_SET_MASK).length;
  return [
    turn.toString(),
    ...formatBoard(board).trim().split('\n'),
    '0', // Mock available moves
    '-1' // Mock opponent's turn
  ]
}
