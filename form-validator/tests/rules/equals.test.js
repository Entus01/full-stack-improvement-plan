import { describe, it, expect } from 'vitest';
import { equals } from '../../src/rules/equals.js';

describe('equals', () => {
  it('passes when the value matches the target field', () => {
    expect(equals('password', 'secret123', { password: 'secret123' })).toBe(true);
  });

  it('fails when the value does not match the target field', () => {
    expect(equals('password', 'wrong', { password: 'secret123' })).not.toBe(true);
  });
});
