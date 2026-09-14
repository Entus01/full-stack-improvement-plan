import { describe, it, expect } from 'vitest';
import { validateForm } from '../src/validateForm.js';

describe('validateForm', () => {
  it('matches the SPEC worked example', () => {
    const rulesConfig = {
      name: { type: 'text', rules: { required: true } },
      email: { type: 'email', rules: { required: true } },
      password: { type: 'password', rules: { required: true, minLength: 8 } },
    };
    const values = { name: 'Miguel', email: 'miguel@example.com', password: '123' };

    const result = validateForm(values, rulesConfig);

    expect(result.valid).toBe(false);
    expect(result.fields.name.valid).toBe(true);
    expect(result.fields.email.valid).toBe(true);
    expect(result.fields.password.valid).toBe(false);
    expect(result.fields.password.errors).toEqual([
      { rule: 'minLength', message: 'Must be at least 8 characters long.' },
    ]);
  });

  it('returns valid: true when every field passes', () => {
    const rulesConfig = { name: { type: 'text', rules: { required: true } } };
    expect(validateForm({ name: 'Miguel' }, rulesConfig).valid).toBe(true);
  });

  it('validates cross-field rules against the full values object', () => {
    const rulesConfig = {
      password: { type: 'password', rules: { required: true, minLength: 8 } },
      confirmPassword: { type: 'password', rules: { required: true, equals: 'password' } },
    };
    const result = validateForm(
      { password: 'secret123', confirmPassword: 'secret123' },
      rulesConfig
    );
    expect(result.valid).toBe(true);
  });

  it('validates file fields against metadata', () => {
    const rulesConfig = {
      resume: {
        type: 'file',
        rules: { required: true, fileType: ['application/pdf'], maxFileSize: 5_000_000 },
      },
    };
    const validResult = validateForm(
      { resume: { name: 'resume.pdf', type: 'application/pdf', size: 1000 } },
      rulesConfig
    );
    expect(validResult.valid).toBe(true);

    const invalidResult = validateForm(
      { resume: { name: 'resume.png', type: 'image/png', size: 1000 } },
      rulesConfig
    );
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.fields.resume.errors[0].rule).toBe('fileType');
  });

  it('applies a custom validator alongside built-in rules', () => {
    const rulesConfig = {
      referralCode: {
        type: 'text',
        rules: {
          custom: (value) => (value?.startsWith('REF-') ? true : 'Must start with REF-'),
        },
      },
    };
    expect(validateForm({ referralCode: 'REF-123' }, rulesConfig).valid).toBe(true);
    expect(validateForm({ referralCode: 'XYZ-123' }, rulesConfig).valid).toBe(false);
  });

  it('throws for an invalid rules configuration (DEC-008)', () => {
    expect(() =>
      validateForm({}, { field: { type: 'unsupported-type', rules: {} } })
    ).toThrow(TypeError);
  });
});
