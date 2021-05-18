import { getCellAt } from "../utils/cellAt";
import { Move } from "../search/move";
import { State } from "../search/state";

export const ROWS = 8;
export const COLUMNS = 9;

export type Connect4Cell = -1 | 0 | 1;
export type Connect4Board = Connect4Cell[];
export class Connect4Move implements Move {
  constructor(public column: number) { };
  format() {
    return this.column.toString();
  }
}

const DEFAULT_MOVES = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(column => new Connect4Move(column));

export default class Connect4State implements State<Connect4Board, Connect4Move> {

  constructor(
    private _isOurTurn: boolean,
    private board: Connect4Board) { }

  get() {
    return this.board;
  }

  isOurTurn(): boolean {
    return this._isOurTurn;
  }

  availableMoves(): Connect4Move[] {
    return DEFAULT_MOVES.filter(move => getCellAt(this.board, move.column, 0) === -1);
  }

  fork(move: Move): Connect4State {
    const forkedBoard = [...this.board];
    // TODO Play move
    return new Connect4State(!this._isOurTurn, forkedBoard);
  }

}
