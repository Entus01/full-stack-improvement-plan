import { describe, it, expect, afterEach, vi } from 'vitest';
import { withStorage } from '../src/withStorage.js';

describe('withStorage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success and the operation result when it does not throw', () => {
    const result = withStorage(() => 42);
    expect(result).toEqual({ success: true, result: 42, error: null });
  });

  it('catches a thrown error and returns a descriptive failure', () => {
    const result = withStorage(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError');
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain('quota exceeded');
  });

  it('catches a real localStorage failure (simulated quota exceeded)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });

    const result = withStorage(() => localStorage.setItem('key', 'value'));
    expect(result.success).toBe(false);
    expect(result.error).toContain('quota');
  });
});
