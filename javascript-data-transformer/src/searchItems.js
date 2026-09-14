import { validateInput } from './validateInput.js';
import { assertFunction } from './assertFunction.js';

// Deliberately identical to filterItems for now — see docs/decisions.md, DEC-005.
export function searchItems(items, predicateFn) {
  validateInput(items);
  assertFunction(predicateFn, 'predicateFn');

  return items.filter((item) => predicateFn(item));
}
