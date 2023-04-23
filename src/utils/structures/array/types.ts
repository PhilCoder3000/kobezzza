type ArrayDataValue = number;

interface BaseArray {
  set(index: number, value: unknown): void;
  get(index: number): unknown;
  find(searchValue: unknown): number;
}
