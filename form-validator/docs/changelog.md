# Changelog

## [Unreleased] - 2026-09-14

### Added
- `SPEC.md` reconciled: declared-config model, `custom` validator escape hatch, cross-field (`equals`) rules, file-metadata-only scope, report-all-failures behavior. Eight decisions logged (DEC-001–008).
- Exercise documentation scaffold (this `docs/` folder).

### Fixed
- `SPEC.md`'s relative links to `docs/` (were two levels up, corrected to one) — same bug found and fixed project-wide in `docs/templates/spec.template.md` and `javascript-data-transformer/SPEC.md`.

### Notes
- No implementation exists yet. SPEC has no open questions; implementation plan is next.

## [Unreleased] - 2026-09-14 (implementation)

### Added
- `isEmpty`, `validateConfig` — shared internal guards.
- Ten built-in rule evaluators (`src/rules/*.js`), each following the `custom` validator contract: `(ruleArg, value, allValues, type) => true | string`.
- `evaluateField` (internal), `validateField`/`validateForm` (public), `src/index.js` barrel export.
- `package.json` with Vitest (ESM). 50 tests passing across 16 files.

### Fixed
- `required` on a checkbox incorrectly passed for `value: false` (since `false` isn't "empty"). Fixed by passing the field's `type` into every rule evaluator so `required` can special-case checkbox per DEC-007 — not anticipated in the original Interface/Contract, documented in `architecture.md`.

### Notes
- `SPEC.md` status moved to Done — all 13 acceptance criteria met.
