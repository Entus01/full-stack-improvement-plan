import { describe, it, expect } from 'vitest';
import { maxFileSize } from '../../src/rules/maxFileSize.js';

describe('maxFileSize', () => {
  it('passes when file size is at or below the maximum', () => {
    expect(maxFileSize(5_000_000, { size: 4_000_000 })).toBe(true);
    expect(maxFileSize(5_000_000, { size: 5_000_000 })).toBe(true);
  });

  it('fails when file size exceeds the maximum', () => {
    expect(maxFileSize(5_000_000, { size: 6_000_000 })).not.toBe(true);
  });
});
