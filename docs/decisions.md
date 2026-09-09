# Decisions

Project-wide decision log. See [glossary.md](glossary.md) for the DEC term definition.

## DEC-001

Date: 2026-09-09
Status: Accepted

Title: Adopt the Repos Documentation standard, extended per unit of work

Context: The project's documentation (a curriculum README and an AGENT.md workflow file) needed a consistent, scalable structure ahead of 28+ exercises and a final application being built. An existing personal documentation standard already defines file responsibilities and SSOT principles for a single project, but does not address a repository containing many independent exercises.

Options considered:
1. Keep an informal, single-README structure.
2. Design a fully custom documentation scheme for this project.
3. Adopt the existing Repos Documentation standard as-is for the whole repository (one project-wide `docs/`), and extend it with a per-exercise and per-final-application scope for the files the standard defines as project-specific (`architecture.md`, `decisions.md`, `changelog.md`, `roadmap.md`, and `deployment.md` for the final application only).

Decision: Option 3.

Rationale: The standard already defines clear file responsibilities and an SSOT model; inventing a new scheme would duplicate that work. Extending it per unit of work is the only way to apply it to a multi-exercise repository, since the standard itself gives no monorepo guidance.

Impact: A `docs/` folder now exists at the repository root. The root `README.md` becomes a stub pointing to `docs/README.md`. Each exercise and the final application will get its own `docs/` subfolder once started (see DEC-002).

Consequences: `docs/rules.md` and `docs/structure.md` document this scope model; future exercises follow it without renegotiating it each time.

Related documentation: [structure.md](structure.md), [rules.md](rules.md)

## DEC-002

Date: 2026-09-09
Status: Accepted

Title: Defer per-exercise and final-application documentation until that unit of work starts

Context: Scaffolding `docs/architecture.md`, `decisions.md`, `changelog.md`, and `roadmap.md` for all 28 exercises and the final application immediately would create files with no real content, since no exercise has been implemented yet.

Options considered:
1. Create the full documentation skeleton for every exercise now, as empty placeholders.
2. Create only the project-wide `docs/` now, and scaffold each exercise's/the final application's `docs/` folder when that unit of work actually starts, alongside its `SPEC.md`.

Decision: Option 2.

Rationale: A document without real, current content has no purpose and creates maintenance debt (see [rules.md](rules.md), Maintenance Guidelines).

Impact: `docs/architecture.md` and `docs/deployment.md` at the project-wide scope currently state that no implementation exists yet, rather than pre-describing planned work.

Consequences: Each exercise's Spec-Driven Development workflow (see [../AGENT.md](../AGENT.md)) now includes creating that exercise's `docs/` folder at the same step as its `SPEC.md`.

Related documentation: [structure.md](structure.md), [../AGENT.md](../AGENT.md)

## DEC-003

Date: 2026-09-09
Status: Accepted

Title: Use PostgreSQL, not "Python", as the project's relational database

Context: The original project brief listed "SQL or Python" as alternative databases to choose between. Python is a programming language, not a database, so this was a naming mix-up rather than an intended comparison.

Options considered:
1. PostgreSQL
2. MySQL
3. SQLite

Decision: PostgreSQL, used alongside MongoDB.

Rationale: The final application's core entities (users, customers, invoices, payments) need foreign keys and transactional consistency, which a relational database provides. PostgreSQL is a full-featured, widely used relational engine suited to that role; MongoDB is retained for schema-flexible, high-volume data (audit logs, notifications, activity feeds).

Impact: The curriculum includes a dedicated relational-modeling exercise (`sql-relational-modeling`) alongside the existing MongoDB schema-design exercise.

Related documentation: [roadmap.md](roadmap.md)

## DEC-004

Date: 2026-09-09
Status: Accepted

Title: Use kebab-case for exercise and project directory names

Context: The brief initially asked for exercise directory names to follow "international project-directory naming conventions, that is, BEM." BEM (Block\_\_Element--Modifier) is a CSS class-naming convention, not a directory-naming standard.

Options considered:
1. kebab-case (the actual npm/project-directory convention)
2. Literal BEM-style folder names

Decision: kebab-case.

Related documentation: [rules.md](rules.md)

## DEC-005

Date: 2026-09-09
Status: Accepted

Title: Keep the project-wide README concise; place the full curriculum in the roadmap

Context: The documentation standard's own guidance is that a README should stay high-level and delegate detail to specialized documents. The full 28-exercise curriculum (time estimates, descriptions, skills) has no other home yet, since per-exercise documentation is deferred (DEC-002).

Options considered:
1. Keep the full curriculum detail inside `docs/README.md`.
2. Move the full curriculum into `docs/roadmap.md`, treating each exercise as a planned initiative, and keep `docs/README.md` to a concise index that links there.

Decision: Option 2.

Rationale: `roadmap.md`'s own purpose ("planned initiatives," with status and objectives) is a natural fit for a not-yet-built curriculum, and this avoids introducing a new document type.

Related documentation: [README.md](README.md), [roadmap.md](roadmap.md)
