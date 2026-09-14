import { describe, it, expect } from 'vitest';
import { evaluateField } from '../src/evaluateField.js';

describe('evaluateField', () => {
  it('returns valid: true when all rules pass', () => {
    const rulesConfig = { name: { type: 'text', rules: { required: true } } };
    expect(evaluateField('name', { name: 'Miguel' }, rulesConfig)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it('reports every failing rule, not just the first (DEC-005)', () => {
    const rulesConfig = {
      password: { type: 'password', rules: { minLength: 8, pattern: /\d/ } },
    };
    const result = evaluateField('password', { password: 'abc' }, rulesConfig);

    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.rule).sort()).toEqual(['minLength', 'pattern']);
  });

  it('skips non-required rules on an empty value (DEC-006)', () => {
    const rulesConfig = {
      nickname: { type: 'text', rules: { minLength: 3, pattern: /^[a-z]+$/ } },
    };
    expect(evaluateField('nickname', { nickname: '' }, rulesConfig)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it('still evaluates required on an empty value even though other rules are skipped', () => {
    const rulesConfig = {
      nickname: { type: 'text', rules: { required: true, minLength: 3 } },
    };
    const result = evaluateField('nickname', { nickname: '' }, rulesConfig);
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.rule)).toEqual(['required']);
  });

  it('always runs a custom validator, even on an empty value', () => {
    const rulesConfig = {
      referral: {
        type: 'text',
        rules: { custom: (value) => (value === '' ? 'Custom failure on empty' : true) },
      },
    };
    const result = evaluateField('referral', { referral: '' }, rulesConfig);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual([{ rule: 'custom', message: 'Custom failure on empty' }]);
  });

  it('evaluates a cross-field rule using the full values object', () => {
    const rulesConfig = {
      password: { type: 'password', rules: { required: true } },
      confirmPassword: { type: 'password', rules: { equals: 'password' } },
    };
    const values = { password: 'secret123', confirmPassword: 'wrong' };
    const result = evaluateField('confirmPassword', values, rulesConfig);
    expect(result.valid).toBe(false);
    expect(result.errors[0].rule).toBe('equals');
  });

  it('treats checkbox required as requiring true (DEC-007)', () => {
    const rulesConfig = { agree: { type: 'checkbox', rules: { required: true } } };
    expect(evaluateField('agree', { agree: false }, rulesConfig).valid).toBe(false);
    expect(evaluateField('agree', { agree: true }, rulesConfig).valid).toBe(true);
  });
});
