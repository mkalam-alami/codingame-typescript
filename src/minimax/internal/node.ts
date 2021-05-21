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
      .map<[U, number]>((move) => [move, state.fork(move).evaluate()])
      .sort((a, b) => (state.isOurTurn() ? 1 : -1) * b[1] - a[1])
      .map(([move, _score]) => ({ move }));

    this.minimaxValue = state.evaluate();

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
  console.debug(formatNode(node, offset));
}

export function formatNode<T, U extends Move>(node: Node<T, U>, offset = 0): string {
  let output = spaces(offset) + '[' + formatMinimax(node.minimaxValue) + '] ' + (node.state.isOurTurn()?'P1':'P2') + ' turn \n';
  for (const child of node.children) {
    output += spaces(offset + 2) + '> ' + child.move.format() + '\n';
    if (child.node) {
      output += formatNode(child.node, offset + 4);
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
    output = (node.lastMove === 'root' ? 'root' : node.lastMove.format()) + ' > ' + output
    node = node.parent;
  }
  return output;
}

function spaces(count: number) {
  const a = new Array(count).fill(' ');
  return a.join('');
}