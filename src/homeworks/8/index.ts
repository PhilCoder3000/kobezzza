import { bisecLeft, bisecRight } from './bisecLeft';

export function renderHM8() {
  console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7), ' === 6');
  console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7), '=== 9')
  
  return document.createElement('div')
}