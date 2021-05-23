export default function traceReadline() {
  const trueReadline = readline;
  (globalThis as any).readline = () => {
    const line = trueReadline();
    console.error(line);
    return line;
  };
}
