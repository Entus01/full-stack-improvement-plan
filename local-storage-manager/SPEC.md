# SPEC — local-storage-manager

## Metadata

- Exercise: `local-storage-manager`
- Roadmap entry: [docs/roadmap.md](../docs/roadmap.md) — `#03. local-storage-manager`
- Status: In Progress
- Created: 2026-09-15
- Last updated: 2026-09-18

*Status moves Draft → Approved (once the plan step in AGENT.md is confirmed) → In Progress → Done. Update "Last updated" whenever the spec itself changes.*

## Summary

A reusable utility that stores, retrieves, and removes application data in the browser's local storage. It provides a simple, consistent interface for an application to manage locally stored data — including validation, serialization, and error reporting — without directly interacting with the browser's storage API.

## Scope

### In scope

- Save: store or overwrite application data under a caller-provided key, unconditionally — no distinction between a new key and an existing one.
- Read: retrieve data previously stored under a key.
- Remove: remove stored data associated with a key.
- Checking whether a requested key currently holds stored data.
- Handling different JavaScript data types such as strings, objects, and arrays.
- Treating a missing key on Read/Has as a normal outcome, not an error.
- Treating a missing key on Remove as an error.
- Rejecting `null`/`undefined` as values, and invalid keys, with a descriptive error.
- Detecting values `JSON.stringify` cannot serialize (circular references, `BigInt`) and reporting a descriptive error rather than storing partial or corrupted data.
- Detecting when browser storage is unavailable or an operation fails (e.g. quota exceeded) and reporting a descriptive error rather than failing silently or crashing.
- Returning a consistent, structured result (a success flag plus an error description on failure) from every operation.
- Converting data between JavaScript values and the format required by localStorage.

### Out of scope

- Data presentation: the manager does not display stored data to the user or provide UI feedback.
- Data interaction: the manager does not provide UI components for users to view, edit, or manipulate stored data.
- Application-specific behavior: the manager does not determine how stored data is used by the application.
- Detecting or preventing data loss from values `JSON.stringify` doesn't reject but silently alters (functions, `Symbol`, `undefined` nested in an object/array, `Date`, `Map`, `Set`) — see Assumptions.

## Functional Requirements

- FR-1 — Save: The library must store data under a caller-provided key, creating it if absent or overwriting it if present, without the caller needing to know which case applies.
- FR-2 — Read: The library must retrieve the data stored under a caller-provided key, and must not treat a key with no stored data as an error.
- FR-3 — Remove: The library must remove the data stored under a caller-provided key, and must treat a key with no stored data as an error.
- FR-4: The library must support structured JavaScript data (objects and arrays), not only primitives.
- FR-5 — Has: The library must indicate whether a caller-provided key currently holds stored data.
- FR-6: The library must reject `null` and `undefined` as values passed to Save, reporting a descriptive error.
- FR-7: The library must detect values that `JSON.stringify` cannot serialize (circular references, `BigInt`) when passed to Save, reporting a descriptive error instead of storing them.
- FR-8: The library must reject invalid storage keys across all operations, reporting a descriptive error.
- FR-9: The library must detect when browser storage is unavailable or an operation fails (e.g. quota exceeded), reporting a descriptive error instead of failing silently or throwing an unhandled exception.
- FR-10: Every operation must return a consistent, structured result — a success indicator plus an error description when unsuccessful.

## Interface / Contract

### Function/API signatures

- `save(key: string, value: unknown): { success: boolean, error: string | null }` — Stores data under the provided key, creating or overwriting it unconditionally.
- `read(key: string): { success: boolean, value: unknown | null, error: string | null }` — Retrieves the data associated with the provided key. A missing key is not an error: returns `{ success: true, value: null, error: null }`.
- `remove(key: string): { success: boolean, error: string | null }` — Removes the data associated with the provided key. A missing key is an error. (Named `remove`, not `delete` — `delete` is a reserved JS keyword and cannot be used as a function/import binding name.)
- `has(key: string): { success: boolean, exists: boolean, error: string | null }` — Indicates whether data is currently stored under the provided key.

**Failure conditions and which operations they apply to:**

| Cause | save | read | remove | has |
|---|---|---|---|---|
| Invalid key (e.g. empty string, non-string) | ✓ | ✓ | ✓ | ✓ |
| `null`/`undefined` passed as `value` | ✓ | — | — | — |
| `value` cannot be serialized (circular reference, `BigInt`) | ✓ | — | — | — |
| Browser storage unavailable, or the operation fails (e.g. quota exceeded) | ✓ | ✓ | ✓ | ✓ |
| Key has no stored data | — | — | ✓ | — |

The library does not provide encryption or other security guarantees for sensitive information stored in browser storage.

### Example

- **Save (new key)** — Input: `key = "userPreferences"`, `value = { theme: "dark", language: "en" }` → Output: `{ success: true, error: null }`
- **Save (overwrite existing key)** — Input: `key = "userPreferences"`, `value = { theme: "light", language: "en" }` → Output: `{ success: true, error: null }`
- **Save (rejected value)** — Input: `key = "userPreferences"`, `value = null` → Output: `{ success: false, error: "value cannot be null or undefined" }`
- **Read (found)** — Input: `key = "userPreferences"` → Output: `{ success: true, value: { theme: "light", language: "en" }, error: null }`
- **Read (not found)** — Input: `key = "unknownKey"` → Output: `{ success: true, value: null, error: null }`
- **Has** — Input: `key = "userPreferences"` → Output: `{ success: true, exists: true, error: null }`
- **Remove (found)** — Input: `key = "userPreferences"` → Output: `{ success: true, error: null }`
- **Remove (not found)** — Input: `key = "userPreferences"` (already removed) → Output: `{ success: false, error: "key not found" }`

## Non-Functional Requirements

None beyond [docs/rules.md](../docs/rules.md).

## Dependencies

None — standalone.

## Assumptions & Open Questions

### Assumptions

- The library is designed for browser-based applications and uses browser `localStorage` as its persistence mechanism.
- The library manages storage access and persistence behavior only; presentation, user interaction, and application-specific data workflows remain the responsibility of the consuming application.
- The library is intended for non-sensitive application data and does not provide encryption or other security guarantees for stored information.
- The library operates on data provided by the consuming application and does not define an application-specific data model.
- Values are serialized via `JSON.stringify` and deserialized via `JSON.parse`. Types `JSON.stringify` silently drops or transforms rather than rejects (functions, `Symbol`, `undefined` nested inside an object or array, `Date`, `Map`, `Set`) are not detected as errors — only values that cause `JSON.stringify` to throw (circular references, `BigInt`) are treated as unsupported.
- `null` and `undefined` are not valid storable values; passing either to `save` is rejected as an error rather than treated as "store nothing." This is what keeps `read`'s `value: null` unambiguous as "not found."
- The Remove operation's function name is `remove`, not `delete` — `delete` is a reserved JS keyword.

### Open Questions

None currently open — all items below were resolved during specification review (2026-09-18):

- Edge-case behavior for save/update on existing/missing keys — resolved by collapsing Create/Update into a single unconditional `save`.
- Whether `null` is a valid stored value — resolved: no, rejected as an error.
- Invalid/empty key handling — resolved: rejected as an error, same structured shape as other failures.
- Unsupported/unserializable value handling — resolved: rejected as an error, scoped to what `JSON.stringify` actually throws on.
- Storage unavailable/operation failure handling — resolved: same structured `{ success, error }` shape, applied uniformly across all four operations.
- `remove` on a missing key — resolved: treated as an error.

## Acceptance Criteria

- [ ] AC-1 (FR-1): `save` creates a new entry when the key does not yet exist.
- [ ] AC-2 (FR-1): `save` overwrites the existing entry when the key already exists, without the caller distinguishing the two cases.
- [ ] AC-3 (FR-2): `read` retrieves the value previously stored under an existing key.
- [ ] AC-4 (FR-2): `read` on a key with no stored data returns `{ success: true, value: null, error: null }`.
- [ ] AC-5 (FR-3): `remove` removes the data associated with an existing key without affecting other stored entries.
- [ ] AC-6 (FR-3): `remove` on a key with no stored data returns `{ success: false, error: "..." }`.
- [ ] AC-7 (FR-4): Structured data (objects, arrays) round-trips through `save`/`read` without unintended data loss or alteration.
- [ ] AC-8 (FR-5): `has` correctly reports `true` for a key with stored data and `false` for a key without it.
- [ ] AC-9 (FR-6): `save` rejects `null` and `undefined` values with a descriptive error and does not store them.
- [ ] AC-10 (FR-7): `save` rejects a value containing a circular reference or a `BigInt` with a descriptive error and does not store it.
- [ ] AC-11 (FR-8): Every operation (`save`, `read`, `remove`, `has`) rejects an invalid key with a descriptive error.
- [ ] AC-12 (FR-9): A simulated storage failure (e.g. quota exceeded, storage unavailable) is reported as `{ success: false, error: "..." }` rather than throwing or failing silently, for each of the four operations.
- [ ] AC-13 (FR-10): Every operation's return value matches its documented result shape in both the success and failure paths.

## Definition of Done

- All acceptance criteria above are met.
- All four operations (`save`, `read`, `remove`, `has`) are implemented and behave consistently with the Interface / Contract, including the failure-conditions table.
- CRUD operations do not produce unintended changes to unrelated stored data.
- Edge cases and invalid inputs identified in the specification are handled as expected.
- The exercise documentation is complete and reflects the final implementation.
- Tests covering the defined functional requirements and relevant edge cases are passing.
- No unexpected console errors or warnings are present during execution.
- No external dependencies have been added.
- The implementation follows the project conventions defined in [docs/rules.md](../docs/rules.md).

## Revision History

| Date | Change | Reason |
|---|---|---|
| 2026-09-15 | Initial draft | — |
| 2026-09-18 | Full specification review: fixed metadata placeholders; added missing Dependencies and Revision History sections; collapsed Create/Update into a single unconditional `save`; replaced plain `boolean`/`unknown \| null` returns with a consistent `{ success, error }` (and `{ success, value, error }` / `{ success, exists, error }`) result shape across all four operations; resolved all six open questions (null handling, invalid key, unsupported value scope, storage-failure handling, delete-on-missing-key, create/update design); renumbered FRs and ACs accordingly | Specification review surfaced unresolved edge-case behavior, an internal contradiction around `null`, and structural gaps (missing sections, unverifiable ACs) that needed decisions before implementation could begin |
| 2026-09-18 | Renamed the Remove operation's function from `delete` to `remove` throughout | `delete` is a reserved JS keyword — discovered while implementing it; not usable as a function/import binding name |
