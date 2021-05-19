export interface Offset { dx: number; dy: number };

const NEIGHBOR_OFFSETS: Offset[] = [
  {dx: -1, dy: -1},
  {dx: 1, dy: -1},
  {dx: 0, dy: -1},
  {dx: 0, dy: 1},
  {dx: -1, dy: 1},
  {dx: 1, dy: 1},
  {dx: -1, dy: 0},
  {dx: 1, dy: 0}
]

export default NEIGHBOR_OFFSETS;