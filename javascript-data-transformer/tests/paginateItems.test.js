import { describe, it, expect } from 'vitest';
import { paginateItems } from '../src/paginateItems.js';

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

describe('paginateItems', () => {
  it('returns the requested page', () => {
    expect(paginateItems(items, 2, 1)).toEqual([{ id: 1 }, { id: 2 }]);
    expect(paginateItems(items, 2, 2)).toEqual([{ id: 3 }, { id: 4 }]);
  });

  it('returns a partial last page', () => {
    expect(paginateItems(items, 2, 3)).toEqual([{ id: 5 }]);
  });

  it('returns all items when pageSize is larger than the data', () => {
    expect(paginateItems(items, 10, 1)).toEqual(items);
  });

  it('returns an empty array for page 1 of an empty array (DEC-003)', () => {
    expect(paginateItems([], 10, 1)).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const copy = [...items];
    paginateItems(items, 2, 1);
    expect(items).toEqual(copy);
  });

  it('throws when items is not a valid array of objects', () => {
    expect(() => paginateItems('not an array', 2, 1)).toThrow(TypeError);
  });

  it('throws for an invalid pageSize', () => {
    expect(() => paginateItems(items, 0, 1)).toThrow(RangeError);
    expect(() => paginateItems(items, -1, 1)).toThrow(RangeError);
    expect(() => paginateItems(items, 1.5, 1)).toThrow(RangeError);
    expect(() => paginateItems(items, 'two', 1)).toThrow(RangeError);
  });

  it('throws for an invalid pageNumber', () => {
    expect(() => paginateItems(items, 2, 0)).toThrow(RangeError);
    expect(() => paginateItems(items, 2, -1)).toThrow(RangeError);
    expect(() => paginateItems(items, 2, 1.5)).toThrow(RangeError);
  });

  it('throws when pageNumber is beyond the available range', () => {
    expect(() => paginateItems(items, 2, 4)).toThrow(RangeError);
    expect(() => paginateItems([], 10, 2)).toThrow(RangeError);
  });
});
