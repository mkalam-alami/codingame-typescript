import { Move } from "./move";

export interface State<T, U extends Move> {

  get(): T;

  isOurTurn(): boolean;

  /**
   * Returns the list of all available (and interesting) moves for the current player, and their heuristic evaluations.
   * Return an empty list if the game is over.
   */
  availableMoves(): U[];

  fork(move: U): State<T, U>;

  evaluate(): number;

}

/**
 * Returns an evaluation of the position strength for our player.
 * Return Number.MAX_VALUE for a win, Number.MIN_VALUE for a loss.
 */
export type StateHeuristic<T, U extends Move> = (state: State<T, U>) => number;
