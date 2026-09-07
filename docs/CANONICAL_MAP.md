# Canonical Map – Wolverineseye Ecosystem

**Date:** 2026-09-07  
**Status:** Draft for review and attack  
**Authority:** Founder  

---

## Classification Key

- **CORE** — Essential to identity, governance, or canonical product. Required for production.
- **ACTIVE** — In active use, but not essential to identity. Can be replaced or evolved.
- **LAB** — Experiments, prototypes, testing grounds. Not production-ready.
- **ARCHIVE** — Historical, deprecated, or no longer active. Keep for reference only.

---

## 1. Governance Layer

| Asset | Repository | Role | Owner | Status | Classification | Attack Notes |
|-------|-----------|------|-------|--------|-----------------|--------------|
| WOS Constitution (Founding) | Local/shared | Philosophy, foundational principles | Founder | ARCHIVE | **CORE** | Source of truth for all governance. Should be versioned in repo. |
| WOS Constitution (Working v0.3) | Local/shared | Evidence-aligned working draft | Founder | DRAFT | **CORE** | This is the active constitution. Move to `wolverineseye.com/docs/constitution/` for versioning. |
| $hoX Constitution (Phase 0) | webi3-website/lib/constitution.ts | System prompt, derived from WOS | Founder | LIVE | **CORE** | Correctly embedded in Phase 0. But consider extracting to a separate versioned document. |

**Verdict:**
- ❌ Constitutions are split between local files and repository code
- ✅ Phase 0 correctly implements the constitution as a system prompt
- **Action:** Move WOS Constitution PDFs to `wolverineseye.com/docs/governance/` and version them. Keep the Phase 0 system prompt in code, but link it to the versioned constitution.

---

## 2. Intelligence / Policy Layer

| Asset | Repository | Role | Owner | Status | Classification | Attack Notes |
|-------|-----------|------|-------|--------|-----------------|--------------|
| $hoX Router | shox | Model routing, policy gate, provenance logging | Founder | ACTIVE | **ACTIVE** | Central intelligence router. No duplicates detected. Core dependency for multi-model support. |
| $hoX Policy Check (Phase 0) | webi3-website/lib/policyCheck.ts | Embedded keyword-based policy check | Founder | LIVE | **ACTIVE** | Acceptable for Phase 0. Will be replaced by shox router in Phase 1+. |
| $hoX Constitution (embedded) | webi3-website/lib/constitution.ts | System prompt for Ollama | Founder | LIVE | **ACTIVE** | Correctly embedded. This is the behaviour layer of governance. |

**Verdict:**
- ✅ Single router (shox) — no duplicates
- ✅ Policy check is Phase 0–specific, not blocking Phase 1
- ✅ Constitution is embedded and versioned with code
- **Action:** No changes needed. Proceed to Phase 1 integration of shox router.

---

## 3. Frontend / User Interface Layer

| Asset | Repository / Domain | Role | Owner | Status | Classification | Attack Notes |
|-------|-------------------|------|-------|--------|-----------------|--------------|
| wolverineseye.com | wolverineseye.com (domain) | Canonical front door, hosts webi3-website | Founder | LIVE | **CORE** | Primary entry point. Correct classification. |
| webi3-website | webi3-website (repo) | Frontend: homepage + chat interface | Founder | LIVE | **CORE** | Phase 0 implementation. Correct classification. |
| webi3.ai | webi3.ai (domain) | Concept front door (not yet built) | Founder | REGISTERED | **ACTIVE** | Domains registered but not deployed. Redirect to wolverineseye.com/webi3 for now. |
| webi3.io | webi3.io (domain) | Builders/developer portal (not yet built) | Founder | REGISTERED | **ACTIVE** | Redirect to wolverineseye.com/docs or keep for future developer hub. |
| webi3-frontend (old) | webi3-frontend (repo) | Older frontend | Founder | UNCLEAR | **ARCHIVE** | Appears to be duplicate/superseded by webi3-website. Archive or delete. |

**Verdict:**
- ❌ Multiple domain registrations (webi3.ai, webi3.io, webi3s.com) without clear delegation
- ❌ webi3-frontend repo is a duplicate
- ✅ wolverineseye.com is correctly canonical
- **Action:** 
  - Consolidate: webi3.ai → redirect to wolverineseye.com/webi3
  - Consolidate: webi3.io → redirect to wolverineseye.com/docs or reserve for Phase 2 developer hub
  - Archive: webi3-frontend repo
  - Decision: Do you want separate domains (webi3.ai, webi3.io) or single wolverineseye.com subdirectory?

---

## 4. Experimentation / AI Studio Layer

| Asset | Domain | Role | Owner | Status | Classification | Attack Notes |
|-------|--------|------|-------|--------|-----------------|--------------|
| shox.grok.me | shox.grok.me | $hoX core persona (foundational) | Founder | LIVE | **LAB** | Foundational experiment, but still on external Grok platform. Should be migrated or archived. |
| hox.grok.me | hox.grok.me | Hox variant/experiment | Founder | LIVE | **LAB** | Unclear distinction from shox. Redundant or experimental variant? |
| sanmen.grok.me | sanmen.grok.me | SanMen character/guide persona | Founder | LIVE | **LAB** | Character experiment. If production-ready, move to webi3.ai via wolverines.ai.studio. |
| cipheron.grok.me | cipheron.grok.me | Cipheron security persona | Founder | LIVE | **LAB** | Security-focused persona. Experimental. |
| cyberon.grok.me | cyberon.grok.me | Cyberon guardian persona | Founder | LIVE | **LAB** | Guardian persona. Experimental. |
| grapeviolet.grok.me | grapeviolet.grok.me | GrapeViolet red-team persona | Founder | LIVE | **LAB** | Red-team/testing persona. Experimental. |
| wolverines.grok.me | wolverines.grok.me | Wolverines umbrella persona | Founder | LIVE | **LAB** | Umbrella identity. Experimental. |
| webi3.grok.me | webi3.grok.me | Webi3 general persona | Founder | LIVE | **LAB** | General-purpose Webi3 persona. Experimental. |
| wolverines.ai.studio | wolverines.ai.studio | Meta AI Studio dashboard | Founder | LIVE | **LAB** | Experimentation surface for personas. Correct classification. |

**Verdict:**
- ❌ Eight grok.me instances, all on external platform (Grok-hosted)
- ❌ Unclear distinction between personas (shox vs hox, wolverines vs webi3)
- ❌ No graduation path from LAB (grok.me) to production (wolverineseye.com)
- ❌ External dependency on Grok platform (not owned, not versioned)
- **Action:**
  - Decision required: Are these personas experiments to be archived, or capabilities to be migrated to webi3.ai?
  - If archived: Move all 8 to ARCHIVE status, deprecate grok.me instances
  - If production: Define graduation criteria and migration path to wolverineseye.com
  - Recommend: Archive shox.grok.me, hox.grok.me, webi3.grok.me (redundant with Phase 0). Keep character personas (sanmen, cipheron, cyberon, grapeviolet) in LAB until graduation criteria are defined.

---

## 5. Culture / Identity Layer

| Asset | Repository / Domain | Role | Owner | Status | Classification | Attack Notes |
|-------|-------------------|------|-------|--------|-----------------|--------------|
| Wolverines Eye | wolverines-eye (repo) | Culture/identity layer (stubbed) | Founder | STUB | **LAB** | Conceptual, not implemented. Placeholder only. |
| Wolverines Eye (app) | wolverines-eye-app (repo) | Mobile app concept (unsure) | Founder | UNCLEAR | **LAB** | Mobile experimentation. Unsure of purpose or status. |
| Wolverines Eye (web) | wolverines-eye-web (repo) | Web interface for culture layer (stubbed) | Founder | STUB | **LAB** | Stubbed, not implemented. |
| Wolverines Eye (API) | wolverines-eye-api (repo) | API for culture layer (stubbed) | Founder | STUB | **LAB** | Stubbed, not implemented. |
| Wolverines Music | wolverines-music (repo) | Music/NFT/artist platform (Shopify-based) | Founder | LIVE | **ACTIVE** | Active but separate product line. Not part of Webi3 core. |
| Wolverines Music Shopify | wolverines-music-shopify (repo) | Shopify backend for music products | Founder | LIVE | **ACTIVE** | Dependency of wolverines-music. Keep separate. |
| wolverineseye.io | wolverineseye.io (domain) | Legacy/culture domain (unsure) | Founder | UNCLEAR | **ARCHIVE** | Unclear status. Likely legacy. Recommend archiving or redirecting. |
| wolverineseye.ai | wolverineseye.ai (domain) | Legacy/culture domain (unsure) | Founder | UNCLEAR | **ARCHIVE** | Unclear status. Likely legacy. Recommend archiving or redirecting. |

**Verdict:**
- ❌ Wolverines Eye is fully stubbed (4 repos, all placeholder)
- ❌ wolverineseye.io and wolverineseye.ai are unclear — not currently used
- ✅ wolverines-music is active and separate — correctly classified as ACTIVE
- **Action:**
  - Consolidate Wolverines Eye: Archive or implement. Do not leave as stubbed repos.
  - Archive domains: wolverineseye.io and wolverineseye.ai (redirect to wolverineseye.com or archive)
  - Decision: Is Wolverines Eye a Phase 1+ priority, or should the repos be archived?

---

## 6. Product Lines (Separate Ecosystems)

| Asset | Repository | Role | Owner | Status | Classification | Attack Notes |
|-------|-----------|------|-------|--------|-----------------|--------------|
| ibCode | ibcode (repo) | ibCode platform (separate product line) | Founder | UNKNOWN | **ACTIVE** | Separate product. Not part of Webi3. Keep independent. |
| EduFly | edufly (repo) | EduFly platform (separate product line) | Founder | UNKNOWN | **ACTIVE** | Separate product. Not part of Webi3. Keep independent. |

**Verdict:**
- ✅ ibCode and EduFly are correctly classified as separate product lines
- ✅ No conflicts with Webi3 core
- **Action:** No changes needed. Keep these separate from the Webi3 canonical map.

---

## 7. Infrastructure / Utilities

| Asset | Repository | Role | Owner | Status | Classification | Attack Notes |
|-------|-----------|------|-------|--------|-----------------|--------------|
| Wolverines Core | wolverines-core (repo) | Core utilities (unsure) | Founder | UNCLEAR | **LAB** | Purpose unclear. Archive or document. |
| Wolverines Common | wolverines-common (repo) | Common libraries (unsure) | Founder | UNCLEAR | **LAB** | Purpose unclear. Archive or document. |
| Webi3 Audio | webi3-audio (repo) | Audio/Quantum Audio Forge concept | Founder | STUB | **LAB** | Conceptual. Archive or implement in Phase 2+. |
| Webi3 OS | webi3-os (repo) | Webi3 OS concept (stubbed) | Founder | STUB | **LAB** | Stubbed. This is V2 territory, not Phase 0+1. Archive or reserve for Phase 3+. |
| Wolverines OS | wolverines-os (repo) | Wolverines OS concept (private/inaccessible) | Founder | PRIVATE | **LAB** | Inaccessible. Archive or clarify status. |

**Verdict:**
- ❌ Multiple stubbed/unclear utilities (wolverines-core, wolverines-common, webi3-audio, webi3-os, wolverines-os)
- ❌ No clear purpose for utility repos
- **Action:** 
  - Archive all stubbed utilities (webi3-audio, webi3-os, wolverines-os)
  - Clarify: Are wolverines-core and wolverines-common active dependencies? If yes, document. If no, archive.
  - Decision: Do you need these repos, or should they be archived?

---

## 8. Deprecated / Unclear

| Asset | Repository / Domain | Role | Owner | Status | Classification | Attack Notes |
|-------|-------------------|------|-------|--------|-----------------|--------------|
| Webi3 (backend) | Webi3 (repo) | Separate Webi3 backend (older, possibly deprecated) | Founder | UNCLEAR | **ARCHIVE** | Likely superseded by shox router. Archive or clarify. |
| webi3-backend | webi3-backend (repo) | Older backend (possibly duplicate of Webi3) | Founder | UNCLEAR | **ARCHIVE** | Duplicate or superseded. Archive. |
| webi3s | webi3s (repo) | Early Webi3 experiments, prototypes (unsure of current state) | Founder | UNCLEAR | **ARCHIVE** | Early prototype. Archive unless active. |
| webi3s.com | webi3s.com (domain) | Legacy domain (unsure of status) | Founder | UNCLEAR | **ARCHIVE** | Legacy. Redirect or archive. |
| Wolverinese | Wolverinese (repo) | Profile/README repo, not a code project | Founder | STATIC | **ARCHIVE** | Profile only. Keep as reference. |

**Verdict:**
- ❌ Multiple deprecated/unclear repos (Webi3, webi3-backend, webi3s)
- ✅ Wolverinese profile is static — correctly archived
- **Action:** Archive all unclear/deprecated repos. Do not delete; keep for reference.

---

## Canonical Map Summary

### CORE (Essential)

1. **wolverineseye.com** — Canonical front door
2. **webi3-website** — Primary frontend (Phase 0)
3. **WOS Constitution (Founding + Working v0.3)** — Governance source
4. **$hoX Constitution (Phase 0 system prompt)** — Behaviour layer

### ACTIVE (In Use)

1. **shox router** — Intelligence routing and policy gate
2. **webi3.ai** — Domain (registered, redirect to wolverineseye.com/webi3)
3. **webi3.io** — Domain (registered, redirect to wolverineseye.com/docs)
4. **wolverines-music** — Separate product line (active)
5. **wolverines-music-shopify** — Music backend (active)
6. **ibCode** — Separate product line (active)
7. **EduFly** — Separate product line (active)

### LAB (Experiments)

1. **shox.grok.me** — $hoX experiment (recommend archive or migrate)
2. **hox.grok.me** — Hox variant (recommend archive)
3. **sanmen.grok.me** — SanMen persona (keep, define graduation path)
4. **cipheron.grok.me** — Cipheron persona (keep, define graduation path)
5. **cyberon.grok.me** — Cyberon persona (keep, define graduation path)
6. **grapeviolet.grok.me** — GrapeViolet persona (keep, define graduation path)
7. **wolverines.grok.me** — Wolverines persona (keep, define graduation path)
8. **webi3.grok.me** — Webi3 persona (recommend archive, superseded by Phase 0)
9. **wolverines.ai.studio** — Experimentation surface (correct classification)
10. **Wolverines Eye (all 4 repos)** — Culture layer (all stubbed, need decision)
11. **wolverines-core** — Utilities (unclear, need clarification)
12. **wolverines-common** — Libraries (unclear, need clarification)
13. **webi3-audio** — Audio concept (stubbed)

### ARCHIVE (Historical / Deprecated)

1. **webi3-frontend** — Superseded by webi3-website
2. **Webi3 (repo)** — Older backend, likely superseded by shox
3. **webi3-backend** — Duplicate or superseded
4. **webi3s** — Early prototype
5. **webi3s.com** — Legacy domain (redirect or archive)
6. **wolverineseye.io** — Legacy culture domain (redirect or archive)
7. **wolverineseye.ai** — Legacy culture domain (redirect or archive)
8. **Wolverinese (profile repo)** — Static reference
9. **webi3-os** — Stubbed OS concept (V2 territory)
10. **wolverines-os** — Inaccessible OS concept
11. **webi3-audio** — Stubbed audio concept

---

## Critical Decisions Required

| Decision | Options | Recommendation |
|----------|---------|-----------------|
| **Wolverines Eye** | Implement in Phase 1+, or Archive? | **Archive for now.** It's V2/Phase 3 territory. Keep repos for reference. |
| **grok.me personas** | Migrate to webi3.ai production, or Archive? | **Hybrid:** Archive shox.grok.me, hox.grok.me, webi3.grok.me. Define graduation criteria for character personas (sanmen, cipheron, cyberon, grapeviolet). |
| **webi3.ai / webi3.io domains** | Separate domains, or Redirect to wolverineseye.com? | **Redirect for Phase 0+1.** Reserve domains for Phase 2+ if needed. |
| **wolverines-core / wolverines-common** | Active dependencies, or Archive? | **Clarify and decide.** If active, document. If not, archive. |
| **Deprecated backends** | Delete, or Archive? | **Archive for reference.** Do not delete. |

---

## Canonical Map Status

- **Date:** 2026-09-07
- **Authority:** Founder
- **Status:** Draft for review
- **Next:** Your decision on critical questions above

---

## Phase 1 Baseline

Once canonical map is frozen:

1. **CORE layer** is locked: wolverineseye.com + webi3-website + WOS Constitution
2. **ACTIVE layer** is stable: shox router + separate product lines
3. **LAB layer** is explicit: Personas with graduation criteria; Wolverines Eye archived
4. **ARCHIVE layer** is clean: Deprecated repos and domains clearly marked
5. **Domains** are consolidated: webi3.ai/webi3.io redirect to wolverineseye.com or reserved

Phase 1 can now proceed with clarity on what is canonical and what is experimental.

