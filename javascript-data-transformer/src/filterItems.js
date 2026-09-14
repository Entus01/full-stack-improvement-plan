import { validateInput } from './validateInput.js';
import { assertFunction } from './assertFunction.js';

export function filterItems(items, predicateFn) {
  validateInput(items);
  assertFunction(predicateFn, 'predicateFn');

  return items.filter((item) => predicateFn(item));
}
