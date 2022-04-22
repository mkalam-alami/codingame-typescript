import { randomPosition } from "@/utils";
import { MAP_HEIGHT, MAP_WIDTH } from "./constants";

describe('Utils', () => {

  describe('randomPosition', () => {

    it('should pick a valid position within the map', () => {
      const result = randomPosition();

      expect(result.x).toBeGreaterThanOrEqual(0);
      expect(result.y).toBeGreaterThanOrEqual(0);

      expect(result.x).toBeLessThanOrEqual(MAP_WIDTH);
      expect(result.y).toBeLessThanOrEqual(MAP_HEIGHT);
    });

  })
});
