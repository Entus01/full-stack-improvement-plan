# Agent Instructions

This repository is a personal full-stack learning plan (see [docs/README.md](docs/README.md)): one exercise per top-level folder, built over 3 months, culminating in an enterprise invoice management system. Development is AI-assisted. This is the owner's first project done this way, so the workflow below is deliberately explicit.

Documentation conventions (naming, structure, SSOT rules) are defined in [docs/rules.md](docs/rules.md) and [docs/structure.md](docs/structure.md) — not restated here.

## Working method: Spec-Driven Development (SDD)

Spec-Driven Development means the **specification is written and agreed on before any code is written**, and the spec — not a verbal description — is what implementation is checked against. For each exercise:

1. **Spec first.** Before writing code for an exercise, write a short spec for it: what it must do, its inputs/outputs, and what "done" looks like (acceptance criteria). Copy [docs/templates/spec.template.md](docs/templates/spec.template.md) to `SPEC.md` inside that exercise's folder and fill it in — don't invent a different shape per exercise.
2. **Plan from the spec.** Propose an implementation plan (files, components, order of work) that satisfies the spec. Get explicit confirmation before writing code.
3. **Implement against the spec.** Build only what the spec calls for. If something the spec requires turns out to be ambiguous or infeasible, stop and revise the spec — don't silently improvise around it.
4. **Verify against acceptance criteria.** Before considering the exercise done, check the implementation against each acceptance criterion in the spec, not just "it runs."
5. **Never guess on ambiguity.** If a requirement is unclear, ask rather than assuming — the same rule applies to AI-assisted work here as to any other collaboration in this project.

## Repository conventions

- **One exercise per folder**, at the repository root, named in kebab-case per [docs/rules.md](docs/rules.md) (e.g. `invoice-status-manager`).
- **Numbering** in folder/README headings reflects build order (least to greatest difficulty), not priority.
- Each exercise folder is otherwise self-contained (its own `package.json`, source, and `SPEC.md`) unless the exercise's purpose is explicitly to integrate prior exercises (e.g. `invoice-management-system`).

## Tech stack

- **Frontend:** React + Vite.
- **Backend:** Node.js + Express.js.
- **Package management:** npm.
- **Databases:**
  - MongoDB — schema-flexible, high-volume data (audit logs, notifications, activity feeds).
  - PostgreSQL — core relational business data (users, roles, customers, products, invoices, payments), where foreign keys and transactions matter.

## Boundaries

- The curriculum (in [docs/roadmap.md](docs/roadmap.md)) lists exercises without solutions by design — it is the assignment, not the answer key. Do not add solution content to it.
- Do not restructure or renumber exercises without confirming — the build order is intentional (fundamentals → backend → integration).
- Do not create an exercise's `docs/` folder or `SPEC.md` before that exercise is actually started (see [docs/decisions.md](docs/decisions.md), DEC-002) — a document with no real content has no purpose.
