export function isPrimitive(arg: unknown) {
  return (typeof arg !== 'object' && typeof arg !== 'function') || arg === null
}
