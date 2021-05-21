import { Clock } from "./clock";
import { formatMoves, formatNode, MoveNode, Node } from "./internal/node";
import pickWeighedRandom from "./internal/pickRandom";
import { Move, MoveHeuristic } from "./move";
import { State, StateHeuristic } from "./state";

export interface MinimaxOptions {
  timeoutInMs: number;
  maxDepth: number;
  moveRandomization: number; // TODO Implement randomization config
  maxIterations: number;
  printIterationCount: boolean;
  printClock: boolean;
}

export class Minimax<T, U extends Move> {

  // TODO Implement board caching by hash, reusable across multiple runs

  constructor(
    private stateHeuristic: StateHeuristic<T, U>,
    private moveHeuristic: MoveHeuristic<T, U>,
    private options: Partial<MinimaxOptions> = {}) {
  }

  searchBestMove(rootState: State<T, U>, options: { printFinalGraph?: boolean; printBranches?: boolean } = {}): U {
    const clock = new Clock();
    const root = new Node(rootState, 'root', this.stateHeuristic(rootState), undefined);
    const maxIterations = this.options.maxIterations ?? (this.options.timeoutInMs ? Number.MAX_VALUE : 1000);

    for (let i = 0; i < maxIterations; i++) { // TODO Explore more intelligently
      const node = this.explore(root, this.options.maxDepth);
      if (options.printBranches) console.error(formatMoves(node));
      if (clock.readMillis() >= this.options.timeoutInMs) {
        if (this.options.printIterationCount) console.error(`Aborting after ${i} iterations`);
        break;
      }
    }

    if (this.options.printClock) clock.print();
    if (options.printFinalGraph) console.error(formatNode(root));

    if (root.children.length === 0) {
      console.error('ERROR: no children explored');
      return root.availableMoves[0];
    }

    const bestChild = root.children.reduce((a, b) => {
      if (b.node.minimaxValue === undefined) return a;
      if (a.node.minimaxValue === undefined) return b;
      return b.node.minimaxValue > a.node.minimaxValue ? b : a;
    });
    return bestChild.move;
  }

  private explore(node: Node<T, U>, maxDepth?: number): Node<T, U> {
    if (node.isLeaf || maxDepth === 0) {
      node.isFullyExplored = true;
      this.aggregateValue(node);
      return node;
    }

    const exploreMove = pickWeighedRandom(node.availableMoves, 1); // TODO ignore fully explored. Refactor to combine availableMoves vs. children, sort them to use weighted pick

    let child: MoveNode<T, U> = node.children.find(c => c.move === exploreMove);
    if (!child) {
      const forkedState = node.state.fork(exploreMove); // Debug: require('@/utils/printBoard').default(forkedState.board)
      child = {
        move: exploreMove,
        node: new Node(forkedState, node, this.stateHeuristic(forkedState), exploreMove),
      };
      node.children.push(child);
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
        .map(child => child.node.minimaxValue)
        .reduce((a, b) => minMaxFunc(a, b));
      if (isFullyExploredUpToNow) {
        isFullyExploredUpToNow =
          currentNode.isFullyExplored =
          currentNode.children.length === currentNode.availableMoves.length
          && !currentNode.children.find(n => !n.node.isFullyExplored);
      }
    }
  }

}
