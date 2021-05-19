import { COLUMNS, Connect4Board, Connect4Cell, ROWS } from "../model/state";

export function isValidCell(column: number, row: number): boolean {
  return column >= 0 && row >= 0 && column < COLUMNS && row < ROWS;
}

export function getCellAtUnsafe(board: Connect4Board, column: number, row: number): number {
  return board[column + COLUMNS * row];
}

export function getCellAt(board: Connect4Board, column: number, row: number): number {
  if (column < 0 || row < 0 || column >= COLUMNS || row >= ROWS) return -9;
  return board[column + COLUMNS * row];
}

export function setCellAtUnsafe(board: Connect4Board, column: number, row: number, value: Connect4Cell): void {
  board[column + COLUMNS * row] = value;
}

export function setCellAt(board: Connect4Board, column: number, row: number, value: Connect4Cell): void {
  if (column < 0 || row < 0 || column >= COLUMNS || row >= ROWS) return;
  board[column + COLUMNS * row] = value;
}
