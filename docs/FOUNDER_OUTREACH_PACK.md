# Founder Outreach Pack

## What is 88CN

88CN is a free AI Project Growth Index that provides structured public profiles for AI projects. Each profile contains:

- **Verified public metadata** — project name, one-liner, description, category, and region.
- **Official source links** — website, GitHub, documentation, pricing page, changelog, and launch discussions.
- **Source confidence indicators** — every field is traced to its origin, so downstream consumers know whether a claim comes from an official site, a founder profile, or public discussion.
- **Maintainer-reviewed index** — all data passes through human review before publication.

The index is designed to be consumed by search engines, AI retrieval systems, developer tools, and anyone looking for clean, structured information about AI projects. It is not a directory, not a listing marketplace, and not a ranking platform.

## Why Founders Should Claim Their Project

Founder-claimed profiles carry higher signal quality. Claiming your project lets you:

1. **Correct public facts** — fix outdated or inaccurate information pulled from public sources.
2. **Improve your machine-readable profile** — structured metadata is what search engines and AI systems consume. A complete, accurate profile is a stronger signal.
3. **Add official sources** — link your official docs, GitHub, changelog, and pricing page so downstream systems reference the right URLs.
4. **Clarify your project's scope** — refine your category, one-liner, and description so systems understand what you actually build.
5. **Prepare for founder-claimed status** — claimed profiles receive a verification marker in the index, distinguishing them from unclaimed, source-only profiles.

Claiming is free. There is no fee, no application process, and no commitment.

## What 88CN Does NOT Promise

Founders should have clear expectations. 88CN makes **no guarantees** about:

- **Search ranking** — claiming a profile does not improve your position in Google, Bing, or any search engine.
- **Traffic** — we do not promise referral traffic, page views, user signups, or customer acquisition.
- **AI citation** — we do not guarantee that ChatGPT, Claude, Gemini, Perplexity, or any AI system will cite or surface your profile.
- **Funding** — the index is not an investor discovery platform and does not facilitate fundraising.
- **Backlink weight** — any links in the index carry `rel="nofollow"` and do not confer SEO value.

These are explicit non-promises. If an outreach message from anyone claiming to represent 88CN makes such promises, it is not from us.

## How to Claim Your Project

There are two paths:

### Option A: Open a PR (Preferred)

1. Find your project's JSON file in `data/projects/`.
2. Create a pull request updating your profile with corrections, additions, or the `founder_claimed: true` field.
3. A maintainer will review and merge your PR.
4. See [MAINTAINER_GUIDE.md](./MAINTAINER_GUIDE.md) for what reviewers check.

### Option B: Request Correction or Removal

If you prefer not to work with PRs:

1. Open a GitHub Issue in `88cn-index-data` with the label `project-correction`.
2. Describe what needs to be corrected or removed.
3. A maintainer will handle it.

## Privacy Commitment

88CN does not collect, store, or publish private data. Specifically:

- No email addresses are stored or displayed.
- No phone numbers, private messaging handles, or personal contact details.
- No revenue, analytics, or financial data.
- No API keys, tokens, or credentials.

Founder-claimed status does not require submitting private data. See [PRIVACY_BOUNDARY.md](./PRIVACY_BOUNDARY.md) for the full policy.

## Outreach Principles

When reaching out to founders, follow these principles:

- **Optional** — claiming is never required. Founders are free to ignore outreach.
- **Calm** — no urgency, no deadlines, no "limited time" framing.
- **Respectful** — one contact attempt is sufficient. Do not follow up repeatedly.
- **No FOMO** — do not imply that not claiming will harm the project's visibility, reputation, or opportunities.
- **No promises** — do not make claims about ranking, traffic, AI citation, or funding.
