import { SimpleDequeue, SimpleQueue } from 'utils/structures/queue';
import { TypedArrayStack } from 'utils/structures/stack';

export function renderHM4() {
  const queue = new SimpleQueue();
  queue.push(10);
  queue.push(11);
  queue.push(12);

  const dequeue = new SimpleDequeue()
  dequeue.push(10);
  dequeue.unshift(11);
  dequeue.push(12);


  const stack = new TypedArrayStack(Int32Array, 10);

  stack.push(10);
  stack.push(11);
  stack.push(12);

  return document.createElement('div');
}
