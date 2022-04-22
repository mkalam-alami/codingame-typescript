import { MAP_HEIGHT, MAP_WIDTH } from "@/constants";

export function randomPosition() {
  return {
      x: Math.floor(Math.random() * MAP_WIDTH),
      y: Math.floor(Math.random() * MAP_HEIGHT)
  }
}
