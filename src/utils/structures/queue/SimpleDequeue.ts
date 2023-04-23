import {
  LinkedList,
  LinkedListNode,
  LinkedListValue,
} from '../list/LinkedList';

export class SimpleDequeue {
  data: LinkedList;

  constructor() {
    this.data = new LinkedList();
  }

  push(value: LinkedListValue) {
    this.data.insertLast(value);
  }

  pop() {
    return this.data.deleteLast();
  }

  unshift(value: LinkedListValue) {
    this.data.insertFirst(value);
  }

  shift() {
    return this.data.deleteFirst();
  }

  peekFront() {
    return this.data.first;
  }

  isEmpty() {
    return this.data.first == null;
  }

  get head(): LinkedListNode | null {
    return this.data.first;
  }

  get tail(): LinkedListNode | null {
    return this.data.last;
  }
}
