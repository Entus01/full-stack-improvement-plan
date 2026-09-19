export function withStorage(operation) {
  try {
    return { success: true, result: operation(), error: null };
  } catch (err) {
    return { success: false, result: undefined, error: `storage operation failed: ${err.message}` };
  }
}
