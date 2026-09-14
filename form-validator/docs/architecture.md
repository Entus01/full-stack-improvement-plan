# Current Architecture

## Summary

A small, dependency-free ES module engine. Ten built-in rule evaluators live under `src/rules/`, each following the same contract as the SPEC's `custom` validator: `(ruleArg, value, allValues, type) => true | string`. `validateConfig` checks the rules configuration itself (DEC-008); `evaluateField` (internal) applies a field's rules; `validateField`/`validateForm` (public) wrap it with config validation.

## Main Technologies

- Plain JavaScript (ESM) — no runtime dependencies.
- Vitest — project-wide convention (see [../../docs/decisions.md](../../docs/decisions.md), DEC-007).

## Main Modules

- `src/isEmpty.js` — shared empty-value check (DEC-006).
- `src/rules/*.js` — `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `oneOf`, `equals`, `fileType`, `maxFileSize`. Each returns `true` or an error message string — the same contract the SPEC defines for `custom`.
- `src/rules/index.js` — `RULES` registry (name → evaluator) and `SUPPORTED_TYPES`.
- `src/validateConfig.js` — validates the rules configuration itself: field types must be supported, rule names must be built-in or paired with `custom`, `equals` targets must exist (DEC-008, throws `TypeError`).
- `src/evaluateField.js` — internal; applies one field's rules against the values object. Assumes the config is already valid (no re-validation) — used by both public functions to avoid redundant config checks.
- `src/validateField.js` — public; validates config, then delegates to `evaluateField`.
- `src/validateForm.js` — public; validates config once, then calls `evaluateField` per declared field.
- `src/index.js` — re-exports `validateField`, `validateForm`.

## General Flow

```
caller → validateConfig(rulesConfig) [throws on malformed config]
       → evaluateField(fieldName, values, rulesConfig) per field
           → isEmpty(value) decides whether non-required rules are skipped (DEC-006)
           → RULES[ruleName](ruleArg, value, allValues, type) per declared rule
           → custom(value, allValues) always runs if declared
       → { valid, errors } per field / { valid, fields } for the whole form
```

## External Integrations

None — out of scope per [../SPEC.md](../SPEC.md).

## Architectural Dependencies

- `evaluateField` depends on `isEmpty` and the `RULES` registry.
- `validateField` and `validateForm` both depend on `validateConfig` and `evaluateField`, not on each other.

## Technical Considerations

- Every rule evaluator receives `type` as a fourth argument (unused by most). This exists because DEC-007 (checkbox `required` means `value === true`, not merely present) can't be expressed by `isEmpty` alone — `required` needs to know the field's type to special-case checkbox. Found during implementation, not anticipated in the SPEC's Interface/Contract section.
- `validateConfig` runs once per `validateForm` call (not once per field) by having `validateForm`/`validateField` call the internal `evaluateField` directly rather than re-invoking each other.
