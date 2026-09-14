# Changelog

## [Unreleased] - 2026-09-14

### Added
- Initial `SPEC.md` drafted: scope, functional requirements, interface contract, non-functional requirements, acceptance criteria, and open questions.
- Exercise documentation scaffold (this `docs/` folder) created per [../../docs/structure.md](../../docs/structure.md) and [../../AGENT.md](../../AGENT.md).
- Five decisions recorded (DEC-001–DEC-005): criteria format, missing-property handling, pagination edge cases, invalid-input handling, and the filter/search overlap.

### Changed
- `SPEC.md` Interface/Contract section updated with concrete function contracts reflecting DEC-001–DEC-005; Assumptions & Open Questions section cleared, with each original item traced to its resolving decision.

### Notes
- No implementation exists yet. The implementation plan is the next step (see `SPEC.md` status).

## [Unreleased] - 2026-09-14 (implementation)

### Added
- `validateInput`, `assertFunction` — shared internal guards.
- `filterItems`, `searchItems`, `sortItems`, `groupItems`, `paginateItems` — the five public operations, each with its own test file.
- `src/index.js` barrel export and `tests/index.test.js` covering combined/chained usage.
- `package.json` with Vitest configured (ESM, per project-wide DEC-006/DEC-007). 46 tests passing across 8 files.
- DEC-006 (`groupItems` returns `Map`, not a plain object).

### Removed
- FR-2 and AC-2, struck through (not deleted) in `SPEC.md` for traceability — conflicted with DEC-002; resolved by dropping FR-2 rather than reversing DEC-002 (DEC-007).

### Notes
- `SPEC.md` status moved to Done — all remaining acceptance criteria are met.
