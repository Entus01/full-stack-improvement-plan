import { describe, it, expect } from 'vitest';
import { validateInput } from '../src/validateInput.js';

describe('validateInput', () => {
  it('does not throw for an array of plain objects', () => {
    expect(() => validateInput([{ id: 1 }, { id: 2 }])).not.toThrow();
  });

  it('does not throw for an empty array', () => {
    expect(() => validateInput([])).not.toThrow();
  });

  it('throws when input is not an array', () => {
    expect(() => validateInput({})).toThrow(TypeError);
    expect(() => validateInput('not an array')).toThrow(TypeError);
    expect(() => validateInput(null)).toThrow(TypeError);
    expect(() => validateInput(undefined)).toThrow(TypeError);
  });

  it('throws when the array contains a non-object item', () => {
    expect(() => validateInput([{ id: 1 }, 'not an object'])).toThrow(TypeError);
  });

  it('throws when the array contains null', () => {
    expect(() => validateInput([{ id: 1 }, null])).toThrow(TypeError);
  });

  it('throws when the array contains a nested array', () => {
    expect(() => validateInput([{ id: 1 }, [1, 2, 3]])).toThrow(TypeError);
  });

  it('includes the offending index in the error message', () => {
    expect(() => validateInput([{ id: 1 }, 42])).toThrow(/index 1/);
  });
});
