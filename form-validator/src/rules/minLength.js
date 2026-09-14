export function minLength(ruleArg, value) {
  return String(value).length >= ruleArg
    ? true
    : `Must be at least ${ruleArg} characters long.`;
}
