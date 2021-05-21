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
  printFinalGraph: boolean | number;
  exportFinalGraph: boolean | number;
  printBranches: boolean;
}

export class Minimax<T, U extends Move> {

  // TODO Implement board caching by hash, reusable across multiple runs

  constructor(private options: Partial<MinimaxOptions> = {}) {
    this.options.maxDepth ??= 50;
  }

  searchBestMove(rootState: State<T, U>): U {
    const clock = new Clock();
    const root = new Node(rootState, 'root', 'root');
    const maxIterations = this.options.maxIterations ?? (this.options.timeoutInMs ? Number.MAX_VALUE : 1000);

    let i: number;
    for (i = 0; i < maxIterations; i++) {
      const leaf = this.explore(root, this.options.maxDepth);
      if (this.options.printBranches) console.error(formatMoves(leaf));

      if (root.isFullyExplored) break; // Fully explored
      if (clock.readMillis() >= this.options.timeoutInMs) {
        if (this.options.printClock) console.error(`Aborting due to timeout`);
        break;
      }
    }
    if (this.options.printIterationCount) console.error(`Ran ${i} iterations`);

    if (this.options.printClock) clock.print();
    if (this.options.printFinalGraph) console.error(formatNode(root, typeof this.options.printFinalGraph === 'boolean' ? -1 : this.options.printFinalGraph));
    if (this.options.exportFinalGraph) {
      const out = formatNode(root, typeof this.options.exportFinalGraph === 'boolean' ? -1 : this.options.exportFinalGraph);
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

  private explore(node: Node<T, U>, maxDepth: number) {
    if (node.isEnd || maxDepth === 0) {
      this.finalizeNode(node);
      return node;
    }

    node.initChildren();
    const unexploredChildren = node.children.filter(c => !c.isFullyExplored);
    const child = pickWeighedRandom(unexploredChildren, 3 / (this.options.moveRandomization || 1));
    if (child === undefined) console.log(unexploredChildren, node);
    return this.explore(child, maxDepth - 1);
  }

  private finalizeNode(node: Node<T, U>) {
    let currentNode = node;
    let isFullyExploredUpToNow = true;

    while (currentNode.parent) {
      currentNode = currentNode.parent;

      const minMaxFunc = currentNode.state.isOurTurn() ? Math.max : Math.min;
      currentNode.minimaxValue = currentNode.children
        .map(child => child.minimaxValue)
        .reduce((a, b) => minMaxFunc(a, b), currentNode.minimaxValue);

      if (isFullyExploredUpToNow) {
        isFullyExploredUpToNow = currentNode.isFullyExplored = !currentNode.children.find(n => !n.isFullyExplored);
      }
    }
  }

}
