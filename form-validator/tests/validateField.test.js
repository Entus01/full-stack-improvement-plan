import { describe, it, expect } from 'vitest';
import { validateField } from '../src/validateField.js';

const rulesConfig = {
  email: { type: 'email', rules: { required: true, pattern: /^\S+@\S+\.\S+$/ } },
};

describe('validateField', () => {
  it('validates a declared field', () => {
    expect(validateField('email', { email: 'a@b.com' }, rulesConfig)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it('throws for a field not declared in the configuration', () => {
    expect(() => validateField('phone', { phone: '123' }, rulesConfig)).toThrow(TypeError);
  });

  it('throws when the configuration itself is invalid (DEC-008)', () => {
    const badConfig = { email: { type: 'not-a-type', rules: {} } };
    expect(() => validateField('email', {}, badConfig)).toThrow(TypeError);
  });
});
