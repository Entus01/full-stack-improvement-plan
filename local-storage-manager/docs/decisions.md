# Decisions

Decision log specific to this exercise. Project-wide decisions live in [../../docs/decisions.md](../../docs/decisions.md) and are not repeated here.

## DEC-001

Date: 2026-09-18
Status: Accepted

Title: Collapse `create`/`update` into a single unconditional `save`

Context: The initial SPEC draft defined `create` (fails if the key already exists) and `update` (fails if the key doesn't exist) as separate operations, but never defined what actually happens in either edge case — despite acceptance criteria requiring that behavior to be "explicitly defined in the Interface / Contract."

Options considered:
1. Define the missing edge-case outcomes for both `create` and `update`, keeping them separate.
2. Collapse both into one `save(key, value)` that writes unconditionally, creating or overwriting as needed.

Decision: Option 2.

Rationale: The strict two-verb split adds real work for every caller (checking which state a key is in, or handling two different failure modes) for no benefit this exercise's learning goal needs. A single unconditional write removes the undefined edge case entirely rather than requiring a new decision to patch it.

Impact: FR-1 and FR-3 (Create/Update) merged into one FR; FR-8 ("handle update on non-existent data") removed as moot. Interface/Contract now exposes `save`, not `create`/`update`.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-002

Date: 2026-09-18
Status: Accepted

Title: `null`/`undefined` are not valid storable values

Context: The Interface/Contract locked in `null` as `read`'s "not found" sentinel, while Open Questions simultaneously asked whether `null` should be a valid stored value — a direct contradiction, since if a caller could store `null`, `read` couldn't distinguish "stored null" from "nothing stored."

Decision: `save` rejects `null` and `undefined` as values, returning a descriptive error rather than storing them. The literal string `"null"` is unaffected — this only blocks the JS primitives, not string content.

Rationale: Removes the contradiction outright — once a caller can never successfully store `null`, `read` returning `null` can only ever mean "not found."

Impact: New failure case for `save` (FR-6). `read`'s `value: null` is now unambiguous.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-003

Date: 2026-09-18
Status: Accepted

Title: Uniform `{ success, error }` result shape, not bare `boolean`/`unknown | null`

Context: `save`/`delete` returned bare `boolean`, `read` returned `unknown | null`, `has` returned `boolean` — none of these let a caller learn *why* an operation failed, only *whether*.

Decision: Every operation returns a structured result: `{ success: boolean, error: string | null }` for `save`/`delete`; `{ success: boolean, value: unknown | null, error: string | null }` for `read`; `{ success: boolean, exists: boolean, error: string | null }` for `has`. A missing key on `read`/`has` is `success: true` (a normal outcome, not a failure).

Rationale: A bare `false` return forces the caller to guess why something failed. A consistent shape across all four operations means callers learn one pattern, not four.

Impact: Full Interface/Contract rewrite; FR-10 added (every operation returns this shape); all Acceptance Criteria and Examples rewritten to match.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-004

Date: 2026-09-18
Status: Accepted

Title: "Unsupported value" scoped to what `JSON.stringify` actually throws on

Context: FR-10 (original) said the library must "handle... unsupported data appropriately" without defining what's unsupported. `JSON.stringify` only throws on circular references and `BigInt`; it silently drops functions/`Symbol`/`undefined`-in-objects and silently flattens `Date`/`Map`/`Set` rather than rejecting them.

Decision: "Unsupported" means only what `JSON.stringify` throws on (circular references, `BigInt`) — those trigger `{ success: false, error }`. Values it silently drops or transforms are not detected as errors; this is documented as an accepted limitation in Assumptions, not treated as a gap to close.

Rationale: Detecting silent-drop/transform cases would require a much larger validation pass than this exercise's scope calls for. Documenting the boundary explicitly turns a hidden gap into a deliberate, known one.

Impact: FR-7 added. Out of Scope gained an explicit bullet for this limitation.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-005

Date: 2026-09-18
Status: Accepted

Title: Invalid key and storage-unavailable/operation-failure handling use the same result shape

Context: Both were open questions with no defined behavior.

Decision: Both use the DEC-003 result shape. Invalid key (empty string, non-string) applies to all four operations. Storage unavailable or an operation failing (e.g. quota exceeded) also applies to all four operations, including `read` and `has` (not just the write operations) — "not found" and "storage genuinely failed" are different outcomes and must not look identical to the caller.

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-006

Date: 2026-09-18
Status: Accepted

Title: `delete` on a missing key is an error, not idempotent success

Context: Collapsing create/update into `save` (DEC-001) removed the "wrong state" edge case for writes, but `delete` on a key with no stored data still needed a defined outcome — either idempotent success ("already absent, that's the desired end state") or an explicit error.

Decision: Treat it as an error (`{ success: false, error: "..." }`).

Related documentation: [../SPEC.md](../SPEC.md)

## DEC-007

Date: 2026-09-18
Status: Accepted

Title: Rename the Remove operation's function from `delete` to `remove`

Context: The SPEC named this operation's function `delete` throughout (Interface/Contract, Examples, ACs). `delete` is a reserved JS keyword — `function delete(key) {}` is a syntax error, and even exported via `export { fn as delete }`, every consumer would be forced to rename it on import (`import { delete as x }`), since `delete` can't be used as a local binding either. Discovered while implementing the operation, not caught during the SPEC review.

Decision: Rename to `remove` everywhere — the function itself, and all SPEC references (Interface/Contract, Examples, ACs, DoD).

Related documentation: [../SPEC.md](../SPEC.md)
