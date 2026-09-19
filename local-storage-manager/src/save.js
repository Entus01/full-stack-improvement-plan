import { validateKey } from './validateKey.js';
import { withStorage } from './withStorage.js';

export function save(key, value) {
  const keyError = validateKey(key);
  if (keyError) {
    return { success: false, error: keyError };
  }

  if (value === null || value === undefined) {
    return { success: false, error: 'value cannot be null or undefined' };
  }

  let serialized;
  try {
    serialized = JSON.stringify(value);
  } catch (err) {
    return { success: false, error: `value cannot be serialized: ${err.message}` };
  }

  const result = withStorage(() => localStorage.setItem(key, serialized));
  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, error: null };
}
