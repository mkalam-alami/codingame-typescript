export default function find<T>(source: T[], predicate: (element: T) => boolean): T | undefined {
  for (const element of source) {
    if (predicate(element)) {
      return element;
    }
  }
}
