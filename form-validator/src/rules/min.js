export function min(ruleArg, value) {
  return Number(value) >= ruleArg ? true : `Must be at least ${ruleArg}.`;
}
