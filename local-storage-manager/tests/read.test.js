import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { save } from '../src/save.js';
import { read } from '../src/read.js';

describe('read', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('retrieves a previously saved value (AC-3)', () => {
    save('userPreferences', { theme: 'light', language: 'en' });
    const result = read('userPreferences');
    expect(result).toEqual({
      success: true,
      value: { theme: 'light', language: 'en' },
      error: null,
    });
  });

  it('returns success:true with value:null for a missing key, not an error (AC-4)', () => {
    const result = read('unknownKey');
    expect(result).toEqual({ success: true, value: null, error: null });
  });

  it('rejects an invalid key (FR-8)', () => {
    const result = read('');
    expect(result.success).toBe(false);
    expect(result.value).toBe(null);
  });

  it('reports corrupted (non-JSON) stored data as a failure, not a crash', () => {
    localStorage.setItem('corrupted', 'not valid json{{{');
    const result = read('corrupted');
    expect(result.success).toBe(false);
    expect(result.value).toBe(null);
    expect(typeof result.error).toBe('string');
  });

  it('reports a storage failure predictably (AC-12)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    const result = read('anyKey');
    expect(result.success).toBe(false);
    expect(result.value).toBe(null);
  });
});
