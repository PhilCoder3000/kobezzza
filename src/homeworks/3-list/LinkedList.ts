class Link {
  next: Link | null = null;
  prev: Link | null = null;
  value: string | null = null;

  constructor(value: string) {
    this.value = value;
  }

  displayLink() {
    console.log('Value: ' + this.value + '\n');
  }
}

class LinkList {
  first: Link | null = null;
  last: Link | null = null;

  isEmpty() {
    return this.first === null;
  }

  insertFirst(value: string) {
    const newFirst = new Link(value);
    if (this.first === null) {
      this.first = newFirst;
      this.last = newFirst;
    } else {
      newFirst.next = this.first;
      this.first.prev = newFirst;
      this.first = newFirst;
    }
  }

  insertLast(value: string) {
    const newLast = new Link(value);
    if (this.last) {
      this.last.next = newLast;
      this.last = newLast;
    }
  }

  insertAfter(link: string, value: string) {
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

  displayList() {
    let current = this.first;
    while (current) {
      current.displayLink();
      current = current.next;
    }
  }

  find(value: string) {
    let current = this.first;
    if (current) {
      while (current?.value !== value) {
        current = current?.next;
        if (!current) {
          return -1;
        }
      }
      return current;
    }
    return -1;
  }

  delete(value: string) {
    const current = this.find(value);
    if (current !== -1) {
      const prev = current.prev;
      const next = current.next;
      if (prev) {
        prev.next = next || null;
      }
      if (next) {
        next.prev = prev || null;
      }
    }
    return -1;
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
