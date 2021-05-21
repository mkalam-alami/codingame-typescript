import { Clock } from "./clock";
import { formatMoves, formatNode, MoveNode, Node } from "./internal/node";
import pickWeighedRandom from "./internal/pickRandom";
import { Move } from "./move";
import { State } from "./state";

export interface MinimaxOptions {
  timeoutInMs: number;
  maxDepth: number;
  moveRandomization: number; // TODO Implement randomization config
  maxIterations: number;
  printIterationCount: boolean;
  printClock: boolean;
  printFinalGraph: boolean;
  printBranches: boolean;
}

export class Minimax<T, U extends Move> {

  // TODO Implement board caching by hash, reusable across multiple runs

  constructor(private options: Partial<MinimaxOptions> = {}) { }

  searchBestMove(rootState: State<T, U>): U {
    const clock = new Clock();
    const root = new Node(rootState, 'root', undefined);
    const maxIterations = this.options.maxIterations ?? (this.options.timeoutInMs ? Number.MAX_VALUE : 1000);

    for (let i = 0; i < maxIterations; i++) {
      const node = this.explore(root, this.options.maxDepth);
      if (this.options.printBranches) console.error(formatMoves(node));
      if (node === root) break; // Fully explored
      if (clock.readMillis() >= this.options.timeoutInMs) {
        if (this.options.printIterationCount) console.error(`Aborting after ${i} iterations`);
        break;
      }
    }

    if (this.options.printClock) clock.print();
    if (this.options.printFinalGraph) console.error(formatNode(root));

    if (root.children.length === 0) {
      throw new Error('no possible moves');
    }

    const bestChild = root.children.reduce((a, b) => {
      if (b.node?.minimaxValue === undefined) return a;
      if (a.node?.minimaxValue === undefined) return b;
      return b.node.minimaxValue > a.node.minimaxValue ? b : a;
    });
    return bestChild.move;
  }

  private explore(node: Node<T, U>, maxDepth?: number): Node<T, U> {
    const unexploredChildren = node.children.filter(c => !(c.node?.isFullyExplored));
    if (node.isLeaf || maxDepth === 0 || unexploredChildren.length === 0) {
      node.isFullyExplored = true;
      this.aggregateValue(node);
      return node;
    }

    const exploreChild = pickWeighedRandom(unexploredChildren, 3);
    const exploreMove = exploreChild.move;

    let child: MoveNode<T, U> = node.children.find(c => c.move === exploreMove);
    if (!child.node) {
      const forkedState = node.state.fork(exploreMove); // Debug: require('@/utils/printBoard').default(forkedState.board)
      child.node = new Node(forkedState, node, exploreMove);
    }

    if (!child.node.isFullyExplored) {
      return this.explore(child.node, maxDepth ? maxDepth - 1 : undefined);
    } else {
      return child.node;
    }
  }

  private aggregateValue(node: Node<T, U>) {
    let currentNode = node;
    let isFullyExploredUpToNow = true;

    while (currentNode.parent) {
      currentNode = currentNode.parent;

      const minMaxFunc = currentNode.state.isOurTurn() ? Math.max : Math.min;
      currentNode.minimaxValue = currentNode.children
        .filter(child => child.node)
        .map(child => child.node.minimaxValue)
        .reduce((a, b) => minMaxFunc(a, b));
      if (isFullyExploredUpToNow) {
        isFullyExploredUpToNow =
          currentNode.isFullyExplored = !currentNode.children.find(n => !(n.node?.isFullyExplored));
      }
    }
  }

}
