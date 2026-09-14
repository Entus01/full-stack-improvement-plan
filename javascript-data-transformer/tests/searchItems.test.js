import { describe, it, expect } from 'vitest';
import { searchItems } from '../src/searchItems.js';

const invoices = [
  { id: 1, client: 'Acme Corp' },
  { id: 2, client: 'Globex' },
  { id: 3, client: 'Acme Corp' },
];

describe('searchItems', () => {
  it('returns only items matching the predicate', () => {
    const result = searchItems(invoices, (item) => item.client === 'Acme Corp');
    expect(result).toEqual([invoices[0], invoices[2]]);
  });

  it('returns an empty array when no items match', () => {
    expect(searchItems(invoices, (item) => item.client === 'Nobody')).toEqual([]);
  });

  it('returns an empty array when given an empty array', () => {
    expect(searchItems([], () => true)).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const copy = [...invoices];
    searchItems(invoices, (item) => item.client === 'Acme Corp');
    expect(invoices).toEqual(copy);
  });

  it('throws when items is not a valid array of objects', () => {
    expect(() => searchItems('not an array', () => true)).toThrow(TypeError);
  });

  it('throws when predicateFn is not a function', () => {
    expect(() => searchItems(invoices, null)).toThrow(TypeError);
  });
});
