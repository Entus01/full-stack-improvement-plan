# Changelog

## [Unreleased] - 2026-09-18

### Added
- `SPEC.md` fully reviewed and resolved: `create`/`update` collapsed into `save`, uniform `{ success, error }` result shape across all four operations, `null`/`undefined` rejected as storable values, unsupported-value scope defined, invalid-key/storage-failure handling defined, `delete`-on-missing-key resolved as an error. Six decisions logged (DEC-001–006). Reviewed via [PR #1](https://github.com/Entus01/full-stack-improvement-plan/pull/1).
- Exercise documentation scaffold (this `docs/` folder).

### Notes
- No implementation exists yet. SPEC has no open questions; implementation plan is next.
