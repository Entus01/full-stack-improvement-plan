# README

## Purpose

This repository is a personal 3-month full-stack learning plan: a sequence of independent exercises, each living in its own folder, culminating in a complete invoice management web application. Development is AI-assisted, following Spec-Driven Development (see [../AGENT.md](../AGENT.md)).

## Objectives

- Practice and reinforce full-stack development best practices across frontend, backend, and database layers.
- Build a portfolio of independent, well-documented exercises.
- Culminate in a production-shaped invoice management application.
- Apply Spec-Driven Development, with AI assistance, as the primary way of working.

## Project Summary

The plan is organized into three months of increasing difficulty: frontend fundamentals (Month 1), backend engineering (Month 2), and an integrated invoicing application (Month 3). Each exercise lives in its own kebab-case folder at the repository root. The full curriculum — time estimates, descriptions, and skills — is documented in [roadmap.md](roadmap.md), not repeated here.

## Documentation Model

This project follows the documentation standard defined at [Repos Documentation](https://entus01.github.io/Repos-Documentation/): a single `docs/` folder at the repository root holds project-wide documentation, while each exercise (and the final application), once started, holds its own `docs/` subfolder scoped to that unit of work. See [structure.md](structure.md) for the full layout and [decisions.md](decisions.md) (DEC-001, DEC-002) for why this model was adopted.

## Main Technologies

- React + Vite
- Node.js + Express.js
- npm
- MongoDB — schema-flexible, high-volume data
- PostgreSQL — core relational business data

## Development Principles

Project-wide conventions and standards are defined in [rules.md](rules.md); this document does not restate them.

## Installation and Development

There is no single shared application at the repository root — each exercise is self-contained. Once an exercise is started, its own `docs/README.md` documents how to install and run it. The same applies to the final invoice management application.

## Documentation Structure

- [README.md](README.md) — this file; project entry point.
- [glossary.md](glossary.md) — shared terminology (SSOT).
- [rules.md](rules.md) — project-wide conventions and standards (SSOT).
- [structure.md](structure.md) — directory and documentation layout (SSOT).
- [architecture.md](architecture.md) — current system architecture.
- [deployment.md](deployment.md) — build/deploy process.
- [decisions.md](decisions.md) — recorded decisions (ADR log).
- [changelog.md](changelog.md) — project evolution history.
- [roadmap.md](roadmap.md) — the full exercise curriculum and planned work.

## Exercises

Concise index only — full detail (time estimate, description, skills) lives in [roadmap.md](roadmap.md). Each exercise gets its own `docs/` directory once it is started; links below will be added at that point.

**Month 1 — Frontend Fundamentals & Clean Architecture**
01. javascript-data-transformer — array/object utility library (filter, sort, group, search, paginate)
02. form-validator — configurable, reusable form validation engine
03. local-storage-manager — CRUD abstraction over browser localStorage
04. react-component-library — reusable UI component collection
05. custom-hooks-collection — reusable custom React hooks
06. react-form-engine — dynamic, config-driven form generator
07. authentication-ui — Login/Register/Forgot/Reset Password interfaces
08. expense-tracker-client — full personal expense-tracking frontend

**Month 2 — Backend Engineering**
09. express-server-foundation — modular Express backend foundation
10. api-error-handler — centralized API error handling
11. jwt-auth-service — JWT-based authentication service
12. role-permission-system — multi-role permission engine (RBAC)
13. mongodb-schema-design — related MongoDB collections for flexible data
14. sql-relational-modeling — normalized PostgreSQL relational schema
15. file-upload-service — document upload/storage service
16. audit-log-system — action/event audit logging
17. notification-service — backend notification system

**Month 3 — Enterprise Application Development**
18. customer-management-system — customer administration module
19. product-catalog-system — product management platform
20. invoice-builder-engine — invoice generation engine
21. invoice-pdf-generator — invoice PDF rendering with preview parity
22. invoice-status-manager — invoice lifecycle/status management
23. invoice-search-engine — advanced invoice filtering, sorting, bulk export
24. payment-management-system — payment tracking linked to invoices
25. invoice-permission-system — role- and ownership-based invoice access control
26. invoice-history-tracker — invoice change/audit history
27. invoice-dashboard — invoice analytics dashboard
28. invoice-management-system — final integrated application

## Fundamental Principle

This README provides an overview of the project and a map to the rest of the documentation. It does not duplicate detail that belongs in [roadmap.md](roadmap.md) or in each exercise's own documentation.
