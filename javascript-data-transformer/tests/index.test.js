import { describe, it, expect } from 'vitest';
import { filterItems, sortItems, groupItems, paginateItems } from '../src/index.js';

const invoices = [
  { id: 1, client: 'Acme Corp', status: 'paid', amount: 300 },
  { id: 2, client: 'Globex', status: 'pending', amount: 150 },
  { id: 3, client: 'Acme Corp', status: 'paid', amount: 100 },
  { id: 4, client: 'Initech', status: 'paid', amount: 400 },
  { id: 5, client: 'Globex', status: 'pending', amount: 250 },
];

describe('combining operations (FR-10/FR-11)', () => {
  it('filters then sorts then paginates, chaining outputs as inputs', () => {
    const paid = filterItems(invoices, (item) => item.status === 'paid');
    const sorted = sortItems(paid, (a, b) => a.amount - b.amount);
    const firstPage = paginateItems(sorted, 2, 1);

    expect(firstPage.map((item) => item.id)).toEqual([3, 1]);
  });

  it('groups the result of a prior filter', () => {
    const paid = filterItems(invoices, (item) => item.status === 'paid');
    const byClient = groupItems(paid, (item) => item.client);

    expect(byClient.get('Acme Corp')).toHaveLength(2);
    expect(byClient.get('Initech')).toHaveLength(1);
    expect(byClient.has('Globex')).toBe(false);
  });

  it('each operation returns a predictable, consistent structure (FR-8)', () => {
    expect(Array.isArray(filterItems(invoices, () => true))).toBe(true);
    expect(Array.isArray(sortItems(invoices, (a, b) => a.amount - b.amount))).toBe(true);
    expect(Array.isArray(paginateItems(invoices, 2, 1))).toBe(true);
    expect(groupItems(invoices, (item) => item.status)).toBeInstanceOf(Map);
  });
});
