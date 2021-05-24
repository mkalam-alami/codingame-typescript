import { writeFileSync } from "fs";
import { Clock } from "./clock";
import { formatMoves, formatNode, Node } from "./internal/node";
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

    let it: number;
    try {
      if (this.options.strategy === 'depth-first') {
        it = this.exploreDepthFirst(root, this.options.maxDepth, -Number.MAX_VALUE, Number.MAX_VALUE, 1, clock);

      } else {
        let unvisited = [root];
        for (it = 0; it < maxIterations; it++) {
          const node = unvisited.splice(0, 1)[0];
          const newNodes = this.exploreBreadthFirst(node, this.options.maxDepth);
          unvisited.push(...newNodes);

          if (unvisited.length === 0) break;
          if (it % 10 === 0 && clock.readMillis() >= this.options.timeoutInMs) throw it;
        }
        if (this.options.printFinalBranch && unvisited.length > 0) console.error(formatMoves(unvisited[0]));
      }
    } catch (e) {
      if (typeof e !== 'number') throw e;
      if (this.options.printClock) console.error(`Aborting due to timeout`);
    }

    if (this.options.printIterationCount) console.error(`Ran ${it} iterations`);
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

  private exploreDepthFirst(node: Node<T, U>, depth: number, alpha: number, beta: number, it: number, clock: Clock): number {
    if (node.isEnd || depth === 0) {
      it++;
      if (clock.readMillis() >= this.options.timeoutInMs) throw it;
      this.finalizeNode(node);
      return it;
    }
    node.initChildren();

    // TODO Understand what I'm doing
    if (node.state.isOurTurn()) {
      let minimaxValue = -Number.MAX_VALUE;
      for (const child of node.children) {
        it = this.exploreDepthFirst(child, depth - 1, alpha, beta, it, clock);
        minimaxValue = Math.max(minimaxValue, child.minimaxValue);
        alpha = Math.max(minimaxValue, alpha);
        if (alpha >= beta) break;
      }
      node.minimaxValue = minimaxValue;
    } else {
      let minimaxValue = Number.MAX_VALUE;
      for (const child of node.children) {
        it = this.exploreDepthFirst(child, depth - 1, alpha, beta, it, clock);
        minimaxValue = Math.min(minimaxValue, child.minimaxValue);
        beta = Math.min(minimaxValue, beta);
        if (beta <= alpha) break;
      }
      node.minimaxValue = minimaxValue;
    }

    return it;
    // const unexploredChildren = node.children.filter(c => !c.isFullyExplored);
    // const child = pickWeighedRandom(unexploredChildren, 3 / (this.options.moveRandomization || 1));
    // return this.exploreDepthFirst(child, maxDepth - 1);
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

  private exploreBreadthFirst(node: Node<T, U>, maxDepth: number): Array<Node<T, U>> {
    if (node.isEnd || maxDepth === 0) {
      this.finalizeNode(node);
      return [];
    }

    node.initChildren();
    this.finalizeNode(node);
    return node.children;
  }

}
