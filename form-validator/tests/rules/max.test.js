import { describe, it, expect } from 'vitest';
import { max } from '../../src/rules/max.js';

describe('max', () => {
  it('passes when value is at or below the maximum', () => {
    expect(max(100, 100)).toBe(true);
    expect(max(100, 50)).toBe(true);
  });

  it('fails when value exceeds the maximum', () => {
    expect(max(100, 101)).not.toBe(true);
  });
});
