<!--
HOW TO USE THIS TEMPLATE
1. Copy this file to <exercise-folder>/SPEC.md (e.g. javascript-data-transformer/SPEC.md).
2. Replace every placeholder and instruction line (the italic notes under each heading).
3. Delete instruction lines once you've written the real content — keep the headings.
4. Delete any subsection that genuinely doesn't apply to this exercise (e.g. "Data model" for a
   pure frontend utility library) rather than leaving it blank — an empty section with no note
   is ambiguous; a deleted section is a clear decision.
5. This is written BEFORE any implementation code, per the SDD workflow in ../../AGENT.md.
   It defines WHAT must be built and how you'll know it's done — not HOW to build it. Keep
   implementation approach, algorithms, and code out of this document; that's what you figure
   out in the plan/implementation steps, not the spec.
-->

# SPEC — <exercise-name>

## Metadata

- Exercise: `<exercise-name>` (must match the folder name, kebab-case)
- Roadmap entry: [docs/roadmap.md](../docs/roadmap.md) — `#NN. <exercise-name>`
- Status: Draft
- Created: YYYY-MM-DD
- Last updated: YYYY-MM-DD

*Status moves Draft → Approved (once the plan step in AGENT.md is confirmed) → In Progress → Done. Update "Last updated" whenever the spec itself changes.*

## Summary

*One or two sentences, in your own words: what is being built and why. Expand on the one-line objective from docs/roadmap.md — don't just copy it.*

## Scope

### In scope

*Bullet list of what this exercise DOES cover.*

### Out of scope

*Bullet list of what it explicitly does NOT cover — things intentionally deferred to a later exercise, to the final application, or to "not needed for this exercise's learning goal." Being explicit here is what stops scope creep during implementation.*

## Functional Requirements

*Numbered, testable statements of required behavior. Describe WHAT the system must do, not HOW — the "how" is worked out during implementation, not decided here.*

- FR-1: ...
- FR-2: ...

## Interface / Contract

*Describe the shape of the thing being built at its boundary, without prescribing internal implementation. Adapt whichever subsections are relevant to this exercise and delete the rest.*

- **Function/API signatures** — names, parameters, types, return values (for a utility library or backend service).
- **Component props / UI contract** — prop names, types, and what they control (for a React component or page).
- **Data model / schema** — entities, fields, and relationships (for anything touching a database).
- **Example** — a short, illustrative input/output or request/response example. Values only, not implementation logic.

## Non-Functional Requirements

*Constraints beyond "it works": performance expectations, accessibility, error-handling expectations, code quality/documentation expectations, browser/environment support, etc. If nothing beyond the project-wide conventions in [docs/rules.md](../docs/rules.md) applies, write "None beyond docs/rules.md" rather than leaving this blank.*

## Dependencies

*Other exercises or artifacts this one builds on or assumes exist (e.g. "uses the validation engine built in form-validator"). Write "None — standalone" if there are none.*

## Assumptions & Open Questions

*Anything being assumed without having verified it, or a question that needs an answer before or during implementation. Per AGENT.md's "never guess on ambiguity" rule, an open question here should be resolved by asking, not by silently picking an answer. Once resolved, move significant ones into that exercise's own `docs/decisions.md`.*

## Acceptance Criteria

*Checklist form, each one traceable to a Functional Requirement above. This is what "done" is checked against — per AGENT.md step 4, nothing is done until every box is genuinely true, not just "it runs."*

- [ ] AC-1 (FR-1): ...
- [ ] AC-2 (FR-2): ...

## Definition of Done

- All acceptance criteria above are met.
- *Add any exercise-specific closing conditions here (e.g. "exercise's docs/README.md written", "no console errors/warnings").*

## Revision History

*Only for changes to THIS spec after work has started (per AGENT.md step 3: if a requirement turns out ambiguous or infeasible mid-implementation, revise the spec here rather than quietly improvising around it).*

| Date | Change | Reason |
|---|---|---|
| YYYY-MM-DD | Initial draft | — |
