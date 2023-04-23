type CollapseArg = Object | Array<unknown> | string | number;
type CollapseResult = Record<string, unknown> | string | number;

export function collapseRecursion(arg: CollapseArg): CollapseResult {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return arg;
  }

  if (Array.isArray(arg)) {
    return arg.reduce(
      (acc, cur, ind) => ({
        ...acc,
        [ind]: collapseRecursion(cur),
      }),
      {},
    );
  }

  return Object.entries(arg).reduce((acc, [key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return {
        ...acc,
        [key]: value
      }
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

// export function collapseStack(arg: CollapseArg): CollapseResult {
//   Object.entries(arg).forEach(() => {})
// }
