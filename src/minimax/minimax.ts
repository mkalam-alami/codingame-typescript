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
  printFinalBranch: boolean;
  strategy: 'depth-first' | 'breadth-first'
}

export class Minimax<T, U extends Move> {

  // TODO Implement board caching by hash, reusable across multiple runs

  constructor(private options: Partial<MinimaxOptions> = {}) {
    this.options.maxDepth ??= 50;
    this.options.strategy ??= 'depth-first';
  }

  searchBestMove(rootState: State<T, U>): U {
    const clock = new Clock();
    const root = new Node(rootState, 'root', 'root');
    const maxIterations = this.options.maxIterations ?? (this.options.timeoutInMs ? Number.MAX_VALUE : 1000);

    let i: number;
    if (this.options.strategy === 'depth-first') {
      // TODO Alpha beta pruning depth-first
      for (i = 0; i < maxIterations; i++) {
        const leaf = this.exploreDepthFirst(root, this.options.maxDepth);
        if (this.options.printBranches) console.error(formatMoves(leaf));

        if (root.isFullyExplored) break;
        if (clock.readMillis() >= this.options.timeoutInMs) {
          if (this.options.printClock) console.error(`Aborting due to timeout`);
          break;
        }
      }
    } else {
      // TODO Alpha beta pruning breadth-first
      let unvisited = [root];
      for (i = 0; i < maxIterations; i++) {
        const node = unvisited.splice(0, 1)[0];
        const newNodes = this.exploreBreadthFirst(node, this.options.maxDepth);
        unvisited.push(...newNodes);

        if (unvisited.length === 0) break;
        if (clock.readMillis() >= this.options.timeoutInMs) {
          if (this.options.printClock) console.error(`Aborting due to timeout`);
          break;
        }
      }
      if (this.options.printFinalBranch && unvisited.length > 0) console.error(formatMoves(unvisited[0]));
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

  private exploreBreadthFirst(node: Node<T, U>, maxDepth: number): Array<Node<T, U>> {
    if (node.isEnd || maxDepth === 0) {
      this.finalizeNode(node);
      return [];
    }

    node.initChildren();
    this.finalizeNode(node);
    return node.children;
  }

  private exploreDepthFirst(node: Node<T, U>, maxDepth: number) {
    if (node.isEnd || maxDepth === 0) {
      this.finalizeNode(node);
      return node;
    }

    node.initChildren();
    const unexploredChildren = node.children.filter(c => !c.isFullyExplored);
    const child = pickWeighedRandom(unexploredChildren, 3 / (this.options.moveRandomization || 1));
    return this.exploreDepthFirst(child, maxDepth - 1);
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
