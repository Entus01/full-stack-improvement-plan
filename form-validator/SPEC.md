# SPEC — form-validator

## Metadata

- Exercise: `form-validator`
- Roadmap entry: [docs/roadmap.md](../docs/roadmap.md) — `#02. form-validator`
- Status: Done
- Created: 2026-09-14
- Last updated: 2026-09-14

*Status moves Draft → Approved (once the plan step in AGENT.md is confirmed) → In Progress → Done. Update "Last updated" whenever the spec itself changes.*

## Summary

A framework/DOM-agnostic validation engine. The caller declares each field's type and rules explicitly through a configuration (the engine never reads an HTML form or infers a field's type from its raw value). The engine validates a plain object of field values against that configuration and returns a predictable, structured result: overall form validity, and per field, its validity and every rule it failed (not just the first). Built-in rules cover common cases; a custom validator function covers anything the built-ins don't.

## Scope

### In scope

- Validating a plain object of field values against a caller-supplied rules configuration (no DOM/HTML form reading or element type inference).
- Built-in field types: `text`, `textarea`, `email`, `password`, `number`, `checkbox` (boolean), `radio` (single choice from a fixed set of options), `file` (metadata only — see below).
- Built-in rules: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern` (regex), `oneOf` (allowed values), and file-specific rules (`fileType`, `maxFileSize`).
- A `custom` validator function per field, for rules/behavior not covered by the built-ins — this is what lets the engine validate field types or constraints not explicitly enumerated here.
- Cross-field rules — a rule that compares a field's value against another field's value (e.g. `equals` for password confirmation), evaluated with access to the full set of submitted values.
- Validating a single field in isolation (its own rules, plus cross-field rules that reference it) and validating the entire form object at once.
- Supporting multiple rules on the same field, and reporting every rule that fails for that field, not only the first.
- Predictable, structured validation results: overall form validity, and per-field validity plus the list of failed rules.
- Handling missing, empty, or `null` field values predictably per rule (see Non-Functional Requirements).
- For `file` fields: validating already-known file metadata supplied by the caller (name, size in bytes, MIME type/extension, required, and optionally file count) — not `File`/`Blob` objects or file contents.

### Out of scope

- Reading or attaching to actual HTML/DOM form elements.
- Rendering forms or validation messages in the UI.
- Managing React component state or form state (dirty/touched tracking, submission handling).
- Styling forms or validation feedback.
- Submitting forms to a backend or external service.
- Persisting form data or validation results.
- Authentication or authorization.
- API integration or server-side validation.
- Uploading, storing, or reading file contents, or validating file contents beyond caller-supplied metadata — full upload handling belongs to `file-upload-service` (roadmap exercise 15).
- Internationalization or localization of validation messages.
- Asynchronous validation rules (e.g. checking a value against an external API) — all validation is synchronous.
- Business logic unrelated to field validation.
- Building a complete form-management framework beyond the validation responsibilities described here.

## Functional Requirements

- FR-1: The engine must accept a rules configuration in which the caller explicitly declares, per field, its type and the rules that apply to it — the engine does not infer a field's type from its value.
- FR-2: The engine must support the built-in field types `text`, `textarea`, `email`, `password`, `number`, `checkbox`, `radio`, and `file`.
- FR-3: The engine must support the built-in rules `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, and `oneOf`.
- FR-4: The engine must support a `custom` validator function per field, so rules or field behavior not covered by FR-2/FR-3 can still be declared and validated.
- FR-5: The engine must support cross-field rules — a rule that receives the full set of submitted values (not only its own field's value) to validate against another field.
- FR-6: The engine must support multiple rules applying to the same field, and must evaluate all of them rather than stopping at the first failure.
- FR-7: The engine must validate a single field in isolation, given that field's value, its own rules, and (for cross-field rules) the rest of the form's values.
- FR-8: The engine must validate an entire form (a plain object of field values) against the full rules configuration in one call.
- FR-9: The engine must return, for a validated field, whether it is valid and the list of every rule it failed (not just the first).
- FR-10: The engine must return, for a validated form, overall validity plus the per-field results described in FR-9.
- FR-11: The engine must handle missing, empty, or `null` field values predictably and consistently across rules (see Non-Functional Requirements for the specific behavior).
- FR-12: For `file`-type fields, the engine must validate caller-supplied file metadata (name, size, type, required, and optionally file count) using the built-in rules `required`, `fileType`, and `maxFileSize`.
- FR-13: The same rules configuration must be reusable across different forms/data objects without modification.

## Interface / Contract

### Function/API Signatures

**Rules configuration** — an object keyed by field name, e.g.:

```text
{
  password: {
    type: "password",
    rules: { required: true, minLength: 8 }
  },
  confirmPassword: {
    type: "password",
    rules: { required: true, equals: "password" }
  },
  age: {
    type: "number",
    rules: { required: true, min: 18 }
  },
  resume: {
    type: "file",
    rules: { required: true, fileType: ["application/pdf"], maxFileSize: 5_000_000 }
  },
  referralCode: {
    type: "text",
    rules: { custom: (value, allValues) => /* returns true, or an error message string */ }
  }
}
```

- `equals` is a built-in cross-field rule: its value is the name of another field whose value must match.
- `custom` receives `(value, allValues)` and returns `true` for valid, or a string (the error message) for invalid.

**`validateField(fieldName, values, rulesConfig)`** — receives the field name, the full values object (needed for cross-field rules even when validating one field), and the rules configuration. Returns:

```text
{ valid: boolean, errors: [{ rule: string, message: string }, ...] }
```

**`validateForm(values, rulesConfig)`** — receives the full values object and the rules configuration. Returns:

```text
{
  valid: boolean,
  fields: {
    [fieldName]: { valid: boolean, errors: [{ rule: string, message: string }, ...] }
  }
}
```

### Example

**Input** (`rulesConfig`):

```text
name:     { type: "text",     rules: { required: true } }
email:    { type: "email",    rules: { required: true } }
password: { type: "password", rules: { required: true, minLength: 8 } }
```

**Input** (`values`):

```text
{ name: "Miguel", email: "miguel@example.com", password: "123" }
```

**Output** (`validateForm(values, rulesConfig)`):

```text
{
  valid: false,
  fields: {
    name:     { valid: true,  errors: [] },
    email:    { valid: true,  errors: [] },
    password: { valid: false, errors: [{ rule: "minLength", message: "..." }] }
  }
}
```

## Non-Functional Requirements

- The engine must not depend on a specific UI framework or the DOM, and must remain reusable independently of form presentation.
- The engine must handle invalid, missing, or unsupported input (rules configuration or values) predictably, without unexpected runtime failures.
- Missing, empty-string, or `null` values: treated as "empty" uniformly for the `required` rule (all three fail `required: true`). For non-`required` fields, an empty/missing value skips the remaining rules for that field (nothing to validate) rather than failing them — except when a `custom` validator is declared, which always runs and decides for itself.
- `checkbox` fields hold a boolean value; `required: true` on a checkbox means the value must be `true` (e.g. "I agree to terms"), not merely present.
- `radio` fields require `oneOf` (the fixed set of valid option values) to be meaningful; the value must be a member of that set.
- Referencing an unsupported field `type`, an unsupported rule name (outside FR-2/FR-3's built-ins and without a `custom` entry), or an `equals`/cross-field reference to a field that doesn't exist in the configuration, throws a descriptive error at validation time rather than failing silently.
- No external dependencies, consistent with the project-wide conventions in [../docs/rules.md](../docs/rules.md).
- The implementation follows the code quality, naming, structure, and documentation conventions in [../docs/rules.md](../docs/rules.md).

## Assumptions & Open Questions

Resolved (see [docs/decisions.md](docs/decisions.md) once logged):
- Declared config, not DOM/HTML form reading, and not type inference from raw values.
- Built-in rules/types plus a `custom` escape hatch, rather than a closed enumerated list.
- File fields validate caller-supplied metadata only, not `File` objects/content — keeps this exercise's boundary with `file-upload-service` (exercise 15) clean.
- Cross-field validation is in scope, via a built-in `equals` rule plus general support for rules that see the full values object.
- Synchronous validation only.
- Per field, every failing rule is reported, not just the first.

Also resolved, confirmed 2026-09-14 (see [docs/decisions.md](docs/decisions.md) once logged):
- Empty/missing value on a non-required field skips its other rules.
- `checkbox` is exclusively a boolean toggle.
- Unsupported type/rule/cross-field reference throws.

None currently open.

## Acceptance Criteria

- [x] **AC-1 (FR-1):** Field type and rules come only from the caller-supplied configuration; the engine never infers a field's type from its value. — no inference code exists; `validateConfig.js`.
- [x] **AC-2 (FR-2):** All eight built-in field types (`text`, `textarea`, `email`, `password`, `number`, `checkbox`, `radio`, `file`) are supported. — `rules/index.js` `SUPPORTED_TYPES`.
- [x] **AC-3 (FR-3):** All seven built-in rules (`required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `oneOf`) are correctly evaluated. — `src/rules/*.js`, `tests/rules/*.test.js`.
- [x] **AC-4 (FR-4):** A `custom` validator function can be declared for a field and is invoked with `(value, allValues)`, its return value determining pass/fail. — `evaluateField.js`, `tests/evaluateField.test.js`.
- [x] **AC-5 (FR-5):** A cross-field rule (`equals`) correctly validates one field's value against another named field's value. — `rules/equals.js`, `tests/rules/equals.test.js`.
- [x] **AC-6 (FR-6):** A field with multiple failing rules reports all of them, not just the first. — `tests/evaluateField.test.js`.
- [x] **AC-7 (FR-7):** `validateField` correctly validates one field in isolation, including cross-field rules that reference other values. — `tests/validateField.test.js`, `tests/evaluateField.test.js`.
- [x] **AC-8 (FR-8):** `validateForm` correctly validates an entire values object against the full rules configuration. — `tests/validateForm.test.js`.
- [x] **AC-9 (FR-9):** A field's result reports its validity and the complete list of failed rules. — `{ valid, errors }` shape, `evaluateField.js`.
- [x] **AC-10 (FR-10):** A form's result reports overall validity and every field's result. — `{ valid, fields }` shape, `validateForm.js`.
- [x] **AC-11 (FR-11):** Missing/empty/`null` values are handled per the Non-Functional Requirements' defined behavior, consistently across rules. — `isEmpty.js`, `tests/evaluateField.test.js`.
- [x] **AC-12 (FR-12):** `file`-type fields validate `required`, `fileType`, and `maxFileSize` against caller-supplied metadata. — `tests/validateForm.test.js`.
- [x] **AC-13 (FR-13):** The same rules configuration validates multiple different values objects without modification. — `rulesConfig` is never mutated; demonstrated across all test files reusing a config with different `values`.

## Definition of Done

- [x] All acceptance criteria above are met.
- [x] Relevant edge cases (empty/missing values, unsupported types/rules, cross-field references to a missing field) are covered by tests.
- [x] The engine is usable independently of any UI or presentation layer.
- [x] The exercise documentation is complete and reflects the final implementation.
- [x] All tests are passing — 50 tests across 16 files.
- [x] No unexpected console errors or warnings are present during execution.
- [x] No external dependencies have been added.
- [x] The implementation follows the project conventions defined in [../docs/rules.md](../docs/rules.md).

## Revision History

| Date | Change | Reason |
|---|---|---|
| 2026-09-14 | Initial draft | — |
| 2026-09-14 | Reconciled with prior chat decisions: declared-config model (not DOM/type-inference), added `custom` validator escape hatch, scoped file validation to metadata only, added cross-field (`equals`) rules, set report-all-failures behavior; fixed title/metadata placeholders and the AC-2/FR-2 file-type gap; rewrote Interface/Contract accordingly | Draft was written independently of the earlier scoping discussion and conflicted with several already-agreed decisions; reconciled before implementation planning |
| 2026-09-14 | Confirmed remaining three proposed defaults (empty-value skip behavior, checkbox as boolean-only, unsupported type/rule throws). No open questions remain | User confirmation |
| 2026-09-14 | Implemented all rule evaluators, `validateConfig`, `validateField`, `validateForm`; all 13 acceptance criteria met, 50 passing tests. Status moved to Done | Implementation plan confirmed and executed |
