// {done: false, value: Promise(e)}
export function on(el: HTMLElement, event: keyof HTMLElementEventMap) {
  let cb: Function | null;
  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return {
        done: false,
        value: new Promise((resolve) => {
          cb = resolve;
        }),
      };
    },
  };
}

(async () => {
  for await (const e of on(document.createElement('div'), 'click')) {
    console.log(e);
  }
})();

// Promise({done: false, value: e})
export function asyncOn(el: HTMLElement, event: keyof HTMLElementEventMap) {
  let cb: Function | null;
  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return new Promise((resolve) => {
        cb = (arg: unknown) => {
          resolve({
            done: false,
            value: arg
          })
        }
      });
    },
  };
}

(async () => {
  for await (const e of on(document.createElement('div'), 'click')) {
    console.log(e);
  }
})();

// Promise({done: false, value: e})
export async function* on2(el: HTMLElement, event: keyof HTMLElementEventMap) {
  let cb: Function | null;
  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  while (true) {
    await new Promise((resolve) => {
      cb = resolve;
    })
  }
}

fetch('https://...').then(async (res) => {
  // @ts-ignore
  for await (const chunk of res.body) {
    
  }
})