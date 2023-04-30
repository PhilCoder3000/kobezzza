import { collapseRecursion, collapseRecursion2, collapseStack } from './collapse';
import { isValid } from './isValid';

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
  console.log('rec',collapseRecursion(obj));
  console.log('rec2',collapseRecursion2(obj));
  console.log('stack',collapseStack(obj));

  console.log(isValid('(hello{world} and [me])'));  // true
  console.log(isValid('(hello{world)} and [me])')); // false
  console.log(isValid(')'));                        // false
  
  return document.createElement('div');
}
