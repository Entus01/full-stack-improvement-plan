export function validateInput(items) {
  if (!Array.isArray(items)) {
    throw new TypeError(`Expected an array, received ${typeof items}.`);
  }

  const invalidIndex = items.findIndex(
    (item) => typeof item !== 'object' || item === null || Array.isArray(item)
  );

  if (invalidIndex !== -1) {
    throw new TypeError(
      `Expected an array of plain objects, but item at index ${invalidIndex} is not a plain object.`
    );
  }
}
