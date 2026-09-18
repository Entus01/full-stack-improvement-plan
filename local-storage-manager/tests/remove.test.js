import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { save } from '../src/save.js';
import { remove } from '../src/remove.js';

describe('remove', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('removes an existing key (AC-5)', () => {
    save('userPreferences', { theme: 'dark' });
    const result = remove('userPreferences');
    expect(result).toEqual({ success: true, error: null });
    expect(localStorage.getItem('userPreferences')).toBe(null);
  });

  it('does not affect other stored entries (AC-5)', () => {
    save('a', { v: 1 });
    save('b', { v: 2 });
    remove('a');
    expect(localStorage.getItem('a')).toBe(null);
    expect(JSON.parse(localStorage.getItem('b'))).toEqual({ v: 2 });
  });

  it('returns an error for a key with no stored data (AC-6, DEC-006)', () => {
    const result = remove('neverStored');
    expect(result.success).toBe(false);
    expect(typeof result.error).toBe('string');
  });

  it('rejects an invalid key (FR-8)', () => {
    const result = remove('');
    expect(result.success).toBe(false);
  });

  it('reports a storage failure predictably (AC-12)', () => {
    save('key', { v: 1 });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    const result = remove('key');
    expect(result.success).toBe(false);
  });
});
