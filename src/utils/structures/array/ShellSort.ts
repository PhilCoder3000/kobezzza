export class ShellSort {
  sort(array: TypedArray) {
    let inner = 0;
    let outer = 0;
    let h = 1;

    while (h <= array.length / 3) {
      h = h * 3 + 1;
    }
    while (h > 0) {
      for (outer = h; outer < array.length; outer++) {
        const el = array.at(outer);
        inner = outer;
        if (!el) {
          return;
        }

        while (inner > h - 1 && Number(array.at(inner - h)) >= el) {
          array[inner] = array.at(inner - h)!;
          inner -= h;
        }

        array[inner] = el;
      }

      h = (h - 1) / 3;
    }
  }
}
