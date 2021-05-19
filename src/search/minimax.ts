import { Clock } from "./clock";
import { MoveNode, Node, printNode } from "./internal/node";
import pickRandom from "./internal/pickRandom";
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
    const root = new Node(rootState);

    for (let i = 0; i < 100; i++) { // TODO Explore more intelligently
      this.explore(root, this.options.maxDepth);
      if (clock.readMillis() >= this.options.searchTimeoutInMs) {
        break;      }
    }

    if (options.printGraph) {
      printNode(root);
    }

    if (root.children.length === 0) {
      console.error('ERROR: no children explored');
      return root.availableMoves[0];
    }

    const bestChild = root.children.reduce((a, b) => b.node.minimaxValue > a.node.minimaxValue ? a : b);
    return bestChild.move;
  }

  private explore(node: Node<T, U>, maxDepth?: number) {
    if (node.isLeaf || maxDepth === 0) {
      node.minimaxValue = this.stateHeuristic(node.state);
      node.isFullyExplored = true;
      this.aggregateValue(node);
      return;
    }

    const exploreMove = pickRandom(node.availableMoves); // TODO Ponderate by move heuristic, ignore fully explored. Maybe refactor to combine availableMoves vs. children

    let child: MoveNode<T, U> = node.children.find(c => c.move === exploreMove);
    if (!child) {
      const forkedState = node.state.fork(exploreMove);
      child = {
        move: exploreMove,
        node: new Node(forkedState)
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
      const parent = currentNode.parent;
      const minMaxFunc = parent.state.isOurTurn() ? Math.min : Math.max;
      parent.minimaxValue = parent.children
        .map(child => child.node.minimaxValue)
        .reduce((a, b) => minMaxFunc(a, b));
      if (isFullyExploredUpToNow) {
        isFullyExploredUpToNow =
          parent.isFullyExplored =
          parent.children.length === parent.availableMoves.length
          && !parent.children.find(n => !n.node.isFullyExplored);
      }
    }
  }

}
