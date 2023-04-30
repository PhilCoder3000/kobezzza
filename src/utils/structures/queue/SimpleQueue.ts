import { LinkedList, LinkedListValue } from '../list/LinkedList';

export class SimpleQueue {
  #data: LinkedList;

  constructor() {
    this.#data = new LinkedList();
  }

  push(value: LinkedListValue) {
    this.#data.insertFirst(value);
  }
  
  pop() {
    const deletedItem = this.#data.deleteLast();
    return deletedItem
  }

  peekFirst() {
    return this.#data.first;
  }

  peekLast() {
    return this.#data.last;
  }

  isEmpty() {
    return this.#data.first == null;
  }

  displayQueue() {
    let current = this.peekFirst()
    let strQueue = '';
    while (current) {
      strQueue += '>' + current.value;
      current = current.next
    }
    console.log(strQueue)
  }

  *[Symbol.iterator]() {
    let current = this.#data.first

    while (current) {
      yield current.value
      current = current.next
    }
  }
 }
