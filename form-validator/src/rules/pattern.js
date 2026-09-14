export function pattern(ruleArg, value) {
  return ruleArg.test(value) ? true : 'Does not match the required format.';
}
