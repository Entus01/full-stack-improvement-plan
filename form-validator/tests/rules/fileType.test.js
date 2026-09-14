import { describe, it, expect } from 'vitest';
import { fileType } from '../../src/rules/fileType.js';

describe('fileType', () => {
  it('passes when the file type is allowed', () => {
    expect(fileType(['application/pdf'], { type: 'application/pdf' })).toBe(true);
  });

  it('fails when the file type is not allowed', () => {
    expect(fileType(['application/pdf'], { type: 'image/png' })).not.toBe(true);
  });

  it('fails when value has no type', () => {
    expect(fileType(['application/pdf'], {})).not.toBe(true);
  });
});
