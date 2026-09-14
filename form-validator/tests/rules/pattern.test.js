import { describe, it, expect } from 'vitest';
import { pattern } from '../../src/rules/pattern.js';

describe('pattern', () => {
  it('passes when the value matches the pattern', () => {
    expect(pattern(/^\d+$/, '12345')).toBe(true);
  });

  it('fails when the value does not match the pattern', () => {
    expect(pattern(/^\d+$/, '123a5')).not.toBe(true);
  });
});
