import { enumerate } from './enumerate';
import { filter } from './filter';
import { random } from './random';
import { take } from './take';

export function renderHM15() {
  const iter = enumerate(take(filter(random(0, 50), (x) => x > 500), 10))
  for (const el of iter) {
    console.log('iter', el);
  }
  return document.createElement('div');
}