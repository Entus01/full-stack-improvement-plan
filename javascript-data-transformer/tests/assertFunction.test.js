import { describe, it, expect } from 'vitest';
import { assertFunction } from '../src/assertFunction.js';

describe('assertFunction', () => {
  it('does not throw when given a function', () => {
    expect(() => assertFunction(() => {}, 'predicateFn')).not.toThrow();
  });

  it('throws a TypeError including the param name when not given a function', () => {
    expect(() => assertFunction('not a function', 'predicateFn')).toThrow(
      /predicateFn/
    );
    expect(() => assertFunction(undefined, 'comparatorFn')).toThrow(TypeError);
    expect(() => assertFunction(null, 'keyFn')).toThrow(TypeError);
    expect(() => assertFunction({}, 'predicateFn')).toThrow(TypeError);
  });
});
