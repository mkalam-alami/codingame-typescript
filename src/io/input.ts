export type Map = Cell[];

export interface Cell {

  /**
   * 0 is the center cell, the next cells spiral outwards
   */
  index: number;

  /**
   * 0 if the cell is unusable, 1-3 for usable cells
   */
  richness: number;

  /**
   * the index of the neighbouring cell for each direction
   */
  neighborIndexes: number[];

  /**
   * the neighbouring cell for each direction
   */
  neighbors: Cell[];
}

export interface GameState {

  /**
   * the game lasts 24 days: 0-23
   */
  day: number;

  /**
   * the base score you gain from the next COMPLETE action
   */
  nutrients: number;

  /**
   * your sun points
   */
  sun: number;

  /**
   * your current score
   */
  score: number;

  /**
   * opponent's sun points
   */
  opponentSun: number;

  /**
   * opponent's score
   */
  opponentScore: number;

  /**
   * whether your opponent is asleep until the next day
   */
  opponentIsWaiting: boolean;

  /**
   * the current trees
   */
  trees: Tree[];

  possibleMoves: string[];
}

export interface Tree {

  /**
   * location of this tree
   */
  cellIndex: number;

  /**
   * location of this tree
   */
  cell: Cell;

  /**
   * size of this tree: 0-3
   */
  size: number;

  /**
   * true if this is your tree
   */
  isMine: boolean;

  /**
   * true if this tree is dormant
   */
  isDormant: boolean;
}
