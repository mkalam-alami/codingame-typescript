import { Clock } from "@/minimax/clock";

const T1 = new Array(200).fill(1);
T1.fill(523, 100, 200);
const T2 = new Array(100).fill(1 | (523 << 1));

run('direct access', () => {
  const a = T1[30];
  const b = T1[130];
  if (a !== 1 || b !== 523) throw new Error(`${a} ${b}`);
}, 1000000 * 500);

run('combined data', () => {
  const a = T2[30] & 1;
  const b = T2[30] >> 1;
  if (a !== 1 || b !== 523) throw new Error(`${a} ${b}`);
}, 1000000 * 500);

run('clone small', () => {
  const a = [...T2];
  a[0] = 2;
  if (T2[0] !== 1047) throw new Error(a[0]);
});
run('clone small #2', () => {
  const a = T2.slice();
  a[0] = 2;
  if (T2[0] !== 1047) throw new Error(a[0]);
});
run('clone small #3', () => {
  const a = new Array(T2.length);
  let l = T2.length - 1;
  while (l--) a[l] = T2[l];
  a[0] = 2;
  if (T2[0] !== 1047) throw new Error(a[0]);
});
run('clone small #4', () => {
  const a = Object.values(T2);
  a[0] = 2;
  if (T2[0] !== 1047) throw new Error(a[0]);
});

run('clone double', () => {
  const a = T1.slice();
  a[0] = 2;
  if (T1[0] !== 1) throw new Error(a[0]);
});



function run(name: string, callback: Function, iteractions = 1000000) {
  try {
    const c = new Clock();
    for (let i = 0; i < iteractions; i++) {
      callback();
    }
    console.log(`${name}: ${c.readString()}`);
  } catch (e) {
    console.error(`${name}: `, e);
  }
}