import { describe, it, expect } from 'vitest';
import { minLength } from '../../src/rules/minLength.js';

describe('minLength', () => {
  it('passes when length is at or above the minimum', () => {
    expect(minLength(3, 'abc')).toBe(true);
    expect(minLength(3, 'abcd')).toBe(true);
  });

  it('fails when length is below the minimum', () => {
    expect(minLength(3, 'ab')).not.toBe(true);
  });
});
