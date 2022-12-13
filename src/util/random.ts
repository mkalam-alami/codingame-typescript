import { Point, Size } from "@/io/parser";

/**
 * Renvoie un entier au hasard
 * @param min le nombre minimal (inclus)
 * @param max le nombre maximal (exclus)
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomPosition(mapSize: Size): Point {
  return {
    x: randomInt(0, mapSize.width),
    y: randomInt(0, mapSize.height),
  }
}
