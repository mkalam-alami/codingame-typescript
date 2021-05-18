import { COLUMNS, Connect4Board, Connect4Cell } from "../model/state";

export function getCellAt(board: Connect4Board, x: number, y: number): number {
  return board[x + COLUMNS * y];
}

export function setCellAt(board: Connect4Board, x: number, y: number, value: Connect4Cell): void {
  board[x + COLUMNS * y] = value;
}
