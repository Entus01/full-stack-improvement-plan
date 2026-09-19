# Changelog

## [Unreleased] - 2026-09-18

### Added
- `SPEC.md` fully reviewed and resolved: `create`/`update` collapsed into `save`, uniform `{ success, error }` result shape across all four operations, `null`/`undefined` rejected as storable values, unsupported-value scope defined, invalid-key/storage-failure handling defined, `delete`-on-missing-key resolved as an error. Six decisions logged (DEC-001–006). Reviewed via [PR #1](https://github.com/Entus01/full-stack-improvement-plan/pull/1).
- Exercise documentation scaffold (this `docs/` folder).

### Notes
- No implementation exists yet. SPEC has no open questions; implementation plan is next.

## [Unreleased] - 2026-09-18 (implementation)

### Added
- `validateKey`, `withStorage` — shared internal guards.
- `save`, `read`, `remove`, `has` — the four public operations, each with its own test file, returning a uniform `{ success, error }` result shape (plus `value`/`exists` where applicable).
- `src/index.js` barrel export and `tests/index.test.js` covering the SPEC's worked example end-to-end and result-shape consistency (AC-13).
- `package.json`/`vitest.config.js` with Vitest + jsdom (ESM, per project-wide DEC-006/007/008). 31 tests passing across 7 files.

### Fixed
- SPEC named this operation's function `delete`, a reserved JS keyword — not usable as a function/import binding. Renamed to `remove` throughout (DEC-007), discovered during implementation, not caught during the SPEC review.

### Notes
- `SPEC.md` status moved to Done — all 13 acceptance criteria met.
