import { mapSeq } from './mapSeq';

export function renderHM15() {
  // const iter = enumerate(take(filter(random(0, 50), (x) => x > 500), 10))
  // for (const el of iter) {
  //   console.log('iter', el);
  // }

  // const symbolRange = new Range('a', 'f');
  // console.log(Array.from(symbolRange))

  // const numberRange = new Range(-5, 1);

  // console.log(Array.from(numberRange.reverse()));

  // console.log(...seq<string | number>([1, 2], new Set([3, 4]), 'bla'));
  // console.log(...zip<string | number>([1, 2], new Set([3, 4]), 'bl'));
  console.log(...mapSeq([1, 2, 3], [(el: number) => el * 2, (el: number) => el - 1]));
  return document.createElement('div');
}