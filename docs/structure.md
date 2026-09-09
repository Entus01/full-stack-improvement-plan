# Organization Principles

- One exercise per top-level folder.
- One documentation responsibility per file (see [rules.md](rules.md) for naming conventions).
- Project-wide documentation is centralized at the repository root; exercise-specific and final-application-specific documentation stays inside that unit's own folder.
- Exercise and final-application documentation sets are scaffolded only once that unit of work actually starts (see [decisions.md](decisions.md), DEC-002) — this document defines the convention in advance, not the files themselves.

## Base Repository Structure

```
React-components-test/
├── README.md                    ← stub, points to docs/README.md
├── AGENT.md                     ← AI collaboration / SDD workflow
├── docs/                        ← project-wide documentation (this folder)
│   ├── README.md
│   ├── glossary.md
│   ├── rules.md
│   ├── structure.md
│   ├── architecture.md
│   ├── deployment.md
│   ├── decisions.md
│   ├── changelog.md
│   └── roadmap.md
├── <exercise-name>/              ← one per exercise, created when started
│   ├── docs/
│   │   ├── README.md
│   │   ├── architecture.md
│   │   ├── decisions.md
│   │   ├── changelog.md
│   │   └── roadmap.md
│   ├── SPEC.md                  ← written before implementation (SDD)
│   └── ...source files
└── invoice-management-system/    ← final application, created when started
    ├── docs/
    │   ├── README.md
    │   ├── architecture.md
    │   ├── decisions.md
    │   ├── changelog.md
    │   ├── roadmap.md
    │   └── deployment.md         ← final app only; deploys a real, running app
    ├── SPEC.md
    └── ...source files
```

## Documentation Organization

- **Project-wide** (`docs/`): glossary, rules, structure, current architecture, deployment, decisions, changelog, roadmap — one of each for the whole repository.
- **Per-exercise** (`<exercise>/docs/`): README, architecture, decisions, changelog, roadmap — scoped to that exercise only. No `deployment.md` at exercise scope; exercises are not deployed as standalone products.
- **Final application** (`invoice-management-system/docs/`): the same five files as an exercise, plus `deployment.md`, since it is the one unit of work in this repository that is actually built and deployed as a real application.

## Responsibility Placement

- Information relevant to the whole repository (terminology, conventions, cross-cutting decisions) → `docs/` at the root.
- Information relevant to one exercise only (its own architecture, decisions, history, planned extensions) → that exercise's `docs/` folder.
- Information relevant to running/deploying the final application → `invoice-management-system/docs/deployment.md`.

## Configuration Files

Each exercise is self-contained and manages its own `package.json`/configuration; no shared root-level configuration exists yet. This section will be updated if shared tooling is introduced.

## Frontend Exercises (Reference)

Client-only exercises (e.g. `react-component-library`) live entirely inside their own folder; no backend or database scaffolding is required.

## Backend Exercises (Reference)

Server-only exercises (e.g. `express-server-foundation`) live entirely inside their own folder; no frontend scaffolding is required.

## Fullstack Exercises (Reference)

Exercises spanning frontend and backend (e.g. `invoice-management-system`) may contain their own internal client/server separation; that internal layout is documented in the exercise's own `docs/architecture.md` once it exists, not here.

## Structure Evolution

This structure is expected to stay stable as exercises are added — new exercises follow the same `<exercise>/docs/` pattern rather than introducing new conventions. Any change to this convention itself should be recorded in [decisions.md](decisions.md) and reflected here.

## Root Organization Principle

The repository root stays minimal: a stub `README.md`, `AGENT.md`, the project-wide `docs/` folder, and one folder per exercise. Nothing else is added at the root without an explicit decision recorded in [decisions.md](decisions.md).
