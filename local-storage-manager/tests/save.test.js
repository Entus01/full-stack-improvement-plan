import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { save } from '../src/save.js';

describe('save', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a new entry (AC-1)', () => {
    const result = save('userPreferences', { theme: 'dark', language: 'en' });
    expect(result).toEqual({ success: true, error: null });
    expect(localStorage.getItem('userPreferences')).toBe(
      JSON.stringify({ theme: 'dark', language: 'en' })
    );
  });

  it('overwrites an existing entry unconditionally (AC-2)', () => {
    save('userPreferences', { theme: 'dark', language: 'en' });
    const result = save('userPreferences', { theme: 'light', language: 'en' });
    expect(result).toEqual({ success: true, error: null });
    expect(JSON.parse(localStorage.getItem('userPreferences'))).toEqual({
      theme: 'light',
      language: 'en',
    });
  });

  it('rejects an invalid key (FR-8)', () => {
    const result = save('', { theme: 'dark' });
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });

  it('rejects null and undefined values (AC-9)', () => {
    expect(save('key', null).success).toBe(false);
    expect(save('key', undefined).success).toBe(false);
  });

  it('rejects a value with a circular reference (AC-10)', () => {
    const circular = {};
    circular.self = circular;
    const result = save('key', circular);
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });

  it('rejects a value containing a BigInt (AC-10)', () => {
    const result = save('key', { amount: 10n });
    expect(result.success).toBe(false);
  });

  it('reports a storage failure predictably (AC-12)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });
    const result = save('key', { a: 1 });
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });
});
