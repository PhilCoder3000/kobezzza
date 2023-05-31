export function renderHM11() {
  console.log(isDigit('123'), ' is true');
  console.log(isDigit('Ⅻ'), ' is true');

  const root = document.createElement('div');
  for (const el of unicodeIterator('qw123👏123🧑🏿‍❤️‍🧑')) {
    const p = document.createElement('p')
    p.textContent = el;
    root.appendChild(p);
  }
  return root;
}

const romanNumbers = [8555];

function isDigit(num: string): boolean {
  if (isNaN(Number(num))) {
    const romeStr: number[] = []
    for (const el of num) {
      romeStr.push(el.codePointAt(0) || -1)
    }
    if (romeStr.every(el => romanNumbers.includes(el))) {
      return true;
    }
  }
  const str = Number(num).toString();
  if (str === num) {
    return true;
  }
  if (num.startsWith('0')) {
    let buffer = '';
    while (num.startsWith('0')) {
      num = num.slice(1);
      buffer += '0';
    }
    if (buffer + str === num) {
      return true;
    }
  }
  return false;
}

function* unicodeIterator(str: string) {
  let currentIndex = 0;

  while (currentIndex < str.length) {
    if (currentIndex >= str.length) {
      return;
    }
    let symbol = str[currentIndex];
    const code = str.charCodeAt(currentIndex);
    if (code >= 0xd800 && code <= 0xdbff) {
      symbol += str[currentIndex++];
      yield symbol;
    } else {
      yield symbol;
    }
    currentIndex++;
  }
}
