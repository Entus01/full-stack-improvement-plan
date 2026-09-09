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
