import { Clock } from "./clock";
import { MoveNode, Node, formatNode } from "./internal/node";
import pickWeightedRandom from "./internal/pickRandom";
import { Move, MoveHeuristic } from "./move";
import { State, StateHeuristic } from "./state";

export interface MinimaxOptions {
  searchTimeoutInMs: number;
  maxDepth: number;
  moveRandomization: number; // TODO Implement randomization config
}

export class Minimax<T, U extends Move> {

  // TODO Implement board caching by hash, reusable across multiple runs

  constructor(
    private stateHeuristic: StateHeuristic<T, U>,
    private moveHeuristic: MoveHeuristic<T, U>,
    private options: Partial<MinimaxOptions> = {}) {
  }

  searchBestMove(rootState: State<T, U>, options: { printGraph?: boolean } = {}): U {
    const clock = new Clock();
    const root = new Node(rootState, 'root');

    for (let i = 0; i < 1000; i++) { // TODO Explore more intelligently
      this.explore(root, this.options.maxDepth);
      if (clock.readMillis() >= this.options.searchTimeoutInMs) {
        break;
      }
    }

    if (options.printGraph) {
      // clock.print();
      formatNode(root);
    }

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

  private explore(node: Node<T, U>, maxDepth?: number) {
    if (node.isLeaf || maxDepth === 0) {
      node.minimaxValue = this.stateHeuristic(node.state);
      node.isFullyExplored = true;
      this.aggregateValue(node);
      return;
    }

    const exploreMove = pickWeightedRandom(node.availableMoves, 1); // TODO ignore fully explored. Refactor to combine availableMoves vs. children, sort them to use weighted pick

    let child: MoveNode<T, U> = node.children.find(c => c.move === exploreMove);
    if (!child) {
      const forkedState = node.state.fork(exploreMove); // Debug: require('@/utils/printBoard').default(forkedState.board)
      child = {
        move: exploreMove,
        node: new Node(forkedState, node),
      };
      node.children.push(child);
    }

    if (!child.node.isFullyExplored) {
      this.explore(child.node, maxDepth ? maxDepth - 1 : undefined);
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
