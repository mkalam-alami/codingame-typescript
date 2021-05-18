import { Move } from '../move';
import { State } from '../state';

export interface MoveNode<T, U extends Move> {
  move: U;
  node: Node<T, U>;
}

export class Node<T, U extends Move> {

  state: State<T, U>;
  availableMoves: U[];
  minimaxValue?: number;
  isFullyExplored = false;

  parent?: Node<T, U>;
  children: Array<MoveNode<T, U>> = [];

  constructor(state: State<T, U>) {
    this.state = state;
    this.availableMoves = state.availableMoves();
  }

  get isLeaf() {
    return this.availableMoves.length === 0;
  }

}
