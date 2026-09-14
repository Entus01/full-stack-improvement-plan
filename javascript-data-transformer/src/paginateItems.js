import { validateInput } from './validateInput.js';

export function paginateItems(items, pageSize, pageNumber) {
  validateInput(items);

  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    throw new RangeError(`Expected pageSize to be a positive integer, received ${pageSize}.`);
  }

  if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
    throw new RangeError(`Expected pageNumber to be a positive integer, received ${pageNumber}.`);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  if (pageNumber > totalPages) {
    throw new RangeError(
      `Page ${pageNumber} is out of range; only ${totalPages} page${totalPages === 1 ? '' : 's'} available.`
    );
  }

  const start = (pageNumber - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
