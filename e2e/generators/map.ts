export const RICHNESS_3_START = 0;
export const RICHNESS_2_START = 7;
export const RICHNESS_1_START = 19;

export function generateMapInput(zeroRichnessIds: number[] = []) {
  const defaultMap = [
    '0 3 1 2 3 4 5 6',
    '1 3 7 8 2 0 6 18',
    '2 3 8 9 10 3 0 1',
    '3 3 2 10 11 12 4 0',
    '4 3 0 3 12 13 14 5',
    '5 3 6 0 4 14 15 16',
    '6 3 18 1 0 5 16 17',
    '7 2 19 20 8 1 18 36',
    '8 2 20 21 9 2 1 7',
    '9 2 21 22 23 10 2 8',
    '10 2 9 23 24 11 3 2',
    '11 2 10 24 25 26 12 3',
    '12 2 3 11 26 27 13 4',
    '13 2 4 12 27 28 29 14',
    '14 2 5 4 13 29 30 15',
    '15 2 16 5 14 30 31 32',
    '16 2 17 6 5 15 32 33',
    '17 2 35 18 6 16 33 34',
    '18 2 36 7 1 6 17 35',
    '19 1 -1 -1 20 7 36 -1',
    '20 1 -1 -1 21 8 7 19',
    '21 1 -1 -1 22 9 8 20',
    '22 1 -1 -1 -1 23 9 21',
    '23 1 22 -1 -1 24 10 9',
    '24 1 23 -1 -1 25 11 10',
    '25 1 24 -1 -1 -1 26 11',
    '26 1 11 25 -1 -1 27 12',
    '27 1 12 26 -1 -1 28 13',
    '28 1 13 27 -1 -1 -1 29',
    '29 1 14 13 28 -1 -1 30',
    '30 1 15 14 29 -1 -1 31',
    '31 1 32 15 30 -1 -1 -1',
    '32 1 33 16 15 31 -1 -1',
    '33 1 34 17 16 32 -1 -1',
    '34 1 -1 35 17 33 -1 -1',
    '35 1 -1 36 18 17 34 -1',
    '36 1 -1 19 7 18 35 -1'
  ];

  const patchedMap = defaultMap.map((line, cellId) => {
    if (zeroRichnessIds.includes(cellId)) {
      return line.split(' ')
        .map((token, index) => index === 1 ? '0' : token)
        .join(' ');
    } else {
      return line;
    }
  });

  return [
    patchedMap.length.toString(), // first line = map length
    ...patchedMap
  ];
}