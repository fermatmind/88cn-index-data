# Seed 100 Curation Policy

## Why Seed 100

The Seed 100 is the first batch of verified public AI project profiles for **88cn-index-data**. Its purpose is to establish a high-quality, maintainer-reviewed corpus that demonstrates the data model, curation standards, and source hygiene expected for every project in the index.

This initial batch serves as:

- A **reference baseline** for future contributors to understand required data quality.
- A **signal foundation** that downstream systems (88cn-web, structured data consumers) can trust.
- A **public proof of work** showing that every profile is built from official sources, not scraped from directories.

The number 100 is a scope commitment — large enough to be useful, small enough to curate carefully.

## Selection Criteria

Projects in the Seed 100 must meet **all** of the following:

1. **Real and verifiable** — the project exists as a live service, tool, or open-source project.
2. **Has a `website_url`** — the official project website is required.
3. **Has at least one public source** beyond the website. Accepted public sources:
   - Official GitHub repository
   - Official documentation site
   - Product Hunt launch page
   - Hacker News discussion
   - Founder public profile (LinkedIn, Twitter/X)
   - Official blog or changelog
4. **AI-related** — the project's core function involves AI, machine learning, NLP, computer vision, foundation models, or AI infrastructure.

## Rejection Criteria

The following are not allowed in any seed profile:

1. **Fake or unverifiable projects** — no dead links, placeholder sites, or projects with zero public footprint.
2. **Private data** — no contact info, revenue, API keys, analytics, or investment data. See [PRIVACY_BOUNDARY.md](./PRIVACY_BOUNDARY.md).
3. **Third-party directory scraping** — do not source data from AI directories, aggregator sites, or competitor indexes.

## Data Source Rules

Only the following sources may be used to populate seed profiles:

| Allowed Sources | Prohibited Sources |
|---|---|
| Official project website | Toolify.ai |
| Official GitHub repository | TAAFT (There's An AI For That) |
| Official documentation site | SaaSHub |
| Product Hunt launch page | Futurepedia |
| Hacker News discussion thread | There's An AI For That |
| Founder public profile (LinkedIn, Twitter/X) | Any AI directory aggregator |
| Official blog or changelog | Any third-party review or listicle site |

**Do not** copy `one_liner`, `description`, or any text from prohibited sources. Descriptions must be original factual summaries written from the allowed sources.

## Why No Private Data

Private data is prohibited for legal, safety, and policy reasons:

- **Contact info** (email, phone, WeChat, Telegram) — not a public directory of personal details.
- **Revenue, MRR, ARR, GMV** — unverifiable and often confidential.
- **API keys, tokens, credentials** — security risk.
- **Analytics, dashboards, customer lists** — not public, often under NDA.
- **Investment data** (investor names, funding rounds, equity) — confidential and time-sensitive.

The index is a **public signal reference**, not a company database. Private data has no place here.

## Why No Copied Marketing Text

All `one_liner` and `description` fields must be **original factual summaries**, not marketing copy pasted from project websites or directories.

Reasons:

1. Copied marketing text may contain superlatives, unverifiable claims, or exaggerated metrics.
2. It introduces copyright and attribution ambiguity.
3. It degrades the unique signal value of the index — downstream consumers want structured facts, not repeated ad copy.
4. It can inadvertently carry directory-scraped content from prohibited sources.

Write descriptions that answer: *What does this project actually do, in plain language, based on its official website, docs, and GitHub?*

## Why All Data Still Needs Maintainer Review

Seed data is a **starting point**, not a final publication.

Even when sourced from allowed locations, every profile must pass maintainer review before it is considered ready. Reviewers check:

- Source accuracy and freshness
- Compliance with privacy boundaries
- No duplicated or overlapping profiles
- Category correctness
- No hallucinated or AI-generated filler text

A merged PR containing seed data means the data has entered the index pipeline. It does **not** mean the data has been fully published or approved for public display.

## How Seed Data Enters 88cn-web

The path from seed data to public display is:

1. **PR merged into `88cn-index-data`** — data enters the raw index.
2. **External import staging** — data is picked up by the 88cn-web ingestion pipeline.
3. **Admin review** — a maintainer reviews the imported profile in the staging environment.
4. **Approved → `preview_noindex`** — the profile is approved for internal preview but not indexed by search engines.
5. **Manual publish** — a maintainer explicitly publishes the profile, making it publicly visible and indexable.

A merge to `88cn-index-data` is step 1 of this pipeline. It does **not** mean automatic publication, and it does not mean the profile is visible to the public.

## What This Data Does NOT Mean

Inclusion in the Seed 100, or in 88CN generally, does **not** constitute:

- **Endorsement** — we do not endorse, recommend, or certify any project.
- **Traffic promise** — we make no guarantee of referral traffic, page views, or user acquisition.
- **Ranking promise** — we make no guarantee of search engine ranking, position, or visibility.
- **AI citation promise** — we make no guarantee that AI systems (LLMs, search engines, agents) will cite or reference this data.
- **Investment recommendation** — nothing in the index is financial, investment, or purchasing advice.
