# Canonical Map – Wolverineseye Ecosystem

**Date:** 2026-09-07  
**Status:** FROZEN – Phase 1 baseline  
**Authority:** Founder  
**Last Updated:** 2026-09-07

---

## Classification Key

- **CORE** — Essential to identity, governance, or canonical product. Required for production.
- **ACTIVE** — In active use, but not essential to identity. Can be replaced or evolved.
- **LAB** — Experiments, prototypes, testing grounds. Not production-ready.
- **ARCHIVE** — Historical, deprecated, or no longer active. Keep for reference only.

---

## FROZEN CANONICAL MAP

### CORE (4 items) – Locked

| Asset | Type | Role | Owner | Status | Notes |
|-------|------|------|-------|--------|-------|
| wolverineseye.com | Domain | Canonical front door, hosts webi3-website | Founder | LIVE | Primary entry point for all users |
| webi3-website | Repository | Frontend: homepage + chat interface (Phase 0) | Founder | LIVE | Primary frontend. Do not duplicate. |
| WOS Constitution (Founding) | Document | Foundational principles and philosophy | Founder | ARCHIVE | Source of truth for governance |
| WOS Constitution (Working v0.3) | Document | Evidence-aligned working draft | Founder | ACTIVE | Active constitution for governance decisions |
| $hoX Constitution (Phase 0 system prompt) | Code | System prompt derived from WOS | Founder | LIVE | Behaviour layer, embedded in webi3-website/lib/constitution.ts |

**Verdict:** ✅ LOCKED. No duplicates. No conflicts. Canonical baseline established.

---

### ACTIVE (5 items) – Locked

| Asset | Type | Role | Owner | Status | Notes |
|-------|------|------|-------|--------|-------|
| shox router | Repository | Model routing, policy gate, provenance logging | Founder | ACTIVE | Central intelligence router. Phase 1 dependency. |
| wolverines-music | Repository | Music/NFT/artist platform (Shopify-based) | Founder | ACTIVE | Separate product line. Independent of Webi3. |
| wolverines-music-shopify | Repository | Shopify backend for music products | Founder | ACTIVE | Dependency of wolverines-music. Keep separate. |
| ibCode | Repository | ibCode platform (separate product line) | Founder | ACTIVE | Separate product. Independent of Webi3. |
| EduFly | Repository | EduFly platform (separate product line) | Founder | ACTIVE | Separate product. Independent of Webi3. |

**Redirect / Reserved:**

| Asset | Action | Notes |
|-------|--------|-------|
| webi3.ai | Redirect to wolverineseye.com | Phase 0+1 canonical front door. Reserve for Phase 2+ if needed. |
| webi3.io | Redirect to wolverineseye.com | Phase 0+1 canonical front door. Reserve for Phase 2+ if needed. |

**Verdict:** ✅ LOCKED. Clear separation between Webi3 core and separate product lines. Domains consolidated.

---

### LAB (10 items) – Locked

| Asset | Type | Role | Owner | Status | Notes |
|-------|------|------|-------|--------|-------|
| shox.grok.me | Domain | $hoX core persona experiment (Grok-hosted) | Founder | LAB | External experiment. May be superseded by wolverineseye.com/webi3/chat. Graduation criteria define path to ACTIVE. |
| sanmen.grok.me | Domain | SanMen character/guide persona (Grok-hosted) | Founder | LAB | Character experiment. Graduation criteria define path to ACTIVE. |
| cipheron.grok.me | Domain | Cipheron security persona (Grok-hosted) | Founder | LAB | Character experiment. Graduation criteria define path to ACTIVE. |
| cyberon.grok.me | Domain | Cyberon guardian persona (Grok-hosted) | Founder | LAB | Character experiment. Graduation criteria define path to ACTIVE. |
| grapeviolet.grok.me | Domain | GrapeViolet red-team persona (Grok-hosted) | Founder | LAB | Character experiment. Graduation criteria define path to ACTIVE. |
| wolverines.ai.studio | Domain | Meta AI Studio dashboard for persona testing | Founder | LAB | Experimentation surface. Correct classification. |
| Wolverines Eye (culture layer) | Repository (4 repos) | Culture/identity layer (stubbed) | Founder | LAB | V2/Phase 3 territory. Not Phase 0+1 priority. Keep for reference. |
| webi3-audio | Repository | Audio/Quantum Audio Forge concept (stubbed) | Founder | LAB | Concept stage. Not Phase 0+1 priority. Keep for reference. |

**Graduation Criteria for Character Personas (SanMen, Cipheron, Cyberon, GrapeViolet):**

A character persona may graduate from LAB to ACTIVE when it meets ALL six criteria:

1. **Constitutional alignment** — Pass MCP-001 smoke suite (20 test cases)
2. **Governance audit** — Independent review confirms behaviour matches identity
3. **User testing** — At least 10 successful interactions across 3+ testers
4. **Documented purpose** — Clear role definition (guide, strategist, guardian, red-team, etc.)
5. **Human authority assigned** — Named owner responsible for the persona
6. **V2 compatibility** — No constraints introduced that block future V2 architecture

Until all six are met, the persona remains LAB.

**Verdict:** ✅ LOCKED. Clear graduation path defined. V2 compatibility preserved.

---

### ARCHIVE (15 items) – Locked

| Asset | Type | Reason for Archive | Notes |
|-------|------|-------------------|-------|
| webi3-frontend | Repository | Superseded by webi3-website | Keep for reference only. Do not resurrect. |
| Webi3 (backend) | Repository | Older backend, likely superseded by shox router | Keep for reference. Do not resurrect. |
| webi3-backend | Repository | Older backend, duplicate or superseded | Keep for reference. Do not resurrect. |
| webi3s | Repository | Early prototype, unclear state | Keep for reference. Do not resurrect. |
| webi3s.com | Domain | Legacy domain, unused | Redirect or park. Do not reactivate. |
| wolverineseye.io | Domain | Legacy culture domain, unused | Redirect or park. Do not reactivate. |
| wolverineseye.ai | Domain | Legacy culture domain, unused | Redirect or park. Do not reactivate. |
| webi3-os | Repository | OS concept (V2 territory, not Phase 0+1) | Archive. Resurrect in Phase 3+ if needed. |
| wolverines-os | Repository | OS concept (V2 territory, not Phase 0+1) | Archive. Resurrect in Phase 3+ if needed. |
| wolverines-eye-app | Repository | Mobile app concept (V2/Phase 3 territory) | Archive. Resurrect in Phase 3+ if needed. |
| wolverines-eye-web | Repository | Web interface (V2/Phase 3 territory) | Archive. Resurrect in Phase 3+ if needed. |
| wolverines-eye-api | Repository | API (V2/Phase 3 territory) | Archive. Resurrect in Phase 3+ if needed. |
| wolverines-core | Repository | Unclear purpose, no active dependencies | Archive unless clear use case emerges. |
| wolverines-common | Repository | Unclear purpose, no active dependencies | Archive unless clear use case emerges. |
| hox.grok.me | Domain | Invalid/non-existent instance | Removed from active map. |
| wolverines.grok.me | Domain | Invalid/non-existent instance | Removed from active map. |
| webi3.grok.me | Domain | Invalid/non-existent instance | Removed from active map. |

**Verdict:** ✅ LOCKED. Clear archive rationale. V2 territory clearly separated. No accidental resurrection risk.

---

## Canonical Map Summary

| Layer | Count | Status |
|-------|-------|--------|
| CORE | 5 | ✅ LOCKED |
| ACTIVE | 7 (5 + 2 redirects) | ✅ LOCKED |
| LAB | 10 | ✅ LOCKED |
| ARCHIVE | 15 | ✅ LOCKED |
| **TOTAL** | **37** | ✅ **FROZEN** |

---

## Key Decisions (Locked)

| Decision | Outcome |
|----------|---------|
| Canonical front door | wolverineseye.com (single source of truth) |
| Domain consolidation | webi3.ai, webi3.io redirect to wolverineseye.com |
| Character personas | LAB until graduation criteria met (6 criteria) |
| Wolverines Eye (culture layer) | Archive for now (V2/Phase 3 territory) |
| Utilities (wolverines-core/common) | Archive (unclear purpose) |
| OS concepts | Archive (V2 territory) |
| V2 compatibility | Preserved in all decisions |

---

## Phase 0 → Phase 1 Transition

**Phase 0 baseline:**
- ✅ $hoX chat interface live at wolverineseye.com/webi3/chat
- ✅ Constitutional prompt embedded and tested
- ✅ Phase 0 policy check deployed
- ✅ Ollama integration working locally

**Phase 1 scope:**
- Identity persistence layer
- Memory system
- Sophisticated policy gate (replaces Phase 0 keyword check)
- Reasoning layer
- Evaluation layer

**What stays the same:**
- ✅ CORE layer (wolverineseye.com, webi3-website, WOS Constitution, $hoX Constitution)
- ✅ ACTIVE layer (shox router, separate products)
- ✅ Graduation criteria for personas
- ✅ V2 compatibility constraints

**What changes:**
- Phase 0 simple policy check → Phase 1 semantic policy gate (via shox router)
- Phase 0 stateless chat → Phase 1 persistent memory
- Phase 0 local Ollama → Phase 1 multi-model routing (shox)

---

## Frozen. Ready for Phase 1.

**Canonical map is now the authoritative reference for ecosystem structure.**

Any new asset must be classified against this map before introduction.

Any asset not on this map is not canonical.

---

**Next:** Phase 1 specification and planning.

