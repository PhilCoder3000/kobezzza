import { SimpleBit } from 'utils/structures/bitwise/SimpleBit';

type AvailableValue = string | number | boolean;

type Schema = Array<[number, 'number' | 'boolean' | 'ascii']>;

export function encode(array: AvailableValue[], schema: Schema) {
  const length = schema.reduce((acc, [bitCount]) => acc + bitCount, 0) * 2;
  const buffer = new ArrayBuffer(Math.ceil(length));
  const view = new DataView(buffer);

  let byteOffset = 0;
  let bitOffset = 0;
  let currentByte = 0;

  for (let i = 0; i < schema.length; i++) {
    const [bitCount, valueType] = schema[i];
    const value = array[i];

    if (bitCount <= 8) {
      if (bitOffset + bitCount <= 8) {
        if (valueType === 'number') {
          currentByte |= Number(value) << bitOffset;
          bitOffset += bitCount;
        }
        if (valueType === 'boolean') {
          currentByte |= Number(value) << bitOffset;
          bitOffset += bitCount;
        }
      } else {
        view.setUint8(byteOffset, currentByte);
        currentByte = 0;
        bitOffset = 0;
        if (valueType === 'number') {
          currentByte = Number(value);
          bitOffset += bitCount;
        }
        if (valueType === 'boolean') {
          currentByte = Number(value);
          bitOffset += bitCount;
        }
      }
    } else {
      if (bitOffset > 0) {
        view.setUint8(byteOffset, currentByte);
        currentByte = 0;
        bitOffset = 0;
        byteOffset++;
      }
      if (valueType === 'ascii') {
        if (typeof value === 'string') {
          for (let i = 0; i < value.length; i++) {
            view.setUint8(byteOffset, value.charCodeAt(i));
            byteOffset++;
          }
        }
      }
    }
  }

  return buffer;
}

export function decode(array: ArrayBuffer, schema: Schema): Array<unknown> {
  const view = new DataView(array);
  let bitOffset = 0;
  let byteOffset = 0;
  const result: AvailableValue[] = [];
  const readBit = new SimpleBit(new Uint8Array(view.buffer));

  for (let i = 0; i < schema.length; i++) {
    const [bitCount, valueType] = schema[i];
    if (bitCount <= 8) {
      if (bitOffset + bitCount > 8) {
        bitOffset = 0;
        byteOffset++;
      }

      let bitIndex = bitOffset;
      const writeByte = new SimpleBit(new Uint8Array(2));

      while (bitIndex < bitOffset + bitCount) {
        const bit = readBit.get(byteOffset, bitIndex);
        writeByte.set(0, bitIndex, bit);
        bitIndex++;
      }

      bitOffset += bitIndex;

      if (valueType === 'number') {
        result.push(writeByte.getByte(0).toFixed(10));
      }
      if (valueType === 'boolean') {
        result.push(Boolean(writeByte.getByte(0)));
      }
    }
  }
  return result;
}
