import { LinkList } from '../3-list/LinkedList';

class Queue {
  list = new LinkList()


  push(value: number) {
    this.list.insertLast(value)
  }

  pop() {
    if (this.list.last) {
      return this.list.delete(this.list.last)
    } else {
      throw new Error('List is empty')
    }
  }
}