# Changelog

## [0.1.0] - 2026-09-09

### Added
- Initial 3-month, 28-exercise full-stack curriculum.
- `AGENT.md` defining the Spec-Driven Development (SDD) workflow for AI-assisted work in this repository.
- Project-wide documentation structure under `docs/` (README, glossary, rules, structure, architecture, deployment, decisions, changelog, roadmap), following the [Repos Documentation](https://entus01.github.io/Repos-Documentation/) standard, extended with a per-exercise/final-application scope (see `decisions.md`, DEC-001).
- `sql-relational-modeling` exercise (PostgreSQL relational schema design) and `invoice-pdf-generator` exercise (PDF generation with preview parity), added to the curriculum's Month 2 and Month 3.

### Changed
- Root `README.md` reduced to a stub pointing to `docs/README.md`; the full curriculum detail (time estimates, descriptions, skills) moved to `docs/roadmap.md`.
- Database plan corrected from "MongoDB + Python" to "MongoDB + PostgreSQL" (see `decisions.md`, DEC-003).
- Exercise/directory naming convention clarified as kebab-case, not BEM (see `decisions.md`, DEC-004).

### Notes
- No exercise has been implemented yet; `docs/architecture.md` and `docs/deployment.md` are placeholders pending the first exercise or the final application.

## [0.2.0] - 2026-09-14

### Added
- `docs/templates/spec.template.md` — reusable SPEC.md template, referenced from `AGENT.md`'s SDD workflow.
- Project-wide Code Style conventions: ESM as the module system, Vitest as the test framework (see `decisions.md`, DEC-006, DEC-007).
- Exercise 01, `javascript-data-transformer`, started: `SPEC.md` drafted and its open questions resolved, exercise-level `docs/` scaffolded.

### Notes
- `javascript-data-transformer` implementation has not started yet; its plan is pending confirmation.

## [0.3.0] - 2026-09-14

### Added
- Exercise 01, `javascript-data-transformer`, completed: five operations (filter, search, sort, group, paginate) plus shared validation guards, 46 passing tests, full exercise-level documentation.

### Notes
- `docs/roadmap.md` updated to reflect exercise 01 as Completed.

## [0.3.1] - 2026-09-14

### Fixed
- `docs/templates/spec.template.md` and `javascript-data-transformer/SPEC.md` linked to `docs/` two levels up (`../../docs/...`); `SPEC.md` lives one level below root, so the correct relative path is `../docs/...`. Fixed in both; caught while reconciling `form-validator/SPEC.md`, which was written correctly from the start.

## [0.4.0] - 2026-09-14

### Added
- Exercise 02, `form-validator`, completed: declared-config validation engine (ten built-in rules, `custom` escape hatch, cross-field support, file-metadata validation), 50 passing tests, full exercise-level documentation (8 decisions logged).

### Notes
- `docs/roadmap.md` updated to reflect exercise 02 as Completed.
