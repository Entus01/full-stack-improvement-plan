# Development Principles

Project-wide rules and conventions. Exercise-specific rules, if any turn out to be needed, belong inside that exercise's own `docs/` folder, not here.

## Naming Conventions

- All exercise and project directories use **kebab-case** (see [glossary.md](glossary.md)), e.g. `invoice-status-manager`. This is the standard npm/project-directory convention, not the BEM CSS naming convention.
- Exercise folders are numbered in their heading/documentation (e.g. `01.`, `02.`) to reflect build order, but folder names themselves carry no numeric prefix.

## Repository Organization

The full directory layout is defined in [structure.md](structure.md) (SSOT) — this section is not repeated here.

## Code Style

- **Module system:** ESM (`import`/`export`), not CommonJS — project-wide, across both frontend and backend exercises (see [decisions.md](decisions.md), DEC-006).
- **Testing:** Vitest — project-wide (see [decisions.md](decisions.md), DEC-007). For exercises whose tests need browser-only globals (e.g. `localStorage`), use `jsdom` as the Vitest `environment` (see DEC-008).
- Linting/formatting conventions are not yet defined. This section will be updated once those decisions are made, and recorded in [decisions.md](decisions.md).

## Git Workflow

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`, imperative mood, lowercase subject, no trailing period.
  - Types: `feat` (new capability), `fix` (bug fix), `docs` (documentation only), `test` (tests only, no production code change), `chore` (tooling/config/dependencies), `refactor` (no behavior change).
  - Scope: the exercise directory (e.g. `javascript-data-transformer`, `form-validator`), or omitted for root-level/project-wide changes.
  - Body (optional): the *why*, not a restatement of the diff. Reference `DEC-XXX`/`AC-XXX`/`FR-XXX` where a commit implements or resolves one.
- **Atomic commits:** one coherent logical change per commit — a single file's creation, a single decision's resolution, a single module with its own tests as a pair, a single bug fix. Prefer more, smaller commits over one commit bundling unrelated changes.
- Branching strategy is not yet defined beyond direct work on `main`. This will be updated once a decision is made, and recorded in [decisions.md](decisions.md).

## Documentation Standards

- Documentation follows the [Repos Documentation](https://entus01.github.io/Repos-Documentation/) standard (see [decisions.md](decisions.md), DEC-001).
- Project-wide information lives in this `docs/` folder. Exercise-specific information lives in that exercise's own `docs/` folder. Final-application information lives in its own `docs/` folder. Do not duplicate the same information across these scopes — reference the owning document instead.
- Terminology used in any document must match [glossary.md](glossary.md); new terms requiring shared interpretation are added there, not redefined locally.
- Exercise-level and final-application-level documentation sets are created only when that exercise/application is actually started (see [decisions.md](decisions.md), DEC-002) — not created in advance as empty placeholders.

## Maintenance Guidelines

- Prefer simplicity over complexity; do not create a document unless it has real, current content.
- Keep documentation synchronized with the actual state of the project — `architecture.md` and `deployment.md` must reflect what exists, not what is planned (planned work belongs in [roadmap.md](roadmap.md)).
- Record significant decisions in [decisions.md](decisions.md) and summarize meaningful evolution in [changelog.md](changelog.md); neither replaces git history.
