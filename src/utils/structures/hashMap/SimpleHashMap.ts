import { Vector } from '../array/Vector';

export class SimpleHashMap {
  #values: Vector;
  #size: number;

  constructor(size: number) {
    this.#values = new Vector(Uint8Array, { capacity: size })
    this.#size = size;
  }

  set(key: object | number | string, value: number) {
    const index = this.#getHash(key)
    this.#values.set(index, value)
  }

  get(key: object | number | string) {
    const index = this.#getHash(key)
    return this.#values.get(index)
  }

  has(key: object | number | string) {
    const index = this.#getHash(key)
    return this.#values.get(index) !== 0
  }

  delete(key: object | number | string) {
    const index = this.#getHash(key);
    const deletedVal = this.#values.get(index);
    this.#values.set(index, 0);
    return deletedVal
  }

  #getHash(key: object | number | string): number {
    if (key == null) {
      throw new Error('key is null')
    }

    if (typeof key === 'object') {
      const strKey = Object.keys(key).sort().join('');

      let hash = 0;
      for (const el of strKey) {
        hash = ((hash << 5) - hash) + el.charCodeAt(0);
        hash |= 0;
      }

      return hash % this.#size;
    }

    if (typeof key === 'string') {
      let hash = 0;
      for (const el of key) {
        hash = ((hash << 5) - hash) + el.charCodeAt(0);
        hash |= 0;
      }

      return hash % this.#size;
    }

    return key % this.#size;
  }
}

