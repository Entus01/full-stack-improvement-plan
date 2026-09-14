import { RULES, SUPPORTED_TYPES } from './rules/index.js';

export function validateConfig(rulesConfig) {
  for (const [fieldName, fieldConfig] of Object.entries(rulesConfig)) {
    if (!SUPPORTED_TYPES.includes(fieldConfig.type)) {
      throw new TypeError(
        `Field "${fieldName}" has unsupported type "${fieldConfig.type}".`
      );
    }

    const rules = fieldConfig.rules ?? {};

    for (const ruleName of Object.keys(rules)) {
      if (ruleName === 'custom') continue;

      if (!(ruleName in RULES)) {
        throw new TypeError(`Field "${fieldName}" has unsupported rule "${ruleName}".`);
      }

      if (ruleName === 'equals' && !(rules.equals in rulesConfig)) {
        throw new TypeError(
          `Field "${fieldName}" has an "equals" rule referencing unknown field "${rules.equals}".`
        );
      }
    }
  }
}
