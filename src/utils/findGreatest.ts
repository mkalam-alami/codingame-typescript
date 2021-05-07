
export default function findGreatest<T>(source: T[], comparator: (value: T) => number): T | undefined {
  return source.map(element => ({ element, score: comparator(element) }))
    .reduce((entry1, entry2) => entry1.score > entry2.score ? entry1 : entry2)
    .element;
}
