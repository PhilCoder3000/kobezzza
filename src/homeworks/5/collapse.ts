type CollapseArg = Object | Array<unknown> | string | number;
type CollapseResult = Record<string, unknown> | string | number;

export function collapseRecursion(arg: CollapseArg): CollapseResult {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return arg;
  }

  if (Array.isArray(arg)) {
    return arg.reduce((acc, cur, ind) => {
      if (typeof arg === 'string' || typeof arg === 'number') {
        return {
          ...acc,
          [ind]: cur,
        };
      }
      return {
        ...acc,
        [ind]: collapseRecursion(cur),
      };
    }, {});
  }

  return Object.entries(arg).reduce((acc, [key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return {
        ...acc,
        [key]: value,
      };
    }
    const entries = Object.entries(collapseRecursion(value)).reduce(
      (a, [k, v]) => ({
        ...a,
        [`${key}.${k}`]: v,
      }),
      {},
    );
    return {
      ...acc,
      ...entries,
    };
  }, {});
}

export function collapseRecursion2(obj: object): CollapseResult {
  const result: Record<string, string | number> = {};

  function recurse(current: object, previousKey: string) {
    for (let key in current) {
      const value = current[key as keyof typeof current];
      const newKey = previousKey ? `${previousKey}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  recurse(obj, '');

  return result;
}

export function collapseStack(obj: CollapseArg): CollapseResult {
  const result: Record<string, string | number> = {};

  const stack = new Array();
  stack.push([obj, '']);

  while (stack.length !== 0) {
    const [current, prevKey] = stack.pop();

    for (const key in current) {
      const value = current[key];
      const newKey = prevKey ? `${prevKey}.${key}` : key;

      if (typeof value === 'string' || typeof value === 'number') {
        result[newKey] = value;
      } else {
        stack.push([value, newKey]);
      }
    }
  }

  return result;
}

// export function collapseQueue(obj: object): Record<string, string| number> {
//   const result: Record<string, string| number> = {}

//   const queue = new Array();
//   queue.unshift([obj, ''])

//   while(queue.length !== 0) {
//     const [current, prevKey] = queue.pop()
//     for (const key in current) {

//     }

//   }



//   return result
// }