import { COLUMNS, Connect4Board, ROWS } from "../model/connect4state";
import { EMPTY } from "./cellData";

export function isValidCell(column: number, row: number): boolean {
  return column >= 0 && row >= 0 && column < COLUMNS && row < ROWS;
}

export function getCellAtUnsafe(board: Connect4Board, column: number, row: number): number {
  return board[column + COLUMNS * row];
}

export function getCellAt(board: Connect4Board, column: number, row: number): number {
  if (column < 0 || row < 0 || column >= COLUMNS || row >= ROWS) return EMPTY;
  return board[column + COLUMNS * row];
}

export function setCellAtUnsafe(board: Connect4Board, column: number, row: number, value: number): void {
  board[column + COLUMNS * row] = value;
}

export function setCellAt(board: Connect4Board, column: number, row: number, value: number): void {
  if (column < 0 || row < 0 || column >= COLUMNS || row >= ROWS) return;
  board[column + COLUMNS * row] = value;
}
