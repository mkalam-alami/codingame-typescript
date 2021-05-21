import { writeFileSync } from "fs";
import { Clock } from "./clock";
import { formatMoves, formatNode, Node } from "./internal/node";
import pickWeighedRandom from "./internal/pickRandom";
import { Move } from "./move";
import { State } from "./state";

export interface MinimaxOptions {
  timeoutInMs: number;
  maxDepth: number;
  moveRandomization: number;
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
    const root = new Node(rootState, 'root', 'root');
    const maxIterations = this.options.maxIterations ?? (this.options.timeoutInMs ? Number.MAX_VALUE : 1000);

    let i: number;
    for (i = 0; i < maxIterations; i++) {
      const node = this.explore(root, this.options.maxDepth);
      if (this.options.printBranches) console.error(formatMoves(node));
      if (node === root) break; // Fully explored
      if (clock.readMillis() >= this.options.timeoutInMs) {
        if (this.options.printClock) console.error(`Aborting due to timeout`);
        break;
      }
    }
    if (this.options.printIterationCount) console.error(`Ran ${i} iterations`);

    if (this.options.printClock) clock.print();
    if (this.options.printFinalGraph) {
      const out = formatNode(root);
      //console.error(out);
      writeFileSync('out.log', out);
    }

    if (root.children.length === 0) {
      throw new Error('no possible moves');
    }

    const bestChild = root.children.reduce((a, b) => {
      if (b.minimaxValue === undefined) return a;
      if (a.minimaxValue === undefined) return b;
      return b.minimaxValue > a.minimaxValue ? b : a;
    });
    return bestChild.lastMove;
  }

  private explore(node: Node<T, U>, maxDepth?: number): Node<T, U> {
    node.initChildren();
    const unexploredChildren = node.children.filter(c => !(c.isFullyExplored));
    if (node.isLeaf || maxDepth === 0 || unexploredChildren.length === 0) {
      node.isFullyExplored = true;
      this.aggregateValue(node);
      return node;
    }

    const child = pickWeighedRandom(unexploredChildren, 3 / (this.options.moveRandomization || 1));
    if (!child.isFullyExplored) {
      return this.explore(child, maxDepth ? maxDepth - 1 : undefined);
    } else {
      return child;
    }
  }

  private aggregateValue(node: Node<T, U>) {
    let currentNode = node;
    let isFullyExploredUpToNow = true;

    while (currentNode.parent) {
      currentNode = currentNode.parent;

      const minMaxFunc = currentNode.state.isOurTurn() ? Math.max : Math.min;
      currentNode.minimaxValue = currentNode.children
        .map(child => child.minimaxValue)
        .reduce((a, b) => minMaxFunc(a, b), currentNode.minimaxValue);
      if (isFullyExploredUpToNow) {
        isFullyExploredUpToNow =
          currentNode.isFullyExplored = !currentNode.children.find(n => !n.isFullyExplored);
      }
    }
  }

}
