export interface BaseBit {
  get(arrayIndex: number, bitIndex: number): number
  set(arrayIndex: number, bitIndex: number, newValue: 0 | 1): void
}