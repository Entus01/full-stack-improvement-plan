export function oneOf(ruleArg, value) {
  return ruleArg.includes(value) ? true : `Must be one of: ${ruleArg.join(', ')}.`;
}
