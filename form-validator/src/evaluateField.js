import { RULES } from './rules/index.js';
import { isEmpty } from './isEmpty.js';

// Internal: assumes rulesConfig has already been validated (see validateConfig.js).
export function evaluateField(fieldName, values, rulesConfig) {
  const fieldConfig = rulesConfig[fieldName];
  const rules = fieldConfig.rules ?? {};
  const value = values[fieldName];
  const empty = isEmpty(value);
  const errors = [];

  for (const [ruleName, ruleArg] of Object.entries(rules)) {
    if (ruleName === 'custom') continue;
    if (empty && ruleName !== 'required') continue;

    const result = RULES[ruleName](ruleArg, value, values, fieldConfig.type);
    if (result !== true) {
      errors.push({ rule: ruleName, message: result });
    }
  }

  if (typeof rules.custom === 'function') {
    const result = rules.custom(value, values);
    if (result !== true) {
      errors.push({ rule: 'custom', message: result });
    }
  }

  return { valid: errors.length === 0, errors };
}
