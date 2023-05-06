export function bisecLeft(arr: number[], comparator: (el: number) => number) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const res = comparator(arr[mid]);
    if (res === 0) {
      result = mid;
    }
    if (res >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return result;
}

export function bisecRight(arr: number[], comparator: (el: number) => number) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const res = comparator(arr[mid]);
    if (res === 0) {
      result = mid;
    } 
    if (res > 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return result;
}
