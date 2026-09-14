# Decisions

Decision log specific to this exercise. Project-wide decisions live in [../../docs/decisions.md](../../docs/decisions.md) and are not repeated here.

## DEC-001

Date: 2026-09-14
Status: Accepted

Title: Fields are declared via configuration, not inferred from the DOM or raw values

Context: The first SPEC draft framed the engine as "identifying form elements" and their type (FR-1/FR-2 as originally written), which reads as DOM/type-inference rather than the DOM-agnostic model used elsewhere in this project.

Options considered:
1. Caller declares each field's type and rules explicitly via a configuration object.
2. Engine reads an actual HTML form and inspects its elements.
3. Engine infers a field's type from its raw value.

Decision: Option 1.

Rationale: Consistent with `javascript-data-transformer`'s DOM-agnostic pattern; required for reuse by `react-form-engine` (exercise 06) and `authentication-ui` (exercise 07), which cannot depend on a DOM-coupled validator.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-002

Date: 2026-09-14
Status: Accepted

Title: Built-in rules plus a `custom` validator escape hatch

Context: The first draft relied on an enumerated, "to be finalized" list of field types/rules with no extension mechanism — insufficient for the requirement that unlisted elements still be identifiable and validatable.

Options considered:
1. Built-in rules/types (fixed, closed list).
2. Built-in rules/types plus a `custom(value, allValues)` validator function per field.
3. Fully generic — every rule supplied as a function, no built-ins.

Decision: Option 2.

Rationale: Built-ins cover common cases ergonomically; `custom` covers anything not anticipated, without needing to enumerate every possible field/rule up front.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-003

Date: 2026-09-14
Status: Accepted

Title: File validation is scoped to caller-supplied metadata only

Context: File/attachment fields were added to the SPEC without prior discussion, and overlap with roadmap exercise 15 (`file-upload-service`).

Options considered:
1. Validate metadata (name, size, type, required, file count) only — no `File`/`Blob` objects, no content, no upload handling.
2. Remove file validation from this exercise entirely, deferring to exercise 15.

Decision: Option 1.

Rationale: Keeps this exercise's scope (pure validation) distinct from exercise 15's scope (actual upload/storage), while still covering a realistic form field type.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-004

Date: 2026-09-14
Status: Accepted

Title: Cross-field validation is in scope, via a built-in `equals` rule

Context: Realistic forms need rules that depend on more than one field (e.g. password confirmation).

Decision: Support cross-field rules generally (a rule receives the full values object), with `equals` (value must match another named field) as the one built-in cross-field rule.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-005

Date: 2026-09-14
Status: Accepted

Title: Report every failing rule per field, not just the first

Options considered:
1. Report every failing rule per field (result carries a list).
2. Stop at the first failing rule per field (result carries at most one).

Decision: Option 1.

Rationale: More useful for a real form — surface everything wrong on a field at once rather than one error at a time across repeated validation attempts.

Impact: A field's result shape is `{ valid, errors: [...] }`, not `{ valid, error }`.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-006

Date: 2026-09-14
Status: Accepted

Title: Empty/missing value handling

Context: Behavior for missing/`null`/empty-string values, and for non-required fields, was unspecified.

Decision:
- Missing, `null`, and empty-string are all treated as "empty" for the `required` rule — all three fail `required: true`.
- On a non-required field, an empty/missing value skips that field's other rules (nothing to validate) rather than failing them.
- A `custom` validator always runs regardless, since it decides its own semantics.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-007

Date: 2026-09-14
Status: Accepted

Title: `checkbox` is boolean-only

Context: The original draft listed `checkbox` as a type distinct from `radio` without defining its value shape (a single toggle vs. a multi-select group).

Decision: `checkbox` holds a boolean value only (e.g. "I agree to terms"). `required: true` means the value must be `true`. Multi-select-style grouped choices are not covered by this type.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-008

Date: 2026-09-14
Status: Accepted

Title: Unsupported type/rule/cross-field reference throws

Context: Behavior when a rules configuration references an unsupported field type, an unrecognized rule name (with no `custom` entry), or an `equals` target field that doesn't exist, was unspecified.

Decision: Throw a descriptive error at validation time, rather than silently ignoring the field/rule or failing validation for just that field.

Rationale: Consistent with `javascript-data-transformer`'s fail-fast precedent (see [../../javascript-data-transformer/docs/decisions.md](../../javascript-data-transformer/docs/decisions.md), DEC-004) — a malformed configuration is a caller bug, not a validation result.

Related documentation: [../SPEC.md](../SPEC.md)
