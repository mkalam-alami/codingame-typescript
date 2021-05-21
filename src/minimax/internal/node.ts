import { Move } from '../move';
import { State } from '../state';

export class Node<T, U extends Move> {

  minimaxValue: number;
  isFullyExplored = false;

  lastMove?: U;
  parent?: Node<T, U>;
  children?: Array<Node<T, U>>;

  constructor(
    public state: State<T, U>,
    parent: Node<T, U> | 'root',
    lastMove: U | 'root') {
    this.minimaxValue = state.evaluate();
    if (parent !== 'root') this.parent = parent;
    if (lastMove !== 'root') this.lastMove = lastMove;
  }

  initChildren() {
    if (!this.children) {
      this.children = this.state.availableMoves()
        .map((move) => new Node(this.state.fork(move), this, move))
        .sort((a, b) => (this.state.isOurTurn() ? 1 : -1) * b.minimaxValue - a.minimaxValue);
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
  let output = spaces(offset) + '[' + formatMinimax(node.minimaxValue) + '] ' + (node.lastMove?.format() || 'ROOT') + ' ' + (node.state.isOurTurn() ? 'P1' : 'P2') + ' turn \n';
  if (node.children) {
    for (const child of node.children) {
      output += formatNode(child, offset + 4);
    }
  }
  return output;
}

export function formatMinimax(value: number): string {
  if (value === Number.MAX_VALUE) return 'WIN';
  if (value === -Number.MAX_VALUE) return 'LOSS';
  return value.toPrecision(2);
}

export function formatMoves<T, U extends Move>(node: Node<T, U>): string {
  let output = `[${node.minimaxValue}]`;
  while (node.parent) {
    output = (node.lastMove ? node.lastMove.format() + ' > ' : '') + output
    node = node.parent;
  }
  return output;
}

function spaces(count: number) {
  const a = new Array(count).fill(' ');
  return a.join('');
}