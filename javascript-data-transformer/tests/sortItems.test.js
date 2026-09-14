import { describe, it, expect } from 'vitest';
import { sortItems } from '../src/sortItems.js';

const invoices = [
  { id: 1, amount: 200 },
  { id: 2, amount: 50 },
  { id: 3, amount: 100 },
];

describe('sortItems', () => {
  it('returns items ordered according to the comparator (ascending)', () => {
    const result = sortItems(invoices, (a, b) => a.amount - b.amount);
    expect(result.map((item) => item.id)).toEqual([2, 3, 1]);
  });

  it('returns items ordered according to the comparator (descending)', () => {
    const result = sortItems(invoices, (a, b) => b.amount - a.amount);
    expect(result.map((item) => item.id)).toEqual([1, 3, 2]);
  });

  it('returns a new array and does not mutate the original', () => {
    const copy = [...invoices];
    const result = sortItems(invoices, (a, b) => a.amount - b.amount);
    expect(invoices).toEqual(copy);
    expect(result).not.toBe(invoices);
  });

  it('returns an empty array when given an empty array', () => {
    expect(sortItems([], (a, b) => a - b)).toEqual([]);
  });

  it('throws when items is not a valid array of objects', () => {
    expect(() => sortItems('not an array', (a, b) => a - b)).toThrow(TypeError);
  });

  it('throws when comparatorFn is not a function', () => {
    expect(() => sortItems(invoices, 'amount')).toThrow(TypeError);
  });
});
