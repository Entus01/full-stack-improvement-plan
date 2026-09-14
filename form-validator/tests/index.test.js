import { describe, it, expect } from 'vitest';
import { validateField, validateForm } from '../src/index.js';

describe('public API', () => {
  const rulesConfig = {
    age: { type: 'number', rules: { required: true, min: 18, max: 99 } },
    plan: { type: 'radio', rules: { required: true, oneOf: ['basic', 'pro'] } },
    agree: { type: 'checkbox', rules: { required: true } },
  };

  it('validateField and validateForm agree on a single field result', () => {
    const values = { age: 15, plan: 'basic', agree: true };

    const fieldResult = validateField('age', values, rulesConfig);
    const formResult = validateForm(values, rulesConfig);

    expect(fieldResult).toEqual(formResult.fields.age);
  });

  it('reports failures across multiple field types at once', () => {
    const values = { age: 200, plan: 'enterprise', agree: false };
    const result = validateForm(values, rulesConfig);

    expect(result.valid).toBe(false);
    expect(result.fields.age.errors[0].rule).toBe('max');
    expect(result.fields.plan.errors[0].rule).toBe('oneOf');
    expect(result.fields.agree.errors[0].rule).toBe('required');
  });
});
