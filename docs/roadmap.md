# Roadmap

The full exercise curriculum for this project, tracked as planned initiatives. All initiatives below are currently **Planned**; this document is updated to **In Progress** / **Completed** as work actually happens (see [decisions.md](decisions.md), DEC-002, for why individual exercise documentation is not scaffolded until then).

Sequence is fixed by month and number (least to greatest difficulty) rather than by a separate priority ranking — see [glossary.md](glossary.md) for the "Initiative" term.

Total planned timeframe: 3 months. Database split: MongoDB for schema-flexible/high-volume data, PostgreSQL for core relational business data (see [decisions.md](decisions.md), DEC-003).

## Planned

### Month 1 — Frontend Fundamentals & Clean Architecture

#### 01. javascript-data-transformer — Status: In Progress (see [In Progress](#in-progress) below)
- Estimated time: 8–12 hours
- Objectives: Create a utility library that receives arrays of objects and allows filtering, sorting, grouping, searching, and pagination.
- Skills:
  - Array methods — built-in JS functions (map, filter, reduce, sort, etc.) for processing collections without manual loops.
  - Immutability — producing new data instead of mutating the original input.
  - Pure functions — functions whose output depends only on their input, with no side effects.
  - Functional programming — composing small, single-purpose functions into more complex behavior.
  - Data transformation — reshaping data from one structure into another a consumer needs.
  - Clean code — naming and structure that make intent obvious without extra comments.
  - Documentation — describing a function's purpose, parameters, and return values for other developers.

#### 02. form-validator
- Estimated time: 10–14 hours
- Objectives: Build a reusable validation engine capable of validating forms through configurable rules.
- Skills:
  - Regular expressions — pattern matching used to validate string formats (emails, phone numbers, etc.).
  - Validation patterns — strategies for defining and applying rules consistently across different data shapes.
  - Error handling — capturing and reporting invalid input in a predictable, structured way.
  - Reusable functions — writing logic once and applying it across many contexts without duplication.
  - Separation of concerns — keeping validation logic independent from UI rendering logic.

#### 03. local-storage-manager
- Estimated time: 6–10 hours
- Objectives: Create an abstraction layer over the browser's localStorage to handle CRUD operations and data serialization.
- Skills:
  - Browser APIs — built-in browser interfaces (like localStorage) for interacting with the client environment.
  - JSON serialization — converting JS objects to strings for storage and parsing them back.
  - Error handling — handling storage limits, corrupted data, or unavailable storage gracefully.
  - Abstraction — hiding implementation details behind a simple, consistent interface.

#### 04. react-component-library
- Estimated time: 14–18 hours
- Objectives: Develop a collection of reusable UI components with a consistent API.
- Skills:
  - React fundamentals — components, JSX, and rendering behavior.
  - Props — the mechanism for passing data and configuration into components.
  - Component composition — building complex UI by combining smaller components.
  - Reusability — designing components generic enough to be used in different contexts without modification.

#### 05. custom-hooks-collection
- Estimated time: 10–14 hours
- Objectives: Build several reusable custom hooks for common frontend business needs.
- Skills:
  - useState — React's hook for managing local component state.
  - useEffect — React's hook for running side effects tied to a component's lifecycle.
  - Custom hooks — extracting reusable stateful logic out of components into shared functions.
  - State isolation — ensuring each hook instance keeps its own independent state.
  - Reusability — writing logic once that many components can adopt.

#### 06. react-form-engine
- Estimated time: 16–20 hours
- Objectives: Develop a dynamic form generator that renders fields, layout, and validation from a configuration object.
- Skills:
  - Dynamic rendering — generating UI at runtime based on data rather than hardcoded markup.
  - Controlled inputs — form inputs whose value is driven by React state rather than the DOM.
  - Form management — tracking values, touched/dirty state, and submission across many fields.
  - Validation integration — connecting a form to a validation engine (see exercise 02).
  - Component architecture — structuring components so the system stays maintainable as it grows.

#### 07. authentication-ui
- Estimated time: 14–18 hours
- Objectives: Create Login, Register, Forgot Password, and Reset Password interfaces.
- Skills:
  - Form handling — collecting, validating, and submitting user input.
  - Routing — navigating between views in a single-page application.
  - Component design — structuring UI pieces for clarity and reuse.
  - Authentication workflows — the standard steps and states involved in signing up, logging in, and recovering access.
  - UX patterns — conventions users expect from authentication flows (feedback, error states, redirects).

#### 08. expense-tracker-client
- Estimated time: 20–26 hours
- Objectives: Build a complete frontend for personal expense tracking.
- Skills:
  - CRUD UI — interfaces for creating, reading, updating, and deleting records.
  - Filtering — narrowing displayed data based on user-selected criteria.
  - Search — locating records matching a text query.
  - Charts — visualizing data (e.g., spending by category) graphically.
  - State management — coordinating shared application state across components.
  - Pagination — splitting large data sets into navigable pages.

### Month 2 — Backend Engineering

#### 09. express-server-foundation
- Estimated time: 8–12 hours
- Objectives: Create a backend foundation with modular architecture and environment configuration.
- Skills:
  - Express.js — the Node.js web framework used to build HTTP APIs.
  - Environment variables — externalizing configuration (ports, secrets, URLs) from code.
  - Middleware — functions that run in the request/response pipeline before reaching a route handler.
  - Routing — mapping HTTP methods and paths to handler functions.
  - Folder organization — structuring a backend project so responsibilities are easy to locate.
  - Configuration management — handling different settings across environments (dev, test, prod).

#### 10. api-error-handler
- Estimated time: 6–10 hours
- Objectives: Develop a centralized error handling system.
- Skills:
  - Error management — catching and classifying errors consistently across an application.
  - Middleware — Express's mechanism for intercepting errors before they reach the client.
  - Logging — recording errors and relevant context for later diagnosis.
  - API standards — conventions for consistent, predictable API responses.
  - HTTP responses — using status codes and response bodies correctly.

#### 11. jwt-auth-service
- Estimated time: 12–16 hours
- Objectives: Create an authorization service using JWT.
- Skills:
  - Authentication — verifying that a user is who they claim to be.
  - Authorization — determining what an authenticated user is allowed to do.
  - Token management — issuing, verifying, and refreshing JWTs.
  - Password hashing — storing passwords irreversibly using a hashing algorithm.
  - Security principles — general practices for protecting credentials and sessions.

#### 12. role-permission-system
- Estimated time: 14–18 hours
- Objectives: Develop a permission engine supporting multiple user roles.
- Skills:
  - RBAC (see [glossary.md](glossary.md)) — restricting actions based on a user's assigned role.
  - Authorization — enforcing what each role is permitted to do.
  - Middleware — intercepting requests to check permissions before they reach a handler.
  - Security architecture — structuring a system so access rules are consistent and hard to bypass.
  - Database relationships — modeling how roles, users, and permissions relate to each other.

#### 13. mongodb-schema-design
- Estimated time: 12–16 hours
- Objectives: Design multiple related MongoDB collections modeling a schema-flexible part of the business domain (e.g., logs or notifications).
- Skills:
  - Database design — deciding how data should be structured and related.
  - Mongoose — the ODM (Object-Document Mapper) used to define schemas and interact with MongoDB from Node.js.
  - Relationships — referencing or embedding related documents across collections.
  - Validation — enforcing data shape and constraints at the schema level.
  - Indexing — speeding up queries by indexing frequently searched fields.

#### 14. sql-relational-modeling
- Estimated time: 14–18 hours
- Objectives: Design a normalized relational schema in PostgreSQL for entities that require strict referential integrity (e.g., users, customers, products).
- Skills:
  - Relational modeling — organizing data into tables with defined relationships (one-to-many, many-to-many).
  - Normalization — structuring tables to reduce redundancy and inconsistency.
  - Foreign keys — constraints that enforce valid relationships between tables.
  - Transactions — grouping multiple operations so they succeed or fail together.
  - Migrations — versioned, repeatable changes to a database schema over time.
  - SQL / ORM usage — querying and mapping relational data from Node.js.

#### 15. file-upload-service
- Estimated time: 10–14 hours
- Objectives: Build a service capable of uploading and managing documents.
- Skills:
  - File handling — receiving, processing, and storing uploaded files server-side.
  - Storage architecture — deciding where and how uploaded files are kept.
  - Security validation — checking file type, size, and content to prevent unsafe uploads.
  - API design — exposing upload/download/delete operations through a clean interface.

#### 16. audit-log-system
- Estimated time: 10–14 hours
- Objectives: Register every important action performed by users.
- Skills:
  - Event tracking — capturing meaningful actions as discrete records.
  - Database logging — persisting event records for later review.
  - User activity history — reconstructing what a user did and when.
  - Compliance concepts — why systems need traceability of who did what.

#### 17. notification-service
- Estimated time: 12–16 hours
- Objectives: Create a backend notification system.
- Skills:
  - Event-driven design — triggering actions in response to events rather than direct calls.
  - Service architecture — structuring a standalone service with a clear responsibility.
  - Background processes — running work outside the main request/response cycle.
  - Message management — queuing, formatting, and delivering notification content.

### Month 3 — Enterprise Application Development

#### 18. customer-management-system
- Estimated time: 16–20 hours
- Objectives: Build a complete customer administration module.
- Skills:
  - Full CRUD — create, read, update, and delete across both API and UI.
  - Database relations — connecting customers to other entities (e.g., invoices, users).
  - Search — finding customers matching a query.
  - Filters — narrowing customer lists by attributes.
  - Pagination — paging through large customer lists.
  - Business rules — constraints specific to the domain (e.g., unique tax IDs).

#### 19. product-catalog-system
- Estimated time: 16–20 hours
- Objectives: Create a complete product management platform.
- Skills:
  - Inventory concepts — tracking stock, pricing, and availability.
  - CRUD operations — managing product records end-to-end.
  - Validation — ensuring product data meets required constraints.
  - Search optimization — making product lookups fast and relevant.
  - Categorization — organizing products into groups for browsing and filtering.

#### 20. invoice-builder-engine
- Estimated time: 20–26 hours
- Objectives: Develop an engine capable of generating invoices from customers and products, including line items and totals.
- Skills:
  - Business logic — encoding the domain rules that define a valid invoice.
  - Calculations — computing subtotals, taxes, discounts, and totals correctly.
  - Data relationships — linking invoices to their customers, products, and creators.
  - Architecture design — structuring the engine so it stays testable and extensible.

#### 21. invoice-pdf-generator
- Estimated time: 16–20 hours
- Objectives: Build a service that renders an invoice into a PDF, plus a preview view showing exactly what a recipient will see when the invoice is emailed or downloaded.
- Skills:
  - PDF generation — programmatically producing PDF documents from structured data.
  - Template design — separating an invoice's visual layout from its underlying data.
  - Rendering consistency — ensuring the on-screen preview, the emailed copy, and the downloaded file all match.
  - Document architecture — structuring reusable templates for different document types.

#### 22. invoice-status-manager
- Estimated time: 14–18 hours
- Objectives: Implement invoice lifecycle management across its valid statuses.
- Skills:
  - State machines — modeling the valid statuses an invoice can be in and the allowed transitions between them.
  - Status semantics — Draft, Pending, Sent, Partially Paid, Paid, Overdue, Cancelled, and what each means for the business.
  - Business rules — enforcing which status transitions are legal and when.

#### 23. invoice-search-engine
- Estimated time: 16–20 hours
- Objectives: Create an advanced invoice filtering and sorting system, including exporting more than one invoice at a time.
- Skills:
  - Query building — constructing database queries dynamically from user-selected criteria.
  - Dynamic filters — combining multiple optional filters (customer, date range, product, status, amount, creator) at once.
  - Sorting — ordering results by a chosen field, such as invoice number.
  - Bulk operations — acting on multiple selected records at once (e.g., exporting several invoices together).
  - Pagination — paging through large result sets.
  - Database optimization — keeping filtered/sorted queries performant as data grows.

#### 24. payment-management-system
- Estimated time: 18–22 hours
- Objectives: Develop a payment module linked to invoices, tracking partial and full payments over time.
- Skills:
  - Financial calculations — computing amounts paid, remaining balances, and totals accurately.
  - Transaction management — ensuring payment operations complete atomically and consistently.
  - Validation — preventing invalid payment states (e.g., overpayment).
  - Database consistency — keeping invoice and payment records in sync.

#### 25. invoice-permission-system
- Estimated time: 14–18 hours
- Objectives: Implement invoice access control according to user role and resource ownership.
- Skills:
  - RBAC — restricting invoice actions by role (e.g., Superadmin, Administrator, Accountant, Manager, Sales Rep, Viewer).
  - Resource ownership — restricting access further based on who created or owns a given invoice.
  - Security — preventing unauthorized access to or modification of invoice data.
  - Access policies — the rules that define what each role/ownership combination is allowed to do.

#### 26. invoice-history-tracker
- Estimated time: 12–16 hours
- Objectives: Track every modification made to an invoice over its lifetime (created, edited, sent, paid, archived, deleted, restored).
- Skills:
  - Audit trails — a chronological record of who changed what and when.
  - Data versioning — retaining prior states of a record as it changes.
  - Change tracking — detecting and recording differences between versions of a record.

#### 27. invoice-dashboard
- Estimated time: 18–22 hours
- Objectives: Develop a business dashboard for invoice analytics.
- Skills:
  - Aggregation queries — computing summary statistics (totals, averages, counts) across many records.
  - Reporting — presenting computed business metrics in a readable form.
  - Dashboard design — laying out multiple metrics and charts coherently.
  - Data visualization — representing metrics like revenue, overdue amounts, and top customers/products graphically.

#### 28. invoice-management-system (final application)
- Estimated time: 40–60 hours
- Objectives: Build the complete application by integrating all previous exercises into one unified invoicing platform.
- Skills:
  - Software architecture — organizing many previously separate pieces into one coherent system.
  - Feature integration — combining independently built modules without breaking their contracts.
  - Security — applying authentication, authorization, and audit consistently across the whole app.
  - Scalability — designing so the system can handle growing data and usage.
  - Maintainability — keeping a large codebase easy to understand and change.
  - Testing — verifying the integrated system behaves correctly.
  - Documentation — describing the finished system for future maintainers.
- Minimum features:
  - User management: register, login, logout, role management.
  - Customer management: create, edit, delete, search.
  - Product management: create, edit, delete, search.
  - Invoice management: create, edit, delete, duplicate, send, archive, download (single or multiple).
  - Invoice status: draft, pending, sent, overdue, partially paid, paid, cancelled.
  - Payment management: register payment, partial payment, full payment, payment history.
  - Document preview: PDF preview matching exactly what is emailed or downloaded.
  - Search and filters: customer, product, date, amount; sort by invoice number.
  - Security: authentication, authorization, resource ownership, audit log.
  - Reporting: revenue, customer, product, and invoice reports.

## In Progress

- **01. javascript-data-transformer** — implementation mostly complete (9/10 acceptance criteria, 46 passing tests); blocked on resolving a conflict between FR-2 and DEC-002 before it can move to Completed. See `javascript-data-transformer/SPEC.md` and `javascript-data-transformer/docs/`.

## Completed

None yet.

## On Hold

None yet.
