export interface Delta { dx: number; dy: number };

const NEIGHBOR_DIRS: Delta[] = [
  // Axis 0 -
  {dx: -1, dy: 0},
  {dx: 1, dy: 0},

  // Axis 1 |
  {dx: 0, dy: -1},
  {dx: 0, dy: 1},

  // Axis 2 /
  {dx: -1, dy: 1},
  {dx: 1, dy: -1},

  // Axis 3 \
  {dx: -1, dy: -1},
  {dx: 1, dy: 1}
]

export default NEIGHBOR_DIRS;