import { ImageMaker } from './ImageMaker';
import { decode, encode } from './bit-code';

export function renderHM2() {
  const imageMaker = new ImageMaker();
  imageMaker.addInput();
  imageMaker.addInverseBtn();
  imageMaker.addGreyScaleBtn();
  imageMaker.addYellowToBlue();
  imageMaker.addBlink();

  const schema: Array<[number, 'number' | 'boolean' | 'ascii']> = [
    [3, 'number'],
    [2, 'number'],
    [1, 'boolean'],
    [1, 'boolean'],
    // [16, 'ascii'],
  ];

  const data = encode([2, 3, true, false], schema);
  // const data = encode([2, 3, true, false, 'ab'], schema);
  console.log(data);
  console.log(decode(data, schema));

  return imageMaker.render();
}
