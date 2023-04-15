type AvailableValue = string | number | boolean;

type Schema = [number, 'number' | 'boolean' | 'ascii'][];

export function encode(array: AvailableValue[], schema: Schema) {
  const buffer = new ArrayBuffer(Math.ceil(array.length))
  const view = new DataView(buffer);

  let byteOffset = 0;
  let bitOffset = 0;
  let currentByte = 0;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (element) {
      currentByte |= (1 << bitOffset);
    }
    
    bitOffset++;

    if (bitOffset === 8) {
      view.setInt8(byteOffset, currentByte);
      byteOffset++;
      bitOffset = 0;
      currentByte = 0;
    }
  }

  if (bitOffset > 0) {
    view.setUint8(byteOffset, currentByte);
  }

  return buffer;
}
