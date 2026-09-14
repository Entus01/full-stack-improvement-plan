# Current Architecture

## Summary

A small, dependency-free ES module library. Five public operations (filter, search, sort, group, paginate) each live in their own module and share two internal guards (`validateInput`, `assertFunction`). All public functions are re-exported from `src/index.js`.

## Main Technologies

- Plain JavaScript (ESM) — no runtime dependencies, per [../SPEC.md](../SPEC.md) non-functional requirements.
- Vitest — test framework (project-wide convention, see [../../docs/decisions.md](../../docs/decisions.md), DEC-007).

## Main Modules

- `src/validateInput.js` — validates that `items` is an array of plain objects; throws `TypeError` otherwise (DEC-004).
- `src/assertFunction.js` — validates that a criteria argument (predicate/comparator/key-selector) is actually a function; throws `TypeError` otherwise.
- `src/filterItems.js` — FR-3. Predicate-based filtering.
- `src/searchItems.js` — FR-5. Predicate-based, currently identical to `filterItems` (DEC-005).
- `src/sortItems.js` — FR-4. Comparator-based sorting; returns a new array (does not mutate input).
- `src/groupItems.js` — FR-6. Key-selector-based grouping; returns a `Map` (DEC-006).
- `src/paginateItems.js` — FR-7. Page-size/page-number-based slicing; throws `RangeError` on invalid or out-of-range paging input (DEC-003).
- `src/index.js` — re-exports the five public functions.

## General Flow

```
caller → validateInput(items) → assertFunction(criteriaFn) [where applicable] → operation → new array/Map
```

Every public function validates its own arguments independently; there is no shared "pipeline" object — combining operations means calling one function's output as the next function's input (FR-10/FR-11), as demonstrated in `tests/index.test.js`.

## External Integrations

None — out of scope per [../SPEC.md](../SPEC.md).

## Architectural Dependencies

- `filterItems`, `searchItems`, `sortItems`, `groupItems`, `paginateItems` each depend on `validateInput`.
- `filterItems`, `searchItems`, `sortItems`, `groupItems` additionally depend on `assertFunction` (`paginateItems` does not — its extra arguments are validated directly as numbers, not functions).

## Technical Considerations

- `groupItems` returns a `Map` rather than a plain object specifically to support non-string keys without coercion (DEC-006) — callers must use `Map` methods, not object property access.
- `paginateItems` throws rather than clamping or silently returning an empty result for invalid/out-of-range paging input (DEC-003); page 1 of an empty array is the one case that's valid and returns `[]`.
