export default function pickWeightedRandom<T>(from: T[], weight = 3): T {
  const weightedRandom = Math.pow(Math.random(), weight); // Prefer early array
  return from[Math.floor(weightedRandom * from.length)];
}
