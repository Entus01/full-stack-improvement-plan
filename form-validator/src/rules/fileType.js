export function fileType(ruleArg, value) {
  return ruleArg.includes(value?.type)
    ? true
    : `File type must be one of: ${ruleArg.join(', ')}.`;
}
