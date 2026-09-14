import { validateConfig } from './validateConfig.js';
import { evaluateField } from './evaluateField.js';

export function validateForm(values, rulesConfig) {
  validateConfig(rulesConfig);

  const fields = {};
  let valid = true;

  for (const fieldName of Object.keys(rulesConfig)) {
    const result = evaluateField(fieldName, values, rulesConfig);
    fields[fieldName] = result;
    if (!result.valid) valid = false;
  }

  return { valid, fields };
}
