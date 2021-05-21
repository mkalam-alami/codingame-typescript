import { readFileSync } from "fs";
import { resolve } from "path";

const BOT_PATH = resolve(__dirname, '../dist/codingame.js');
const BOT_CODE = readFileSync(BOT_PATH).toString();
const END_OF_TEST_MESSAGE = '__END_OF_TEST__';

export function runBot(input: string[]): string[] {
  (globalThis as any).readline = createReadlineMock(input, END_OF_TEST_MESSAGE);

  const logs = recordConsoleLog(() => {
    try {
      eval(BOT_CODE);
    } catch (e) {
      if (e.message !== END_OF_TEST_MESSAGE) {
        throw e;
      }
    }
  });

  return logs;
}

function createReadlineMock(input: string[], inputEndMessage: string): () => string {
  let remainingInput = [...input];
  return () => {
    if (remainingInput.length > 0) {
      return remainingInput.splice(0, 1)[0];
    } else {
      throw new Error(inputEndMessage);
    }
  }
}

function recordConsoleLog(callback: Function): string[] {
  const outputs: string[] = [];
  const realConsoleLog = console.log;
  const realConsoleError = console.debug;

  try {
    console.log = (output) => outputs.push(output);
    console.debug = () => undefined; // Silence debug traces
    callback();

  } finally {
    console.log = realConsoleLog;
    console.debug = realConsoleError;
  }

  return outputs;
}
