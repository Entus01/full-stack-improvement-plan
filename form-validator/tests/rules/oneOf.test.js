import { describe, it, expect } from 'vitest';
import { oneOf } from '../../src/rules/oneOf.js';

describe('oneOf', () => {
  it('passes when the value is among the allowed options', () => {
    expect(oneOf(['small', 'medium', 'large'], 'medium')).toBe(true);
  });

  it('fails when the value is not among the allowed options', () => {
    expect(oneOf(['small', 'medium', 'large'], 'huge')).not.toBe(true);
  });
});
