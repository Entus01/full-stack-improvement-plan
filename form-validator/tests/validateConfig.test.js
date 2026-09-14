import { describe, it, expect } from 'vitest';
import { validateConfig } from '../src/validateConfig.js';

describe('validateConfig', () => {
  it('does not throw for a valid configuration', () => {
    expect(() =>
      validateConfig({
        name: { type: 'text', rules: { required: true } },
        confirmName: { type: 'text', rules: { equals: 'name' } },
        bio: { type: 'textarea', rules: { custom: () => true } },
      })
    ).not.toThrow();
  });

  it('throws for an unsupported field type', () => {
    expect(() =>
      validateConfig({ name: { type: 'phone-number', rules: {} } })
    ).toThrow(TypeError);
  });

  it('throws for an unsupported rule name without a custom fallback', () => {
    expect(() =>
      validateConfig({ name: { type: 'text', rules: { notARealRule: true } } })
    ).toThrow(TypeError);
  });

  it('does not throw for an unrecognized key when using custom', () => {
    expect(() =>
      validateConfig({ name: { type: 'text', rules: { custom: () => true } } })
    ).not.toThrow();
  });

  it('throws when an equals rule references a field not in the configuration', () => {
    expect(() =>
      validateConfig({
        confirmPassword: { type: 'password', rules: { equals: 'password' } },
      })
    ).toThrow(TypeError);
  });

  it('does not require a rules object at all', () => {
    expect(() => validateConfig({ name: { type: 'text' } })).not.toThrow();
  });
});
