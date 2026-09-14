export function assertFunction(fn, paramName) {
  if (typeof fn !== 'function') {
    throw new TypeError(`Expected ${paramName} to be a function, received ${typeof fn}.`);
  }
}
