# SPEC — <javascript-data-transformer>

## Metadata

- Exercise: `javascript-data-transformer`
- Roadmap entry: [docs/roadmap.md](../../docs/roadmap.md) — `#NN. javascript-data-transformer`
- Status: Done
- Created: 2026-09-10
- Last updated: 2026-09-14

*Status moves Draft → Approved (once the plan step in AGENT.md is confirmed) → In Progress → Done. Update "Last updated" whenever the spec itself changes.*

## Summary

Create a utility library for manipulating the contents of arrays of objects. The library should facilitate working with different types of lists and adapting them to user requirements on a daily basis, including filtering, sorting, grouping, and pagination.

## Scope

### In scope

- Manipulating arrays of objects through reusable functions.
- Filtering list contents based on user-defined criteria.
- Sorting list contents according to different criteria or orders.
- Searching for specific content within a list.
- Grouping list items based on shared properties or criteria.
- Paginating list contents into smaller subsets.
- Supporting different types of lists and data structures where applicable.
- Combining these utilities to adapt list data to different user requirements.

### Out of scope

- User interface or visual presentation beyond what is necessary to demonstrate the utilities.
- Backend or server-side functionality.
- Database integration or data persistence.
- API integration or external data sources.
- Authentication or authorization.
- Application-specific business logic.
- Advanced state management or global state.
- Performance optimization beyond what is necessary for the exercise.
- Features unrelated to filtering, sorting, searching, grouping, or pagination.

## Functional Requirements

- FR-1: The utility library must validate that the provided input is an array containing objects before performing list operations.

- ~~FR-2: The utility library must identify or validate the object properties available for operations that require a property, such as filtering, sorting, searching, or grouping.~~ **Removed** — conflicted with DEC-002 (missing/undefined properties get no special handling; property access is the caller-supplied function's responsibility). See [docs/decisions.md](docs/decisions.md), DEC-007.

- FR-3: The utility library must filter list items according to user-defined criteria.

- FR-4: The utility library must sort list items according to a user-defined property and sort order.

- FR-5: The utility library must search list items according to a user-defined search criterion and return the matching results.

- FR-6: The utility library must group list items according to a user-defined property or grouping criterion.

- FR-7: The utility library must divide list items into pages according to a user-defined page size and page selection.

- FR-8: The utility library must return results in a predictable and consistent structure after each operation.

- FR-9: The utility library must handle invalid or unsupported inputs without producing unexpected results.

- FR-10: The utility library must allow its list operations to be used independently and, where applicable, combined to produce the desired list transformation.

- FR-11: The utility library must allow multiple functions to be combined so that users can apply multiple criteria to progressively refine or customize list results.

## Interface / Contract

### Function/API Signatures

The utility library must expose reusable functions for operating on arrays of objects.

Each function must receive the data it operates on and the criteria required for its specific operation, and return the resulting data without exposing its internal implementation.

The library must provide functions for:

* **Filtering** - receives an array of objects and a predicate function `(item) => boolean`; returns a new array containing only the items for which the predicate returns `true`.
* **Sorting** - receives an array of objects and a comparator function `(a, b) => number`; returns a new array ordered according to the comparator (same contract as `Array.prototype.sort`).
* **Searching** - receives an array of objects and a predicate function `(item) => boolean`; returns a new array containing only the items for which the predicate returns `true`. Currently identical in contract to Filtering, by deliberate choice — see [docs/decisions.md](docs/decisions.md), DEC-005.
* **Grouping** - receives an array of objects and a key-selector function `(item) => key`; returns the items organized by the key each item maps to.
* **Pagination** - receives an array of objects, a page size, and a page number; returns the corresponding subset of items. Throws a descriptive error for a non-positive or non-integer page size, or a page number beyond the available range — see [docs/decisions.md](docs/decisions.md), DEC-003.

Missing or undefined properties referenced inside a predicate, comparator, or key-selector function are not specially handled by the library — native JavaScript semantics apply (see [docs/decisions.md](docs/decisions.md), DEC-002). Invalid top-level input (not an array, or containing non-object items) causes the library to throw a descriptive error rather than returning a partial or empty result (see [docs/decisions.md](docs/decisions.md), DEC-004).

The functions must be usable independently and must support sequential combination where the output of one function can be used as the input of another.

### Example

**Input:**

A list of invoice objects containing information such as the invoice ID, creator, billed client, and date.

**Operation:**

Apply user-defined criteria to filter, sort, search, group, paginate, or any other type of accomodation of the invoice list.

**Output:**

A transformed result containing the invoice objects that satisfy the requested criteria, preserving the expected data structure.

## Non-Functional Requirements

* The library must use native JavaScript functionality and must not add external dependencies.
* The utility functions must avoid mutating the original input data unless mutation is explicitly required by the operation.
* Invalid input and unsupported criteria must be handled predictably without causing unexpected runtime failures.
* Functions should remain reusable and independent of the UI or presentation layer.
* The implementation should prioritize readable, maintainable, and documented code according to the project conventions defined in [docs/rules.md](../../docs/rules.md).
* The exercise does not require specific performance targets beyond reasonable efficiency for typical list sizes used during development and testing.
* Browser or environment support beyond the project's existing configuration is not required.

## Assumptions & Open Questions

None currently open. Every item originally listed here has been resolved and logged in [docs/decisions.md](docs/decisions.md):

* Criteria format (predicate/comparator/key-selector functions) — DEC-001.
* Missing/undefined property behavior, and support for objects with inconsistent properties across items — DEC-002.
* Pagination edge cases (invalid page size/number, empty-result pages) — DEC-003.
* Invalid top-level input handling, distinct from valid-input-no-matches — DEC-004.
* Filtering vs. Searching remaining separate functions despite an identical current contract — DEC-005.

Object shape (no fixed schema required — the library is generic) and mutation policy (no mutation; see this SPEC's Non-Functional Requirements) needed no separate decision record — they were already answered by the existing spec text.


## Acceptance Criteria

* [x] **AC-1 (FR-1):** The library validates that the provided input is an array containing objects and handles invalid input predictably. — `validateInput.js`, `tests/validateInput.test.js`.
* ~~[ ] **AC-2 (FR-2)**~~ **Removed** — FR-2 was removed (DEC-007); this criterion no longer applies.
* [x] **AC-3 (FR-3):** Filtering returns only the objects that satisfy the provided criteria. — `filterItems.js`, `tests/filterItems.test.js`.
* [x] **AC-4 (FR-4):** Sorting returns the objects ordered according to the selected property and sort order. — `sortItems.js`, `tests/sortItems.test.js`.
* [x] **AC-5 (FR-5):** Searching returns the objects that match the provided search criterion. — `searchItems.js`, `tests/searchItems.test.js`.
* [x] **AC-6 (FR-6):** Grouping organizes the objects according to the selected grouping property or criterion. — `groupItems.js`, `tests/groupItems.test.js`.
* [x] **AC-7 (FR-7):** Pagination returns only the objects belonging to the requested page and respects the configured page size. — `paginateItems.js`, `tests/paginateItems.test.js`.
* [x] **AC-8 (FR-8):** Each utility returns results using a predictable and consistent data structure. — every operation always returns the same kind of structure across calls (array for filter/search/sort/paginate, `Map` for group per DEC-006).
* [x] **AC-9 (FR-9):** Invalid or unsupported inputs are handled according to the defined error-handling rules without causing unexpected runtime failures. — covered across all test files (TypeError/RangeError cases).
* [x] **AC-10 (FR-10):** Each utility can be used independently, and compatible utilities can be combined sequentially. — `tests/index.test.js`.


## Definition of Done

* All acceptance criteria above are met.
* All utility functions are implemented and work independently.
* Compatible utility functions can be combined as defined by the functional requirements.
* Edge cases and invalid inputs identified in the specification are handled as expected.
* The exercise documentation is complete and reflects the final implementation.
* Tests covering the defined functional requirements and relevant edge cases are passing.
* No unexpected console errors or warnings are present during execution.
* No external dependencies have been added.
* The implementation follows the project conventions defined in [docs/rules.md](../../docs/rules.md).

## Revision History

| Date | Change | Reason |
|---|---|---|
| 2026-09-10 | Initial draft | — |
| 2026-09-14 | Removed duplicated "Interface / Contract" heading; resolved all open questions (criteria format, missing-property handling, pagination edge cases, invalid-input handling, filter/search overlap) and updated the Interface/Contract section accordingly | Open questions were blocking a concrete implementation plan; resolutions logged in [docs/decisions.md](docs/decisions.md) DEC-001–DEC-005 |
| 2026-09-14 | Implemented all five operations plus shared guards (`validateInput`, `assertFunction`); 9 of 10 acceptance criteria checked off with 46 passing tests. `groupItems`'s `Map` return type logged as DEC-006. AC-2/FR-2 found to conflict with DEC-002 and left unresolved — flagged for a decision | Implementation plan (files + order of work) confirmed and executed |
| 2026-09-14 | Removed FR-2 and AC-2 (struck through, kept for traceability); all remaining acceptance criteria are met. Status moved to Done | FR-2 conflicted with the already-made DEC-002; resolved by dropping FR-2 rather than reversing DEC-002 — see [docs/decisions.md](docs/decisions.md), DEC-007 |
