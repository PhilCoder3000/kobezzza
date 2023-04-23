import { LinkedList, LinkedListNode, LinkedListValue } from '../list/LinkedList';

export class SimpleQueue {
  data: LinkedList;
  head: LinkedListNode | null = null;

  constructor() {
    this.data = new LinkedList();
  }

  push(value: LinkedListValue) {
    this.data.insertLast(value);
    this.head = this.data.last
  }
  
  pop() {
    const deletedItem = this.data.deleteFirst();
    this.head = this.data.last
    return deletedItem
  }

  peekFront() {
    return this.data.first;
  }

  isEmpty() {
    return this.data.first == null;
  }
}
