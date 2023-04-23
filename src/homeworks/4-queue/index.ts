import { SimpleQueue,SimpleDequeue } from 'utils/structures/queue';
import { TypedArrayStack } from 'utils/structures/stack';

export function renderHM4() {
  const queue = new SimpleQueue()
  queue.push(10);
  queue.push(11);
  queue.push(12);
  
  console.log(queue.head);  // 10
  
  console.log(queue.pop()); // 10
  
  console.log(queue.head);  // 11
  
  console.log(queue.pop()); // 11
  console.log(queue.pop()); // 12
  console.log(queue.pop()); // Exception

  const dequeue = new SimpleDequeue()
  dequeue.push(10);
  dequeue.unshift(11);
  dequeue.push(12);
  
  console.log(dequeue.pop());   // 12
  console.log(dequeue.shift()); // 11
  console.log(dequeue.pop());   // 10
  console.log(dequeue.pop());   // Exception

  const stack = new TypedArrayStack(Int32Array, 10);
   
  stack.push(10);
  stack.push(11);
  stack.push(12);
  
  console.log(stack.head);  // 12
  
  console.log(stack.pop()); // 12
  
  console.log(stack.head);  // 11
  
  console.log(stack.pop()); // 11
  console.log(stack.pop()); // 10
  console.log(stack.pop()); // Exception
}