import { LinkedList } from './LinkedList';

export class ListIterator {
  list: LinkedList;

  constructor(list: LinkedList) {
    this.list = list;
  }

  *[Symbol.iterator]() {
    let current = this.list.first;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}