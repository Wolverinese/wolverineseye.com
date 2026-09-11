# Policy Version Scheme

Defines how `policy_version` (see `policy/schema.json`) is assigned and incremented for the
semantic policy gate described in `PHASE_1.md`.

## Format

`policy_version` is a semantic version string: `MAJOR.MINOR.PATCH`.

It tracks the **combination** of:
1. The policy taxonomy (`decision` values and `reason_code` vocabulary in `policy/schema.json`)
2. The classifier system prompt (`policy/system-prompt.md`)
3. The decoding parameters used for the wrapped `/v1/chat` call (temperature, max tokens, etc.)

These three artifacts are versioned together because a change to any one of them can change
classification behavior, and decisions must remain reproducible/comparable against a single
version identifier.

## Increment Rules

- **MAJOR** — Breaking change to the `PolicyDecision` JSON contract itself (e.g., renamed/removed
  field, removed `decision` or `reason_code` enum value that existing consumers rely on).
  Requires coordinated rollout across webi3-website and any other shox policy-gate callers.
- **MINOR** — Backward-compatible taxonomy or prompt changes that can alter classification
  outcomes but do not break the schema (e.g., adding a new `reason_code`, rewording the system
  prompt to tighten a category, adjusting decoding parameters). Triggers re-running the
  regression/consistency test suite (`PHASE_1.md` §4) against the labeled prompt set before
  rollout.
- **PATCH** — Non-behavioral changes (typo fixes in `explanation` templates, documentation
  clarifications, logging-only changes) that must not change how any labeled test-set prompt is
  classified.

## Current Version

`policy_version: 1.0.0`

- Taxonomy: `ALLOW` / `REFUSE` / `REVIEW` with the fixed `reason_code` vocabulary in
  `policy/schema.json`.
- Prompt: `policy/system-prompt.md` v1.0.0 (see prompt file header).
- Decoding: temperature `0`, structured/constrained JSON output, no chain-of-thought returned.

## Process for Bumping the Version

1. Update the taxonomy (`policy/schema.json`) and/or prompt (`policy/system-prompt.md`) and/or
   decoding config together in the same change.
2. Update the version header inside `policy/system-prompt.md` and this document's "Current
   Version" section to match.
3. Re-run the labeled prompt regression set; record the before/after accuracy.
4. Only after the new version passes review does webi3-website's `client.ts` (once scaffolded)
   read/emit the new `policy_version` value.
5. Historical decisions in the audit log retain the `policy_version` that was active at the time
   they were made — never rewritten retroactively.
