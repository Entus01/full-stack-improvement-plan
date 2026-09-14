# SPEC — <form-validator>

## Metadata

- Exercise: `<form-validator>` (must match the folder name, kebab-case)
- Roadmap entry: [docs/roadmap.md](../../docs/roadmap.md) — `#NN. <form-validator>`
- Status: Draft
- Created: 2026-09-14
- Last updated: 2026-09-14

*Status moves Draft → Approved (once the plan step in AGENT.md is confirmed) → In Progress → Done. Update "Last updated" whenever the spec itself changes.*

## Summary

Create a form validation engine capable of reading form elements and verifying their values against the validation requirements defined for each field. The engine must evaluate whether the provided data satisfies the applicable criteria and return a validation result indicating whether the form is valid or invalid.


## Scope

### In scope

* Reading and processing form field data provided to the validation engine.
* Validating individual field values against defined validation criteria.
* Supporting multiple validation rules for a single field.
* Validating common field requirements such as required values, text length, numeric ranges, and format constraints.
* Evaluating all applicable validation rules before determining the overall form result.
* Returning a predictable validation result indicating whether the submitted form data is valid or invalid.
* Returning information about fields that fail validation so the consuming application can identify the validation errors.
* Supporting reusable validation rules that can be applied to different forms and fields.
* Allowing validation rules to be combined to satisfy different form requirements.
* Handling empty, missing, or invalid input data according to the engine's defined validation behavior.

### Out of scope

* Rendering forms or validation messages in the UI.
* Managing React component state or form state.
* Styling forms or validation feedback.
* Submitting forms to a backend or external service.
* Persisting form data or validation results in a database.
* Authentication or authorization.
* Business logic unrelated to field validation.
* API integration or server-side validation.
* File uploads or validation of file contents.
* Internationalization or localization of validation messages.
* Advanced asynchronous validation, such as checking a value against an external API or database.
* Building a complete form-management framework beyond the validation responsibilities of the engine.

## Functional Requirements

* **FR-1:** The validation engine must accept a form and identify the elements it contains.
* **FR-2:** The validation engine must identify the type of each supported form element, including text inputs, text areas, email inputs, password inputs, checkboxes, radio buttons, and attachments.
* **FR-3:** The validation engine must identify the validation constraints defined for each supported form element.
* **FR-4:** The validation engine must support common validation constraints, including required values, length restrictions, data types, and regular expression patterns.
* **FR-5:** The validation engine must evaluate each form element according to the constraints applicable to that element.
* **FR-6:** The validation engine must determine whether each form element satisfies all of its applicable validation constraints.
* **FR-7:** The validation engine must identify and report validation failures for individual form elements.
* **FR-8:** The validation engine must evaluate the complete form based on the validation results of its elements.
* **FR-9:** The validation engine must return a predictable result indicating whether the complete form is valid or invalid.
* **FR-10:** The validation engine must provide sufficient validation information for the consuming application to identify which elements failed and why.
* **FR-11:** The validation engine must handle missing, empty, or otherwise invalid values according to the constraints defined for each element.
* **FR-12:** The validation engine must support multiple validation constraints being applied to the same form element.
* **FR-13:** The validation engine must allow validation rules to be reused across different forms and form elements.

## Interface / Contract

### Function/API Signatures

The validation engine must expose a public validation interface that accepts form data together with the form elements and their applicable validation constraints.

The input must allow the engine to identify each field, its element type, its current value, and the validation requirements that apply to it.

The validation result must indicate whether the form is valid and provide field-level validation information for elements that do not satisfy their applicable requirements.

The validation result should distinguish between:

* Overall form validity.
* Individual field validity.
* Validation failures and the corresponding validation criteria that were not satisfied.

### Example

**Input:**

A form containing fields such as:

```text
Name
- type: text
- value: "Miguel"
- required: true

Email
- type: email
- value: "miguel@example.com"
- required: true

Password
- type: password
- value: "123"
- required: true
- minimum length: 8
```

**Output:**

```text
Form: invalid

Name: valid
Email: valid
Password: invalid
Reason: minimum length requirement not satisfied
```

## Non-Functional Requirements

* The validation engine must handle invalid, missing, or unsupported form data predictably without causing unexpected runtime failures.
* Validation failures must provide sufficient information for the consuming application to identify the affected field and the validation requirement that was not satisfied.
* When a form contains file attachments, the validation engine must be able to validate applicable attachment requirements, such as whether a file is required, its file type, and its permitted size, where such constraints are defined.
* The validation engine must not upload, store, modify, or otherwise manage file contents; attachment handling beyond validation is outside the engine's responsibility.
* The validation engine must not depend on a specific UI framework and must remain reusable independently of form presentation.
* The implementation must follow the code quality, naming, structure, and documentation conventions defined in [docs/rules.md](../../docs/rules.md).
* The engine should provide reasonable performance for typical form sizes and validation workloads expected in the exercises, without requiring formal performance benchmarks.
* The implementation must not introduce external dependencies unless explicitly approved for the exercise.
* Browser support is limited to the environment supported by the project; compatibility with legacy browsers is not required.

## Assumptions & Open Questions

* It must be determined whether the engine receives the original HTML form and inspects its elements directly, or receives a structured representation of the form and its fields.
* It must be determined whether validation rules are inferred from native HTML attributes, provided separately through configuration, or supported through both mechanisms.
* The exact set of supported form element types must be finalized. The current scope includes text inputs, text areas, email inputs, password inputs, checkboxes, radio buttons, and file inputs.
* The exact set of supported validation constraints must be finalized beyond the currently identified requirements of `required`, length restrictions, data type, and regular expressions.
* It must be determined how validation rules should behave when multiple constraints apply to the same field.
* It must be determined whether validation should evaluate all rules for a field or stop after the first failed rule.
* It must be determined whether the engine should return one validation error per field or all validation errors detected for each field.
* It must be determined how unsupported element types or validation attributes should be handled.
* It must be determined how missing, empty, null, or otherwise invalid field values should be interpreted for each supported element type.
* It must be determined how checkbox groups and radio groups should be validated, including what constitutes a valid selection.
* It must be determined which file properties can be validated for attachment fields, such as required state, file type, file size, or the number of files.
* It must be determined how validation results and error information should be structured for consumption by the application.
* It must be determined whether validation is intended to be synchronous only or whether asynchronous validation may be supported in a future exercise.

## Acceptance Criteria

* [ ] **AC-1 (FR-1):** The engine correctly identifies and processes all supported elements contained in the provided form.
* [ ] **AC-2 (FR-2):** The engine correctly identifies the type of each supported form element, including text inputs, text areas, email inputs, password inputs, checkboxes, and radio buttons.
* [ ] **AC-3 (FR-3):** The engine correctly identifies the validation constraints applicable to each supported form element.
* [ ] **AC-4 (FR-4):** The engine correctly recognizes and evaluates the supported validation constraints, including required values, length restrictions, data types, and regular expression patterns.
* [ ] **AC-5 (FR-5):** The engine evaluates each form element against all validation constraints applicable to that element.
* [ ] **AC-6 (FR-6):** The engine correctly determines whether each form element satisfies its applicable validation constraints.
* [ ] **AC-7 (FR-7):** The engine identifies fields that fail validation and provides the corresponding validation failure information.
* [ ] **AC-8 (FR-8):** The engine evaluates the complete form based on the validation results of its individual elements.
* [ ] **AC-9 (FR-9):** The engine returns a predictable result indicating whether the complete form is valid or invalid.
* [ ] **AC-10 (FR-10):** The validation result provides sufficient information for the consuming application to identify each invalid element and the reason for its failure.
* [ ] **AC-11 (FR-11):** Missing, empty, or otherwise invalid values are handled according to the applicable validation constraints.
* [ ] **AC-12 (FR-12):** The engine correctly evaluates multiple validation constraints applied to the same form element.
* [ ] **AC-13 (FR-13):** The same validation rules can be applied successfully to different forms or form elements without requiring form-specific implementations.

## Definition of Done

* All acceptance criteria above are met.
* All supported form element types and validation constraints defined in the specification are implemented and tested.
* Validation behavior for the resolved assumptions and open questions is implemented and documented.
* Relevant edge cases and invalid inputs are covered by tests.
* The validation engine can be used independently of the UI or presentation layer.
* The exercise documentation is complete and reflects the final implementation.
* All tests are passing.
* No unexpected console errors or warnings are present during execution.
* No external dependencies have been added without prior approval.
* The implementation follows the project conventions defined in [docs/rules.md](../../docs/rules.md).

