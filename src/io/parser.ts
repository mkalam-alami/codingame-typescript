
export type ResourceType = 'empty' | 'eggs' | 'crystal';
export type BaseType = 'none' | 'mine' | 'opponent';

export interface Cell {
  /**
   * The unique identifier of the cell. It also marks its index in the cells array:
   * `state.cells[index]` will always work.
   */
  index: number;

  /**
   * Whether this cell contains 'eggs', 'crystal' or is 'empty' in terms of resources.
   */
  resourceType: ResourceType;

  /**
   * Whether this cell has a base of 'mine', an 'opponent' base, or 'none'.
   */
  baseType: BaseType;

  /**
   * Number of resources on the cell before the game starts.
   */
  initialResources: number;

  /**
   * List of references to all neighbor cells.
   * Its length varies according to the number of existing or absent neighbors.
   */
  neighbors: Cell[];

  /**
   * Neighboring cell references, starting from the top-left neighbor and turning clockwise.
   * Absent neighbors will return undefined.
   */
  neighborsByDirection: Array<Cell | undefined>;

  /**
   * Neighboring cell indexes, starting from the top-left neighbor and turning clockwise.
   * Absent neighbors will return undefined.
   */
  neighborIndexesByDirection: Array<number | undefined>;
}

export interface CellState extends Cell {
  /**
   * The current amount of eggs or crystals in the cell.
   */
  resources: number;

  /**
   * The current amount of my ants in the cell.
   */
  myAnts: number;

  /**
   * The current amount of opponent ants in the cell.
   */
  opponentAnts: number;

  /**
   * List of references to all neighbor cells.
   * Its length varies according to the number of existing or absent neighbors.
   */
  neighbors: CellState[];

  /**
   * Neighboring cell references, starting from the top-left neighbor and turning clockwise.
   * Absent neighbors will return undefined.
   */
  neighborsByDirection: Array<CellState | undefined>;
}

export interface Map<T extends Cell> {
  /**
   * List of all cells of the map.
   */
  cells: T[];

  /**
   * List of cells holding my bases.
   */
  myBases: T[];

  /**
   * List of cells holding opponent bases.
   */
  opponentBases: T[];

  /**
   * Current turn (starts at 1)
   */
  turnIndex: number;
}

export function parseMap(): Map<Cell> {
  const map: Map<Cell> = {
    cells: [],
    myBases: [],
    opponentBases: [],
    turnIndex: 0
  };

  const numberOfCells: number = parseInt(readline()); // amount of hexagonal cells in this map
  for (let i = 0; i < numberOfCells; i++) {
    var inputs: string[] = readline().split(' ');
    const type: number = parseInt(inputs[0]); // 0 for empty, 1 for eggs, 2 for crystal
    const initialResources: number = parseInt(inputs[1]); // the initial amount of eggs/crystals on this cell
    const neigh0: number = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
    const neigh1: number = parseInt(inputs[3]);
    const neigh2: number = parseInt(inputs[4]);
    const neigh3: number = parseInt(inputs[5]);
    const neigh4: number = parseInt(inputs[6]);
    const neigh5: number = parseInt(inputs[7]);

    map.cells.push({
      index: i,
      baseType: 'none',
      resourceType: parseCellType(type),
      initialResources,
      neighbors: [],
      neighborsByDirection: [],
      neighborIndexesByDirection: [
        undefinedIfNegative(neigh0),
        undefinedIfNegative(neigh1),
        undefinedIfNegative(neigh2),
        undefinedIfNegative(neigh3),
        undefinedIfNegative(neigh4),
        undefinedIfNegative(neigh5)
      ],
    });
  }

  map.cells.forEach(cell => {
    cell.neighborIndexesByDirection.forEach((cellIndex, directionIndex) => {
      if (cellIndex !== undefined) {
        cell.neighbors.push(map.cells[cellIndex]);
        cell.neighborsByDirection[directionIndex] = map.cells[cellIndex];
      }
    })
  });

  const numberOfBases: number = parseInt(readline());
  var inputs: string[] = readline().split(' ');
  for (let i = 0; i < numberOfBases; i++) {
    const myBaseIndex: number = parseInt(inputs[i]);
    map.cells[myBaseIndex].baseType = 'mine';
    map.myBases.push(map.cells[myBaseIndex]);
  }
  var inputs: string[] = readline().split(' ');
  for (let i = 0; i < numberOfBases; i++) {
    const oppBaseIndex: number = parseInt(inputs[i]);
    map.cells[oppBaseIndex].baseType = 'opponent';
    map.opponentBases.push(map.cells[oppBaseIndex]);
  }

  return map;
}

function parseCellType(cellType: number): ResourceType {
  switch (cellType) {
    case 2: return 'crystal';
    case 1: return 'eggs';
    case 0: return 'empty';
  }
}

function undefinedIfNegative(n: number): number | undefined {
  if (n < 0) {
    return undefined;
  }
  return n;
}

export function parseMapState(map: Map<Cell>): Map<CellState> {
  map.turnIndex++;

  const mapState: Map<CellState> = {
    cells: [],
    myBases: [],
    opponentBases: [],
    turnIndex: map.turnIndex
  };

  for (let i = 0; i < map.cells.length; i++) {
    var inputs: string[] = readline().split(' ');
    const resources: number = parseInt(inputs[0]); // the current amount of eggs/crystals on this cell
    const myAnts: number = parseInt(inputs[1]); // the amount of your ants on this cell
    const opponentAnts: number = parseInt(inputs[2]); // the amount of opponent ants on this cell

    const cellState: CellState = {
      ...map.cells[i], // clone cell properties...
      resources,
      myAnts,
      opponentAnts,

      // ...but reset references to other cells, we'll point to cellStates instead
      neighbors: [],
      neighborsByDirection: []
    };
    mapState.cells.push(cellState);

    if (cellState.baseType === 'mine') {
      mapState.myBases.push(cellState);
    } else if (cellState.baseType === 'opponent') {
      mapState.opponentBases.push(cellState);
    }
  }

  mapState.cells.forEach(cell => {
    cell.neighborIndexesByDirection.forEach((cellIndex, directionIndex) => {
      if (cellIndex !== undefined) {
        cell.neighbors.push(mapState.cells[cellIndex]);
        cell.neighborsByDirection[directionIndex] = mapState.cells[cellIndex];
      }
    })
  });


  return mapState;
}