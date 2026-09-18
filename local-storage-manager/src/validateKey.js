export function validateKey(key) {
  if (typeof key !== 'string' || key.length === 0) {
    return 'key must be a non-empty string';
  }
  return null;
}
