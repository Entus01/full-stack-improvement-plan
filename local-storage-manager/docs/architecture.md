# Current Architecture

## Summary

A small, dependency-free ES module wrapper over browser `localStorage`. Four public operations (`save`, `read`, `remove`, `has`) each live in their own module and share two internal guards: `validateKey` (FR-8) and `withStorage` (FR-9). Every operation returns a structured `{ success, error }` result (plus `value` for `read`, `exists` for `has`) rather than a bare boolean or throwing.

## Main Technologies

- Plain JavaScript (ESM) — no runtime dependencies.
- Vitest + jsdom — project-wide test framework, with jsdom providing the `localStorage` global under Node (DEC-008).

## Main Modules

- `src/validateKey.js` — rejects non-string/empty keys with a descriptive error (FR-8).
- `src/withStorage.js` — runs a raw `localStorage` call, catching any thrown error (e.g. quota exceeded) into `{ success, result, error }` (FR-9).
- `src/save.js` — FR-1, FR-6 (rejects `null`/`undefined`), FR-7 (rejects values `JSON.stringify` can't serialize).
- `src/read.js` — FR-2. Missing key is `success: true, value: null`; corrupted stored JSON is `success: false`.
- `src/remove.js` — FR-3. Checks existence before removing; missing key is `success: false, error: "key not found"` (DEC-006).
- `src/has.js` — FR-5.
- `src/index.js` — re-exports the four public functions.

## General Flow

```
caller → validateKey(key) → withStorage(() => localStorage.<op>(...)) → operation-specific result shaping → { success, error, ... }
```

Every public function validates its own key independently; there is no shared "manager" object — `save`/`read`/`remove`/`has` are plain functions imported individually or via the barrel export.

## External Integrations

None — out of scope per [../SPEC.md](../SPEC.md).

## Architectural Dependencies

`save`, `read`, `remove`, and `has` each depend on `validateKey` and `withStorage`. `remove` additionally calls `withStorage` twice (an existence check via `getItem`, then the actual `removeItem`) to implement DEC-006's "missing key is an error" behavior, since `localStorage.removeItem` itself gives no signal about whether anything was actually removed.

## Technical Considerations

- The Remove operation's function is named `remove`, not `delete` — `delete` is a reserved JS keyword and can't be used as a function/import binding name (DEC-007, found during implementation, not caught during the SPEC review).
- `save` distinguishes two failure sources that both originate from user input: `null`/`undefined` values (rejected before serialization is attempted) and values `JSON.stringify` itself throws on (circular references, `BigInt`) — each gets a distinct, specific error message rather than a generic "invalid value."
- `read`'s corrupted-JSON handling (`JSON.parse` throwing) is treated as a genuine failure (`success: false`), not the same as "key not found" (`success: true, value: null`) — these are different outcomes and must not look identical to the caller.
