import { validateKey } from './validateKey.js';
import { withStorage } from './withStorage.js';

export function remove(key) {
  const keyError = validateKey(key);
  if (keyError) {
    return { success: false, error: keyError };
  }

  const existsResult = withStorage(() => localStorage.getItem(key));
  if (!existsResult.success) {
    return { success: false, error: existsResult.error };
  }

  if (existsResult.result === null) {
    return { success: false, error: 'key not found' };
  }

  const removeResult = withStorage(() => localStorage.removeItem(key));
  if (!removeResult.success) {
    return { success: false, error: removeResult.error };
  }

  return { success: true, error: null };
}
