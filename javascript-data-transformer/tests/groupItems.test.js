import { describe, it, expect } from 'vitest';
import { groupItems } from '../src/groupItems.js';

const invoices = [
  { id: 1, status: 'paid' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'paid' },
];

describe('groupItems', () => {
  it('groups items by the key returned by keyFn', () => {
    const result = groupItems(invoices, (item) => item.status);

    expect(result).toBeInstanceOf(Map);
    expect(result.get('paid')).toEqual([invoices[0], invoices[2]]);
    expect(result.get('pending')).toEqual([invoices[1]]);
  });

  it('supports non-string keys without coercion', () => {
    const items = [{ id: 1, active: true }, { id: 2, active: false }];
    const result = groupItems(items, (item) => item.active);

    expect(result.get(true)).toEqual([items[0]]);
    expect(result.get(false)).toEqual([items[1]]);
    expect(result.has('true')).toBe(false);
  });

  it('returns an empty Map when given an empty array', () => {
    const result = groupItems([], (item) => item.status);
    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(0);
  });

  it('does not mutate the original array', () => {
    const copy = [...invoices];
    groupItems(invoices, (item) => item.status);
    expect(invoices).toEqual(copy);
  });

  it('throws when items is not a valid array of objects', () => {
    expect(() => groupItems('not an array', (item) => item.status)).toThrow(TypeError);
  });

  it('throws when keyFn is not a function', () => {
    expect(() => groupItems(invoices, 'status')).toThrow(TypeError);
  });
});
