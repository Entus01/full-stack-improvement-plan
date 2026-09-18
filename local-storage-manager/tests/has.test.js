import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { save } from '../src/save.js';
import { remove } from '../src/remove.js';
import { has } from '../src/has.js';

describe('has', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns exists:true for a key with stored data (AC-8)', () => {
    save('userPreferences', { theme: 'dark' });
    expect(has('userPreferences')).toEqual({ success: true, exists: true, error: null });
  });

  it('returns exists:false for a key with no stored data (AC-8)', () => {
    expect(has('unknownKey')).toEqual({ success: true, exists: false, error: null });
  });

  it('returns exists:false after the key has been removed', () => {
    save('userPreferences', { theme: 'dark' });
    remove('userPreferences');
    expect(has('userPreferences')).toEqual({ success: true, exists: false, error: null });
  });

  it('rejects an invalid key (FR-8)', () => {
    const result = has('');
    expect(result.success).toBe(false);
    expect(result.exists).toBe(false);
  });

  it('reports a storage failure predictably (AC-12)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    const result = has('anyKey');
    expect(result.success).toBe(false);
    expect(result.exists).toBe(false);
  });
});
