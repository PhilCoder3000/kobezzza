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
      const uint16Array = new Uint16Array(value.length);
      for (let i = 0; i < value.length; i++) {
        uint16Array[i] = value.charCodeAt(i);
      }
      this.value = uint16Array.buffer;
    }
    if (this.format === 'u16') {
      if (typeof value !== 'number') {
        throw new Error('Wrong value format');
      }
      if (this.maxLength && value > this.maxLength) {
        throw new Error('Value`s length is over max length');
      }
      this.view.setUint16(0, value);
    }
  }

  get() {
    const textDecoder = new TextDecoder(this.format);
    this.view.getUint16(0); // number
    return textDecoder.decode(this.value);
  }
}

class Structure {
  data: { [key: string]: Item } = {};

  constructor(array: [string, Format, number][]) {
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
      this.data[key].get();
    } else {
      throw new Error('Structure does not have this key');
    }
  }
}
