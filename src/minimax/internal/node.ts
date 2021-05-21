import { Move } from '../move';
import { State } from '../state';

export interface MoveNode<T, U extends Move> {
  move: U;
  node?: Node<T, U>;
}

export class Node<T, U extends Move> {

  minimaxValue: number;
  isFullyExplored = false;

  parent?: Node<T, U>;
  children: Array<MoveNode<T, U>> = [];

  constructor(
    public state: State<T, U>,
    parent: Node<T, U> | 'root',
    public lastMove: U | 'root') {

    const availableMoves = state.availableMoves();

    this.children = availableMoves
      .sort((a, b) => b[1] - a[1])
      .map(([move, _score]) => ({ move }));

    const availableScores = availableMoves.map(m => m[1]);
    this.minimaxValue = state.isOurTurn() ? Math.max(...availableScores) : Math.min(...availableScores);

    if (parent !== 'root') {
      this.parent = parent;
    }

  }

  get isLeaf() {
    return this.minimaxValue === Number.MAX_VALUE
      || this.minimaxValue === -Number.MAX_VALUE;
  }

}

export function printNode<T, U extends Move>(node: Node<T, U>, offset = 0) {
  console.error(formatNode(node, offset));
}

export function formatNode<T, U extends Move>(node: Node<T, U>, offset = 0): string {
  let output = spaces(offset) + '> ' + node.minimaxValue + '\n';
  for (const child of node.children) {
    output += spaces(offset + 2) + child.move.format() + '\n';
    output += formatNode(child.node, offset + 4);
  }
  return output;
}

export function formatMoves<T, U extends Move>(node: Node<T, U>): string {
  let output = `[${node.minimaxValue}]`;
  while (node.parent) {
    output = (node.lastMove === 'root' ? 'root' : node.lastMove.format()) + ' > ' + output
    node = node.parent;
  }
  return output;
}

function spaces(count: number) {
  const a = new Array(count).fill(' ');
  return a.join('');
}