import { validateKey } from './validateKey.js';
import { withStorage } from './withStorage.js';

export function read(key) {
  const keyError = validateKey(key);
  if (keyError) {
    return { success: false, value: null, error: keyError };
  }

  const result = withStorage(() => localStorage.getItem(key));
  if (!result.success) {
    return { success: false, value: null, error: result.error };
  }

  const raw = result.result;
  if (raw === null) {
    return { success: true, value: null, error: null };
  }

  try {
    return { success: true, value: JSON.parse(raw), error: null };
  } catch (err) {
    return {
      success: false,
      value: null,
      error: `stored value is not valid JSON: ${err.message}`,
    };
  }
}
