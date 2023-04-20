type Value = string | number

class Link {
  next: Link | null = null;
  prev: Link | null = null;
  value: Value | null = null;

  constructor(value: Value) {
    this.value = value;
  }

  displayLink() {
    console.log('Value: ' + this.value + '\n');
  }
}

export class LinkList {
  first: Link | null = null;
  last: Link | null = null;

  isEmpty() {
    return this.first === null;
  }

  insertFirst(value: Value) {
    const newFirst = new Link(value);
    if (this.first !== null) {
      this.first = newFirst;
      this.last = newFirst;
    } else {
      this.first = newFirst;
      this.last = newFirst;
    }
  }

  insertLast(value: Value) {
    const newLast = new Link(value);
    if (this.last !== null) {
      this.last.next = newLast;
      this.last = newLast;
    } else {
      this.last = newLast;
      this.first = newLast;
    }
  }

  insertAfter(link: string, value: Value) {
    const newLink = new Link(value);
    const element = this.find(link);
    if (element !== -1) {
      const next = element.next;
      if (next) {
        next.prev = newLink;
        newLink.next = next;
      }
      element.next = newLink;
      newLink.prev = element;
    }
  }

  deleteFirst() {
    if (this.first !== null) {
      const second = this.first.next;
      const first = this.first;
      if (second) {
        second.prev = null;
        this.first = second;
      } else {
        this.first = null;
      }
      return first;
    }
  }

  deleteLast() {
    if (this.last !== null) {
      const last = this.last;
      const prev = last.prev;
      if (prev) {
        this.last = prev
      } else {
        this.last = null;
      }
      return last
    }
    throw new Error("Delete error")
  }

  displayList() {
    let current = this.first;
    while (current) {
      current.displayLink();
      current = current.next;
    }
  }

  find(arg: Value | Link): Link | -1 {
    if (arg instanceof Link) {
      let current = this.first
      while (current) {
        if (arg === current) {
          return current
        }
        current = current.next
      }
    } else {
      let current = this.first;
      if (current) {
        while (current?.value !== arg) {
          current = current?.next;
          if (!current) {
            return -1;
          }
        }
        return current;
      }
    }
    return -1;
  }

  delete(link: Link) {
    const next = link.next;
    const prev = link.prev;
    if (prev && next) {
      next.prev = prev
      prev.next = next
    } else if (next) {
      next.prev = null
    } else if (prev) {
      prev.next = null
    }
  }
}

class ListIterator {
  list: LinkList;

  constructor(list: LinkList) {
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

type Format = 'utf16' | 'u16';

class Item {
  value: ArrayBuffer;
  format: Format;
  maxLength: number | null;
  view: DataView;

  constructor(format: Format, maxLength?: number) {
    this.format = format;
    this.maxLength = maxLength || null;

    this.value = new ArrayBuffer(maxLength || 16);
    this.view = new DataView(this.value);
  }

  set(value: unknown) {
    if (this.format === 'utf16') {
      if (typeof value !== 'string') {
        throw new Error('Wrong value format');
      }
      if (this.maxLength && value.length > this.maxLength) {
        throw new Error('Value`s length is over max length');
      }
      const uint16Array = new Uint16Array(value.length)
      for (let i = 0; i < value.length; i++) {
        uint16Array[i] = value.charCodeAt(i);
      }
      this.value = uint16Array.buffer
    }
    if (this.format === 'u16') {
      if (typeof value !== 'number') {
        throw new Error('Wrong value format');
      }
      if (this.maxLength && value > this.maxLength) {
        throw new Error('Value`s length is over max length');
      }
      this.view.setUint16(0, value)
    }
  }

  get() {
    const textDecoder = new TextDecoder(this.format)
    this.view.getUint16(0); // number
    return textDecoder.decode(this.value);
  }
}

class Structure {
  data: { [key: string]: Item; } = {};

  constructor(array: [string, Format, number][]) {
    array.forEach((current) => {
      const key = current[0];
      const format = current[1];
      const length = current[2];

      this.data[key] = new Item(format, length)
    });
  }

  set(key: string, value: unknown) {
    if (key in this.data) {
      this.data[key].set(value)
    } else {
      throw new Error('Structure does not have this key')
    }
  }

  get(key: string) {
    if (key in this.data) {
      this.data[key].get()
    } else {
      throw new Error('Structure does not have this key')
    }
  }
}
