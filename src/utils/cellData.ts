
export const IS_SET_MASK = 0b01_0000_0000_0000_0000;
export const EMPTY = 0b00_0000_0000_0000_0000;
export const PLAYER_0 = 0b01_0000_0000_0000_0000;
export const PLAYER_MASK = 0b11_0000_0000_0000_0000;
export const PLAYER_1 = 0b11_0000_0000_0000_0000;

export function highestP1Length(cellData: number) {
  return Math.max(
    (cellData & 0b1100) >> 2,
    (cellData & 0b1100_0000) >> 6,
    (cellData & 0b1100_0000_0000) >> 10,
    (cellData & 0b1100_0000_0000_0000) >> 14);
}

export function highestP2Length(cellData: number) {
  return Math.max(
    (cellData & 0b11),
    (cellData & 0b11_0000) >> 4,
    (cellData & 0b11_0000_0000) >> 8,
    (cellData & 0b11_0000_0000_0000) >> 12);
}

export function getLength(cellData: number, axisIndex: number, player: number) {
  return (cellData & (3 << (14 - player * 2 - axisIndex * 4))) >> (14 - player * 2 - axisIndex * 4);
}

/**
 * NB. Only works if written celldata bytes are empty
 */
export function withLength(cellData: number, length: number, axisIndex: number, playerIndex: number): number {
  return cellData | (length << (14 - playerIndex * 2 - axisIndex * 4));
}
