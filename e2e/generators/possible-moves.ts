import { GameState, Tree } from '../../src/io/input';
import { Move } from '../../src/io/move';
import { DEFAULT_MAP } from '../../src/io/input-stubs';
import find from '../../src/utils/find';
import isEqual from '../../src/utils/isEqual';

export interface PossibleMovesOptions {
  possibleMovesIgnore?: Array<'GROW' | 'COMPLETE' | 'WAIT' | 'SEED'>;
}

/**
 * Remarque : Ne prend pas en compte les coûts en points de soleil
 */
export function generatePossibleMoves(state: GameState, options: PossibleMovesOptions = {}): Move[] {
  const possibleMoves: Move[] = [{ type: 'WAIT' }];
  const excludeMoveTypes = options.possibleMovesIgnore || [];

  for (const tree of state.trees) {
    if (tree.isMine && !tree.isDormant) {
      if (tree.size === 3 && !excludeMoveTypes.includes('COMPLETE')) {
      possibleMoves.push({ type: 'COMPLETE', cellId: tree.cellId });
      }

      if (tree.size < 3 && !excludeMoveTypes.includes('GROW')) {
        possibleMoves.push({ type: 'GROW', cellId: tree.cellId });
      }

      if (tree.size > 0 && !excludeMoveTypes.includes('SEED')) {
        addPossibleSeeds(possibleMoves, state.trees, [tree.cellId], tree.size);
      }
    }
  }

  return possibleMoves;
}

function addPossibleSeeds(possibleMoves: Move[], allTrees: Tree[], path: number[], checkSize: number) {
  if (checkSize === 0) {
    return;
  }

  const lastSegment = path[path.length - 1];
  for (const neighborCellId of DEFAULT_MAP[lastSegment].neighborIndexes) {
    const cellhasTree = find(allTrees, t => t.cellId === neighborCellId);
    if (isStraightPath(path, neighborCellId) && !cellhasTree) {
      addIfMissing(possibleMoves, { type: 'SEED', sourceId: path[0], targetId: neighborCellId });
      addPossibleSeeds(possibleMoves, allTrees, [...path, neighborCellId], checkSize - 1);
    }
  }
}

function addIfMissing(possibleMoves: Move[], move: Move) {
  const isMissing = !find(possibleMoves, possibleMove => isEqual(possibleMove, move));
  if (isMissing) {
    possibleMoves.push(move);
  }
}

function isStraightPath(currentPath: number[], candidateCellId: number) {
  if (currentPath.length <= 1) {
    return true;
  }

  /**
   * To detect a straight line A -> B -> C,
   * make sure that all neighbors of A and C have only a single cell in common,
   * which is B.
   */

  const penultimateCellId = currentPath[currentPath.length - 2];
  const penultimateNeighbors = DEFAULT_MAP[penultimateCellId].neighborIndexes;
  const candidateNeighbors = DEFAULT_MAP[candidateCellId].neighborIndexes;

  const neighborIntersection = penultimateNeighbors.filter(cellId => candidateNeighbors.includes(cellId));
  return neighborIntersection.length === 1 && neighborIntersection[0] === currentPath[currentPath.length - 1];
}
