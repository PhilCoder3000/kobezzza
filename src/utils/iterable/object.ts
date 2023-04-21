export const uniqueObjectName = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    const keys = Object.keys(this)

    let cursor = 0;

    return {
      next: () => {
        const currentCursor = cursor;
        cursor++;
        return {
          value: this[keys[currentCursor]],
          done: currentCursor >= keys.length,
        }
      }
    }
  }
};

for (const el of uniqueObjectName) {
  console.log(el);
}
