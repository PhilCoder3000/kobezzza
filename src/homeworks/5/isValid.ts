const open = ['(', '[', '{']
const close = [')', ']', '}']

export function isValid(str: string): boolean {
  const stack = new Array();

  for (const el of str) {
    const isOpen = open.includes(el);
    if (isOpen) {
      stack.push(el)
      continue
    }
    
    const indexInClose = close.indexOf(el);
    if (indexInClose >= 0) {
      const indexInOpen = open.indexOf(stack.pop());
      if (indexInClose !== indexInOpen) {
        return false;
      }
    }    
  }
  return true
}