import { isEmpty } from '../isEmpty.js';

// DEC-007: for a checkbox, "required" means the value must be true, not merely present.
export function required(ruleArg, value, allValues, type) {
  if (!ruleArg) return true;

  if (type === 'checkbox') {
    return value === true ? true : 'This field is required.';
  }

  return isEmpty(value) ? 'This field is required.' : true;
}
