export function maxFileSize(ruleArg, value) {
  return value?.size <= ruleArg
    ? true
    : `File must be no larger than ${ruleArg} bytes.`;
}
