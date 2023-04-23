type Format = 'utf16' | 'u16';

class Item {
  value: ArrayBuffer;
  format: Format;
  maximum: number | null;
  view: DataView;

  constructor(format: Format, maximum?: number) {
    this.format = format;
    this.maximum = maximum || null;

    this.value = new ArrayBuffer(maximum || 2);
    this.view = new DataView(this.value);
  }

  set(value: unknown) {
    if (this.format === 'utf16') {
      if (typeof value !== 'string') {
        throw new Error('Wrong value format');
      }
      if (this.maximum && value.length > this.maximum) {
        throw new Error('Value`s length is over max length');
      }
      const encoder = new TextEncoder();
      this.value = encoder.encode(value);
    }
    if (this.format === 'u16') {
      if (typeof value !== 'number') {
        throw new Error('Wrong value format');
      }
      if (this.maximum && value > this.maximum) {
        throw new Error('Value`s length is over max length');
      }
      this.view.setUint16(0, value);
    }
  }

  get() {
    if (this.format === 'utf16') {
      const textDecoder = new TextDecoder();
      return textDecoder.decode(this.value);
    }
    if (this.format === 'u16') {
      return this.view.getUint16(0);
    }
    throw new Error('Format error')
  }
}

export class Structure {
  data: { [key: string]: Item } = {};

  constructor(array: ([string, Format, number] | [string, Format])[]) {
    array.forEach((current) => {
      const key = current[0];
      const format = current[1];
      const length = current[2];

      this.data[key] = new Item(format, length);
    });
  }

  set(key: string, value: unknown) {
    if (key in this.data) {
      this.data[key].set(value);
    } else {
      throw new Error('Structure does not have this key');
    }
  }

  get(key: string) {
    if (key in this.data) {
      return this.data[key].get();
    } else {
      throw new Error('Structure does not have this key');
    }
  }
}
