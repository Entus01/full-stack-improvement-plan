import { describe, it, expect } from 'vitest';
import { isEmpty } from '../src/isEmpty.js';

describe('isEmpty', () => {
  it('treats undefined, null, and empty string as empty', () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
  });

  it('treats other falsy values as not empty', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
  });

  it('treats non-empty values as not empty', () => {
    expect(isEmpty('text')).toBe(false);
    expect(isEmpty(' ')).toBe(false);
    expect(isEmpty([])).toBe(false);
    expect(isEmpty({})).toBe(false);
  });
});
