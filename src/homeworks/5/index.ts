import { collapseRecursion } from './collapse';

export function renderHM5() {
  const obj = {
    a: {
      b: [1, 2],
      d: ['f', 'g'],
      '': { c: 2 },
      y: { q: 12 },
      '5': {
        r: {
          b: 7,
        },
      },
    },
  };

  // { "a.5.r.b": 7, "a.b.0": 1, "a.b.1": 2, "a.d.0": "f", "a.d.1": "g", "a..c": 2, "a.y.q": 12}
  console.log(collapseRecursion(obj));
  return document.createElement('div');
}
