import { State } from "./state";

export interface Move {
  format(): string;
}

/**
 * The greater the value, the bigger the chance is that the move will be explored.
 */
export type MoveHeuristic<T, U extends Move> = (move: Move, state: State<T, U>) => number;