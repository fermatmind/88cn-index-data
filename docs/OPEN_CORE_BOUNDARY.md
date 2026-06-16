# Open Core Boundary

## What Is Open

The following are public and open-source in this repository:

- **Project data files** (`data/projects/`) — Static public project facts
- **Taxonomy files** (`taxonomy/`) — Categories, source types, regions, tech stacks
- **JSON Schema** (`schemas/`) — Project data schema
- **Validation scripts** (`scripts/`) — Data validation and aggregation
- **Contribution workflow** — PR templates, CI, CODEOWNERS
- **Documentation** (`docs/`) — Data contract, privacy boundary, review policies

## What Is NOT Open (88CN Platform)

The following are computed, managed, or stored by the 88CN platform and are **not** in this repository:

### Computed Metrics
- **Signal Score** — Computed from public signals, proprietary algorithm
- **Source Confidence** — Computed confidence level per project

### Editorial Content
- **Editorial Notes** — Human-reviewed editorial content
- **Editorial Jobs** — AI draft generation and review pipeline

### Verification Data
- **Claim Verification** — Founder identity verification status
- **Admin Review Metadata** — Review decisions, reviewer identity, timestamps

### Dynamic Data
- **Traffic / Click Data** — Page views, click-throughs, engagement
- **Backer / Capital Data** — Interest expressions, capital signals (future phase)

### Private Data
- **Founder Private Data** — Contact information, verification documents
- **Consent Records** — Per-project data processing consents

## Why This Boundary Exists

1. **Privacy** — Founder contact data, verification documents, and consent records must not be public.
2. **Proprietary algorithms** — The Signal Score formula and Source Confidence calculation are 88CN platform logic.
3. **Editorial integrity** — Editorial Notes require human review and should not be crowd-edited.
4. **Security** — Admin review metadata and verification status should not be publicly writable.
5. **Future monetization** — Some platform features may be commercial in future phases.

## What Contributors Should Know

- You can submit public project facts via PR.
- You cannot influence Signal Scores or Source Confidence through this repo.
- You cannot mark a project as "verified" or "claimed" — that requires 88CN's claim system.
- You cannot publish directly to 88cn.com — that requires Admin Review.
