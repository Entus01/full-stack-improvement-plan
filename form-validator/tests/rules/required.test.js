import { describe, it, expect } from 'vitest';
import { required } from '../../src/rules/required.js';

describe('required', () => {
  it('passes when ruleArg is false, regardless of value', () => {
    expect(required(false, undefined)).toBe(true);
    expect(required(false, '')).toBe(true);
  });

  it('fails for undefined, null, and empty string when required', () => {
    expect(required(true, undefined)).not.toBe(true);
    expect(required(true, null)).not.toBe(true);
    expect(required(true, '')).not.toBe(true);
  });

  it('passes for a present value when required', () => {
    expect(required(true, 'value')).toBe(true);
    expect(required(true, 0)).toBe(true);
    expect(required(true, false)).toBe(true);
  });
});
