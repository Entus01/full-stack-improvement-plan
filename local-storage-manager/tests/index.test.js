import { describe, it, expect, beforeEach } from 'vitest';
import { save, read, remove, has } from '../src/index.js';

describe('public API — SPEC worked example', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reproduces the SPEC example sequence end-to-end', () => {
    expect(save('userPreferences', { theme: 'dark', language: 'en' })).toEqual({
      success: true,
      error: null,
    });

    expect(save('userPreferences', { theme: 'light', language: 'en' })).toEqual({
      success: true,
      error: null,
    });

    const rejected = save('userPreferences', null);
    expect(rejected.success).toBe(false);
    expect(typeof rejected.error).toBe('string');

    expect(read('userPreferences')).toEqual({
      success: true,
      value: { theme: 'light', language: 'en' },
      error: null,
    });

    expect(read('unknownKey')).toEqual({ success: true, value: null, error: null });

    expect(has('userPreferences')).toEqual({ success: true, exists: true, error: null });

    expect(remove('userPreferences')).toEqual({ success: true, error: null });

    const secondRemove = remove('userPreferences');
    expect(secondRemove).toEqual({ success: false, error: 'key not found' });
  });

  it('every operation returns a result shape matching its contract (AC-13)', () => {
    const saveResult = save('k', { v: 1 });
    expect(saveResult).toHaveProperty('success');
    expect(saveResult).toHaveProperty('error');

    const readResult = read('k');
    expect(readResult).toHaveProperty('success');
    expect(readResult).toHaveProperty('value');
    expect(readResult).toHaveProperty('error');

    const hasResult = has('k');
    expect(hasResult).toHaveProperty('success');
    expect(hasResult).toHaveProperty('exists');
    expect(hasResult).toHaveProperty('error');

    const removeResult = remove('k');
    expect(removeResult).toHaveProperty('success');
    expect(removeResult).toHaveProperty('error');
  });

  it('save then read round-trips structured data without loss (AC-7)', () => {
    const original = { list: [1, 2, 3], nested: { a: true, b: 'text' } };
    save('structured', original);
    const result = read('structured');
    expect(result.value).toEqual(original);
  });
});
