import { describe, it, expect } from 'vitest';
import { min } from '../../src/rules/min.js';

describe('min', () => {
  it('passes when value is at or above the minimum', () => {
    expect(min(18, 18)).toBe(true);
    expect(min(18, 20)).toBe(true);
  });

  it('fails when value is below the minimum', () => {
    expect(min(18, 17)).not.toBe(true);
  });
});
