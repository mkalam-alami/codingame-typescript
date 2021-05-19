import { Move } from '../move';
import { State } from '../state';

export interface MoveNode<T, U extends Move> {
  move: U;
  node: Node<T, U>;
}

export class Node<T, U extends Move> {

  state: State<T, U>;
  availableMoves: U[];
  minimaxValue: number;
  isFullyExplored = false;

  parent?: Node<T, U>;
  children: Array<MoveNode<T, U>> = [];

  constructor(state: State<T, U>) {
    this.state = state;
    this.availableMoves = state.availableMoves();
    this.minimaxValue = state.isOurTurn() ? Number.MIN_VALUE : Number.MAX_VALUE;
  }

  get isLeaf() {
    return this.availableMoves.length === 0;
  }

}

export function printNode<T, U extends Move>(node: Node<T, U>, offset = 0) {
  console.debug(spaces(offset) + '> ' + node.minimaxValue)
  for (const child of node.children) {
    console.debug(spaces(offset + 2) + child.move.format());
    printNode(child.node, offset + 4);
  }
}

function spaces(count: number) {
  const a = new Array(count).fill(' ');
  return a.join('');
}