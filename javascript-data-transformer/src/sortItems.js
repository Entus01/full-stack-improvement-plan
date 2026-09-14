import { validateInput } from './validateInput.js';
import { assertFunction } from './assertFunction.js';

export function sortItems(items, comparatorFn) {
  validateInput(items);
  assertFunction(comparatorFn, 'comparatorFn');

  return [...items].sort(comparatorFn);
}
