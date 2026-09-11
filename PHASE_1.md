# PHASE 1 — Semantic Policy Gate Integration

**Scope:** Wolverines Eye ecosystem (webi3-website) + shox router
**Decision:** Option 2 — wrap the existing shox `/v1/chat` endpoint with a policy-classifier system prompt, rather than building a dedicated `/v1/policy` endpoint.
**Timeline:** 4 weeks
**Guiding principle (V2):** "The gate decides, not the model." The policy decision is produced by a governed call into shox, kept separate from the application/model logic that consumes it.

**Status:** Week 1 foundations (taxonomy/schema + classifier system prompt) and Week 2 integration
(Next.js scaffolding of `webi3-website` inside this repo) are implemented:
- [`policy/schema.json`](policy/schema.json) — the `PolicyDecision` JSON Schema contract (taxonomy + reason codes)
- [`policy/system-prompt.md`](policy/system-prompt.md) — the versioned Policy Classifier persona prompt
- [`policy/policy-version.md`](policy/policy-version.md) — the `policy_version` scheme
- [`lib/policy/`](lib/policy/) — TypeScript client, schema validation, system prompt, and types
- [`lib/logging/policyLog.ts`](lib/logging/policyLog.ts) — audit log writer
- [`app/api/policy/route.ts`](app/api/policy/route.ts) — the `POST /api/policy` server route

**Assumption:** since no separate `webi3-website`/`shox` repository was identified, this repo
(`wolverineseye.com`) is treated as the home for `webi3-website`, consistent with the README's
existing `/webi3` route. `shox` itself is a separate, externally-operated service reached via the
`SHOX_BASE_URL`/`SHOX_POLICY_API_KEY` environment variables (see `.env.example`) — no shox source
lives in this repo. If this assumption is wrong, `lib/policy/` and `app/api/policy/route.ts` are
straightforward to relocate.

---

## 1. Why Option 2

- shox is an active model router (local Ollama + OpenAI-compatible cloud endpoints) whose job today is routing and provenance logging, not policy classification.
- No `/v1/policy` endpoint exists. Building one is a 6–8 week effort (new endpoint, schema, deployment, provenance wiring).
- Wrapping `/v1/chat` with a dedicated system prompt reuses shox's existing, proven request/response path and structured-output handling, cutting the timeline to 4 weeks.
- This preserves the V2 abstraction: the policy gate remains a distinct, governed call path inside shox — it is not folded into arbitrary application code, and it does not require the requesting app (webi3-website) to make the ALLOW/REFUSE decision itself.
- No new architectural surface area is introduced; when the router later gains a native `/v1/policy` endpoint, the wrapper's call site is the single, isolated place that needs to be swapped over.

---

## 2. Components

### 2.1 Identity
Defines *who/what* is issuing and receiving policy calls.

- **Caller identity:** webi3-website server-side handler is the only authorized caller of the policy wrapper. Requests carry a service identity (API key / bearer token) issued to webi3-website, distinct from the credentials used for normal chat routing.
- **Policy persona:** The system prompt sent to shox establishes a fixed persona ("Policy Classifier") that must not be overridden by user input. The persona's sole output contract is a structured decision object (see §2.4), never conversational text.
- **Model identity / provenance:** Every policy call must resolve to a specific routed model (local Ollama or cloud) and shox must log that resolution the same way it logs standard chat provenance, so a decision can always be traced back to the model and prompt version that produced it.

### 2.2 Memory
Defines what context is (and is not) retained across policy calls.

- **Stateless by default:** Each policy check is a single-turn call — no conversation history is forwarded into the classifier prompt beyond the one user message being evaluated. This avoids prior turns "poisoning" a policy decision.
- **Decision log (short-term):** webi3-website persists each policy request/response pair (input message hash, decision, reason code, model/version, timestamp) for audit and rate-limit/abuse tracking. This is an append-only log, not memory fed back into future prompts.
- **No long-term profile memory in Phase 1:** Per-user policy history/adaptive thresholds are explicitly out of scope; flagged as a Phase 2+ candidate.

### 2.3 Reasoning
Defines how the classifier arrives at a decision.

- **Single-pass semantic classification:** The wrapped prompt instructs the model to reason internally about intent/policy category, but to emit *only* the final structured decision — no chain-of-thought is returned to the caller.
- **Fixed policy taxonomy for Phase 1:** `ALLOW`, `REFUSE`, and `REVIEW` (borderline cases requiring human/secondary check). `REVIEW` avoids forcing a binary decision on ambiguous input and gives webi3-website a safe fallback path (e.g., soft-block + escalate).
- **Deterministic decoding:** Policy calls use low/zero temperature and a constrained output format to maximize consistency of ALLOW/REFUSE/REVIEW outcomes for similar inputs.

### 2.4 Evaluation
Defines the contract and quality bar for the decision itself.

- **Structured output contract (JSON):** formally defined as a JSON Schema in
  [`policy/schema.json`](policy/schema.json), reproduced here for reference:
  ```json
  {
    "decision": "ALLOW | REFUSE | REVIEW",
    "reason_code": "string (short machine-readable category)",
    "explanation": "string (human-readable, optional, truncated)",
    "model": "string (resolved model id from shox)",
    "policy_version": "string"
  }
  ```
- **Validation layer:** webi3-website must validate shox's response against [`policy/schema.json`](policy/schema.json) before trusting it. Any malformed/non-conforming response defaults to `REVIEW` (fail-safe, never fail-open to `ALLOW`).
- **Versioning:** The system prompt/policy taxonomy is versioned (`policy_version`) per the scheme in [`policy/policy-version.md`](policy/policy-version.md), so decisions remain reproducible and comparable as the prompt evolves.
- **Classifier system prompt:** the fixed, versioned persona prompt used to wrap `/v1/chat` is defined in [`policy/system-prompt.md`](policy/system-prompt.md), including prompt-injection resistance rules and decoding parameters.

---

## 3. Code Structure and File Paths

### 3.1 webi3-website (Next.js app)

```
webi3-website/
  app/
    api/
      policy/
        route.ts            # Server route: POST /api/policy — the only caller of shox
  lib/
    policy/
      client.ts              # Thin client: builds request, calls shox /v1/chat, validates response
      systemPrompt.ts         # Versioned policy-classifier system prompt (const, not user-editable)
      schema.ts               # Zod/JSON schema for the decision object + validation helper
      types.ts                 # PolicyDecision, PolicyRequest TypeScript types
    logging/
      policyLog.ts            # Append-only decision log writer (audit trail)
  middleware.ts               # Hooks policy gate into relevant request paths (e.g., contact/chat forms)
```

- `POST /api/policy` is the single internal endpoint the rest of the Next.js app calls; it hides the shox wrapping detail so future migration to a native `/v1/policy` endpoint only touches `lib/policy/client.ts`.

### 3.2 shox router

```
shox/
  routes/
    chat.ts (or existing v1/chat handler)   # Unchanged — existing model routing endpoint
  config/
    policyPrompt.md (optional shared copy)   # Reference copy of the system prompt used by callers, for audit
  logging/
    provenance.ts                            # Existing provenance logger — policy calls flow through same path
```

- No new shox endpoints or route handlers are added in Phase 1. shox's role is unchanged: it routes the wrapped `/v1/chat` request to the resolved model and logs provenance as it already does for any chat call.

---

## 4. Testing Strategy

- **Unit tests (webi3-website):**
  - `schema.ts` validation: accepts well-formed decision objects, rejects malformed/missing fields, defaults to `REVIEW` on parse failure.
  - `client.ts`: correctly constructs the shox request payload (system prompt + user message), handles shox timeouts/errors by defaulting to `REVIEW`.
- **Integration tests:**
  - `POST /api/policy` against a stubbed shox `/v1/chat` returning ALLOW/REFUSE/REVIEW payloads — confirm correct pass-through and logging.
  - Live smoke test against a local Ollama-backed shox instance with a small labeled prompt set (known-benign, known-violating, known-ambiguous) to confirm real classification behavior.
- **Regression/consistency tests:**
  - Re-run the labeled prompt set periodically (e.g., per deploy) to catch drift when the underlying routed model or `policy_version` changes.
- **Fail-safe tests:**
  - Simulate shox outage / malformed response / schema violation — verify the system defaults to `REVIEW`, never `ALLOW`.

## 5. Acceptance Criteria

- [ ] `POST /api/policy` accepts a user message and returns a validated `PolicyDecision` (`ALLOW`/`REFUSE`/`REVIEW`) within an agreed latency budget.
- [ ] All policy decisions are persisted to the audit log with input hash, decision, reason code, model id, and `policy_version`.
- [ ] Any invalid/unparseable shox response results in `REVIEW`, never a silent `ALLOW`.
- [ ] The classifier system prompt is versioned and cannot be influenced by end-user input (prompt-injection resistance spot-checked).
- [ ] Labeled test set achieves the agreed accuracy threshold on ALLOW/REFUSE classification before rollout.
- [ ] No new shox endpoints are introduced; all policy traffic flows through the existing `/v1/chat` path with standard provenance logging intact.

---

## 6. Implementation Roadmap (4 Weeks)

**Week 1 — Foundations**
- [x] Define policy taxonomy, JSON decision schema, and `policy_version` scheme — see [`policy/schema.json`](policy/schema.json) and [`policy/policy-version.md`](policy/policy-version.md).
- [x] Draft and review the classifier system prompt with shox — see [`policy/system-prompt.md`](policy/system-prompt.md).
- [x] Scaffold `lib/policy/` (client, schema, types, systemPrompt) in webi3-website — implemented in this repo, treated as the webi3-website home (see Status note above).

**Week 2 — Integration**
- [x] Implement `POST /api/policy` route calling shox `/v1/chat` via `client.ts` — see [`app/api/policy/route.ts`](app/api/policy/route.ts).
- [x] Implement fail-safe defaulting (`REVIEW`/`CLASSIFIER_ERROR` on error/invalid response) — see [`lib/policy/client.ts`](lib/policy/client.ts).
- [x] Wire audit logging (`policyLog.ts`) — see [`lib/logging/policyLog.ts`](lib/logging/policyLog.ts).
- [x] Unit tests for schema validation and fail-safe client behavior — see [`lib/policy/__tests__/`](lib/policy/__tests__/) (17 tests, run via `npm test`).

**Week 3 — Testing & Hardening**
- [ ] Build labeled test set (benign / violating / ambiguous prompts).
- [ ] Run integration tests against a real/stubbed shox instance; measure classification accuracy.
- [ ] Prompt-injection spot checks against a live model; tune system prompt/decoding parameters as needed.

**Week 4 — Rollout**
- [ ] Hook policy gate into target application paths (e.g., contact/chat entry points) via `middleware.ts`.
- [ ] Staged rollout (shadow mode → enforced) with monitoring on decision distribution and audit log volume.
- [ ] Document handoff notes for a future Phase 2 evaluation of a native shox `/v1/policy` endpoint.
