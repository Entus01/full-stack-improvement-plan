import { describe, it, expect } from 'vitest';
import { filterItems } from '../src/filterItems.js';

const invoices = [
  { id: 1, status: 'paid', amount: 100 },
  { id: 2, status: 'pending', amount: 50 },
  { id: 3, status: 'paid', amount: 200 },
];

describe('filterItems', () => {
  it('returns only items matching the predicate', () => {
    const result = filterItems(invoices, (item) => item.status === 'paid');
    expect(result).toEqual([invoices[0], invoices[2]]);
  });

  it('returns an empty array when no items match', () => {
    const result = filterItems(invoices, (item) => item.status === 'cancelled');
    expect(result).toEqual([]);
  });

  it('returns an empty array when given an empty array', () => {
    expect(filterItems([], () => true)).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const copy = [...invoices];
    filterItems(invoices, (item) => item.status === 'paid');
    expect(invoices).toEqual(copy);
  });

  it('throws when items is not a valid array of objects', () => {
    expect(() => filterItems('not an array', () => true)).toThrow(TypeError);
    expect(() => filterItems([{ id: 1 }, null], () => true)).toThrow(TypeError);
  });

  it('throws when predicateFn is not a function', () => {
    expect(() => filterItems(invoices, 'not a function')).toThrow(TypeError);
  });

  it('treats a missing property as undefined, following native JS semantics (DEC-002)', () => {
    const items = [{ id: 1 }, { id: 2, status: 'paid' }];
    const result = filterItems(items, (item) => item.status === undefined);
    expect(result).toEqual([{ id: 1 }]);
  });
});
