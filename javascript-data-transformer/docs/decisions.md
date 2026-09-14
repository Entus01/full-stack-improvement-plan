# Decisions

Decision log specific to this exercise. Project-wide decisions live in [../../docs/decisions.md](../../docs/decisions.md) and are not repeated here.

## DEC-001

Date: 2026-09-14
Status: Accepted

Title: Criteria are expressed as predicate/comparator/key-selector functions

Context: The SPEC left the format of filtering/sorting/searching/grouping criteria undefined. Two shapes were possible: caller-supplied functions (JS-idiomatic, mirrors native `Array.prototype` methods) or declarative config objects (e.g. `{ field, operator, value }`, easier to serialize but more restrictive).

Options considered:
1. Predicate/comparator functions.
2. Declarative config objects.
3. Support both.

Decision: Predicate/comparator functions — `(item) => boolean` for filtering/searching, `(a, b) => number` for sorting, `(item) => key` for grouping.

Rationale: Matches native JS idioms the library is already built against (see FR-1); avoids designing and maintaining a second, parallel criteria-description language.

Impact: Function signatures in `SPEC.md`'s Interface/Contract section now specify function-based criteria per operation.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-002

Date: 2026-09-14
Status: Accepted

Title: Missing/undefined properties are not specially handled

Context: Operations may reference a property that doesn't exist on a given item (e.g. sorting by `status` when an item has none).

Options considered:
1. Treat as `undefined`, let native JS comparison/filtering semantics apply.
2. Skip/exclude items missing the property.
3. Throw a descriptive error.

Decision: Option 1 — no special-casing.

Rationale: Consistent with DEC-001 (criteria are plain functions); the caller's function controls how a missing property is treated, the library doesn't intercept it.

Impact: The library does not validate that referenced properties exist; this responsibility sits with the caller-supplied function. Also resolves the SPEC's original "inconsistent properties across items" question — heterogeneous objects are supported by the same reasoning.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-003

Date: 2026-09-14
Status: Accepted

Title: Pagination throws on invalid page size or page number

Context: Pagination behavior for invalid or out-of-range page numbers/sizes was undefined.

Options considered:
1. Clamp to the nearest valid page.
2. Return an empty array.
3. Throw a descriptive error.

Decision: Option 3, extended to page size as well as page number (a non-positive or non-integer page size is also treated as invalid input and throws).

Rationale: Fail-fast at the library boundary is consistent with DEC-004's handling of invalid top-level input, and avoids silently returning misleading data for a caller bug.

Impact: Requesting page 1 of an empty (or smaller-than-page-size) result set is still valid and returns an empty array — only out-of-range/non-positive/non-integer page numbers or sizes throw. This also resolves the SPEC's original "empty array behavior" question for pagination specifically.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-004

Date: 2026-09-14
Status: Accepted

Title: Invalid top-level input throws a descriptive error

Context: FR-1 requires validating that input is an array of objects; FR-9 requires predictable handling of invalid input. The actual behavior on failure was undefined.

Options considered:
1. Throw a descriptive error.
2. Return an empty result silently.
3. Return the input unchanged.

Decision: Option 1.

Rationale: Silent degradation (options 2/3) hides caller bugs; a library boundary should fail loudly and clearly per FR-9's "predictable" requirement.

Impact: Distinguishes "invalid input" (throws) from "valid input, no matches" (returns an empty array/result, per FR-8's predictable-structure requirement) — these are different cases and are not conflated.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-005

Date: 2026-09-14
Status: Accepted

Title: Filtering and Searching remain separate functions despite an identical current contract

Context: DEC-001 made both Filtering (FR-3) and Searching (FR-5) predicate-based (`(item) => boolean`), making them functionally identical right now.

Options considered:
1. Merge into a single operation.
2. Keep both as separate functions with an identical signature.
3. Keep both separate, but give Searching a narrower, non-predicate contract (e.g. value + field list).

Decision: Option 2.

Rationale: Preserves the vocabulary already established in the SPEC and project roadmap; leaves room for Searching to diverge later (e.g. gaining multi-field text matching) without a breaking rename.

Impact: Two functions exist with the same signature for now; this is intentional, not an oversight.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-006

Date: 2026-09-14
Status: Accepted

Title: Grouping returns a `Map`, not a plain object

Context: `groupItems`'s return container wasn't specified by the SPEC — only that items are "organized by the key each item maps to" (DEC-001).

Options considered:
1. Plain object (`{ [key]: items[] }`).
2. `Map`.

Decision: `Map`.

Rationale: A key-selector function (per DEC-001) can return any value, not just strings — a plain object would silently coerce non-string keys (e.g. numbers, booleans) to strings, losing type information and risking collisions. `Map` also preserves key insertion order predictably and avoids prototype-related footguns plain objects have as ad hoc dictionaries.

Impact: Callers consuming `groupItems`'s result use `Map` methods (`.get`, `.has`, iteration) rather than object property access.

Related documentation: [../SPEC.md](../SPEC.md)

