type AvailableValue = string | number | boolean;

type Schema = Array<[number, 'number' | 'boolean' | 'ascii']>;

export function encode(array: AvailableValue[], schema: Schema) {
  const buffer = new ArrayBuffer(Math.ceil(array.length));
  const view = new DataView(buffer);

  let byteOffset = 0;
  let bitOffset = 0;
  let currentByte = 0;

  for (let i = 0; i < schema.length; i++) {
    const [bitCount, valueType] = schema[i];
    const value = array[i];

    if (typeof value === valueType) {
      if (bitCount === 16) {
        // view.setUint16(currentByte, 'ab')
        // byteOffset += 2;
      } else {
        if (bitOffset + bitCount >= 2 ** bitCount) {
          view.setInt8(byteOffset, currentByte);
          bitOffset = 0;
          currentByte = 0;
        } else {
          if (typeof value === 'number') {
            if (value >= 2 ** bitCount) {
              throw new Error(`Max value: ${2 ** bitCount}`);
            } else {
              currentByte |= value << bitOffset;
              bitOffset += bitCount;
            }
          }
        }
      }

      bitOffset += bitCount;
    } else {
      throw new Error(
        `Type of value: ${value} not equal scheme type ${valueType}`,
      );
    }
  }

  return buffer;
}

export function decode(array: ArrayBuffer, schema: Schema): Array<unknown> {
  return [];
}

class BitArray {
  buffer: ArrayBuffer;
  view: DataView;
  bitOffset: number;
  byteOffset: number;

  constructor() {
    this.buffer = new ArrayBuffer(1024);
    this.view = new DataView(this.buffer);
    this.bitOffset = 0;
    this.byteOffset = 0;
  }

  appendBits(value: number, numBits: number) {
    let remainingBits = numBits;
    while (remainingBits > 0) {
      if (this.bitOffset === 0) {
        this.view.setUint8(this.byteOffset, 0);
      }
      const bitsToWrite = Math.min(remainingBits, 8 - this.bitOffset);
      const shift = 8 - this.bitOffset - bitsToWrite;
      const mask = (1 << bitsToWrite) - 1;
      const shiftedValue = (value >> shift) & mask;
      this.view.setUint8(
        this.byteOffset,
        this.view.getUint8(this.byteOffset) | (shiftedValue << (8 - this.bitOffset - bitsToWrite))
      );
      this.bitOffset += bitsToWrite;
      remainingBits -= bitsToWrite;
      if (this.bitOffset === 8) {
        this.bitOffset = 0;
        this.byteOffset++;
      }
      if (this.byteOffset >= this.buffer.byteLength) {
        const oldBuffer = this.buffer;
        this.buffer = new ArrayBuffer(oldBuffer.byteLength * 2);
        new Uint8Array(this.buffer).set(new Uint8Array(oldBuffer));
        this.view = new DataView(this.buffer);
      }
    }
  }

  toBuffer() {
    return this.buffer.slice(0, this.byteOffset + (this.bitOffset > 0 ? 1 : 0));
  }
}

// function encode(data, schema) {
//   const bitArray = new BitArray();
//   for (let i = 0; i < schema.length; i++) {
//     const [size, type] = schema[i];
//     const value = data[i];
//     if (type === 'number') {
//       bitArray.appendBits(value, size);
//     } else if (type === 'boolean') {
//       bitArray.appendBits(value ? 1 : 0, size);
//     } else if (type === 'ascii') {
//       for (let j = 0; j < value.length; j++) {
//         const charCode = value.charCodeAt(j);
//         bitArray.appendBits(charCode, 8);
//       }
//     }
//   }
//   return bitArray.toBuffer();
// }