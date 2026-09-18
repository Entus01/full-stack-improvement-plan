import { validateKey } from './validateKey.js';
import { withStorage } from './withStorage.js';

export function has(key) {
  const keyError = validateKey(key);
  if (keyError) {
    return { success: false, exists: false, error: keyError };
  }

  const result = withStorage(() => localStorage.getItem(key));
  if (!result.success) {
    return { success: false, exists: false, error: result.error };
  }

  return { success: true, exists: result.result !== null, error: null };
}
