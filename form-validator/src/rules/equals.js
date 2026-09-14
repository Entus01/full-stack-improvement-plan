export function equals(ruleArg, value, allValues) {
  return value === allValues[ruleArg] ? true : `Must match ${ruleArg}.`;
}
