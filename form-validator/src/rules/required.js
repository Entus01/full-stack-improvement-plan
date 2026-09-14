import { isEmpty } from '../isEmpty.js';

export function required(ruleArg, value) {
  if (!ruleArg) return true;
  return isEmpty(value) ? 'This field is required.' : true;
}
