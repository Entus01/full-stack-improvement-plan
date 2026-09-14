import { validateConfig } from './validateConfig.js';
import { evaluateField } from './evaluateField.js';

export function validateField(fieldName, values, rulesConfig) {
  validateConfig(rulesConfig);

  if (!(fieldName in rulesConfig)) {
    throw new TypeError(`Field "${fieldName}" is not declared in the rules configuration.`);
  }

  return evaluateField(fieldName, values, rulesConfig);
}
