import { describe, it, expect } from 'vitest';
import { validateKey } from '../src/validateKey.js';

describe('validateKey', () => {
  it('returns null for a valid non-empty string key', () => {
    expect(validateKey('userPreferences')).toBe(null);
  });

  it('returns a descriptive error for an empty string', () => {
    expect(validateKey('')).not.toBe(null);
    expect(typeof validateKey('')).toBe('string');
  });

  it('returns a descriptive error for non-string keys', () => {
    expect(validateKey(undefined)).not.toBe(null);
    expect(validateKey(null)).not.toBe(null);
    expect(validateKey(42)).not.toBe(null);
    expect(validateKey({})).not.toBe(null);
  });
});
