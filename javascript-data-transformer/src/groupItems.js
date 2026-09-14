import { validateInput } from './validateInput.js';
import { assertFunction } from './assertFunction.js';

export function groupItems(items, keyFn) {
  validateInput(items);
  assertFunction(keyFn, 'keyFn');

  const groups = new Map();

  for (const item of items) {
    const key = keyFn(item);
    const group = groups.get(key);

    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return groups;
}
