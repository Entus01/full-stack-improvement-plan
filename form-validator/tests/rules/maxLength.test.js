import { describe, it, expect } from 'vitest';
import { maxLength } from '../../src/rules/maxLength.js';

describe('maxLength', () => {
  it('passes when length is at or below the maximum', () => {
    expect(maxLength(3, 'abc')).toBe(true);
    expect(maxLength(3, 'ab')).toBe(true);
  });

  it('fails when length exceeds the maximum', () => {
    expect(maxLength(3, 'abcd')).not.toBe(true);
  });
});
