export function max(ruleArg, value) {
  return Number(value) <= ruleArg ? true : `Must be no more than ${ruleArg}.`;
}
