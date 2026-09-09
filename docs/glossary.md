# Glossary

Shared terminology for this project. This is the single source of truth for the terms below — no other document should redefine them.

## Exercise

A single, independently completable unit of the learning plan, living in its own kebab-case folder at the repository root (e.g. `invoice-status-manager`). Numbered in build order (least to greatest difficulty), not by priority.

## Final Application

The last exercise (`invoice-management-system`) that integrates all previous exercises into one unified, production-shaped invoicing platform for a company.

## Spec-Driven Development (SDD)

The working method used in this project: a specification is written and agreed on before any code is written for an exercise, and implementation is checked against that specification rather than a verbal description. See `SPEC.md` and [../AGENT.md](../AGENT.md).

## SPEC.md

The per-exercise document that records an exercise's requirements, inputs/outputs, and acceptance criteria, written before implementation begins. Distinct from that exercise's `docs/` folder, which documents the exercise as it evolves.

## Documentation Root

The `docs/` folder at the repository root, holding project-wide documentation (as opposed to an exercise's own `docs/` subfolder, which is scoped to that exercise only).

## Initiative

An entry in [roadmap.md](roadmap.md) representing planned work — in this project, each exercise (and the final application) is tracked as one initiative.

## Kebab-case

A naming style using lowercase words separated by hyphens (e.g. `invoice-builder-engine`). The required naming convention for every exercise and project directory in this repository.

## Single Source of Truth (SSOT)

The principle that each piece of information is authoritatively defined in exactly one document; other documents reference it instead of repeating it.

## DEC (Decision Record)

A single entry in [decisions.md](decisions.md), identified as `DEC-XXX`, recording a decision's context, alternatives considered, and rationale.

## RBAC (Role-Based Access Control)

An authorization model that grants or restricts actions based on a user's assigned role (e.g. Superadmin, Administrator, Accountant, Manager, Sales Rep, Viewer in the final application).

## Invoice Status

The lifecycle state of an invoice in the final application: Draft, Pending, Sent, Partially Paid, Paid, Overdue, or Cancelled.
