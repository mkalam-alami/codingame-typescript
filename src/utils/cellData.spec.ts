import { getLength, highestP1Length, highestP2Length, IS_SET_MASK, PLAYER_0, PLAYER_1, PLAYER_MASK, withLength } from "./cellData";

describe('cell data', () => {

  it('should parse empty cell data', () => {
    const cellData = 0b00_0000_0000_0000_0000;

    expect(cellData & IS_SET_MASK).toBe(0);
    expect(cellData & PLAYER_MASK).not.toBe(PLAYER_0);
    expect(cellData & PLAYER_MASK).not.toBe(PLAYER_1);
    expect(highestP1Length(cellData)).toBe(0);
    expect(highestP2Length(cellData)).toBe(0);
    expect(getLength(cellData, 0, 0)).toBe(0);
    expect(getLength(cellData, 0, 1)).toBe(0);
  });

  it('should parse filled cell data', () => {
    const cellData = 0b11_0010_0110_0100_0001;

    expect(cellData & IS_SET_MASK).not.toBe(0);
    expect(cellData & PLAYER_MASK).not.toBe(PLAYER_0);
    expect(cellData & PLAYER_MASK).toBe(PLAYER_1);
    expect(highestP1Length(cellData)).toBe(1);
    expect(highestP2Length(cellData)).toBe(2);

    expect(getLength(cellData, 0, 0)).toBe(0);
    expect(getLength(cellData, 0, 1)).toBe(2);

    expect(getLength(cellData, 1, 0)).toBe(1);
    expect(getLength(cellData, 1, 1)).toBe(2);

    expect(getLength(cellData, 2, 0)).toBe(1);
    expect(getLength(cellData, 2, 1)).toBe(0);

    expect(getLength(cellData, 3, 0)).toBe(0);
    expect(getLength(cellData, 3, 1)).toBe(1);
  });

  it('should support writing length data', () => {
    const cellData = 0b00_0000_0000_0000_0000;

    expect(withLength(cellData, 3, 0, 1)).toBe(0b00_0011_0000_0000_0000);
    expect(withLength(cellData, 3, 0, 0)).toBe(0b00_1100_0000_0000_0000);
    expect(withLength(cellData, 2, 3, 0)).toBe(0b00_0000_0000_0000_1000);
  });
});
