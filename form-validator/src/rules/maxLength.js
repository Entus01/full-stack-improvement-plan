export function maxLength(ruleArg, value) {
  return String(value).length <= ruleArg
    ? true
    : `Must be no more than ${ruleArg} characters long.`;
}
