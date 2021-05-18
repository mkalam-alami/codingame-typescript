import { COLUMNS, Connect4Board, ROWS } from "@/model/state";

export default function printBoard(board: Connect4Board) {
  let line = '';
  board.forEach((cell, index) => {
    if (cell === -1) line += '.';
    if (cell === 1) line += '2';
    if (cell === 0) line += '1';
    if (index % COLUMNS === COLUMNS - 1) { console.error(line); line = ''; }
  })
  return board;
}
