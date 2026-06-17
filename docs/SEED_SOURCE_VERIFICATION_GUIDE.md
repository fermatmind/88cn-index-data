# Seed Source Verification Guide

How to verify that every source URL in a seed profile is legitimate, official, and appropriate for the index.

---

## 1. Verifying `website_url`

The `website_url` must be the **official project website**, not a third-party page about the project.

### Check

- Does the domain match the project name or the parent company?
- Does the page describe the product/service itself (not someone else writing about it)?
- Is there a login/signup, product demo, or clear call-to-action?

### Reject if

- The URL is a Medium post, Substack, or blog article about the project written by a third party.
- The URL is a scraper or mirror site.
- The URL is a directory listing page (e.g., Product Hunt, Toolify, TAAFT).
- The URL is a generic landing page with no connection to the project.
- The URL redirects to a different unrelated domain.

### Edge cases

- **`.github.io` or `.vercel.app` domains** — acceptable if the project's official site is hosted there. Check if the GitHub org/repo name matches.
- **Subdirectory on a company site** (e.g., `openai.com/chatgpt`) — acceptable if the parent company owns the domain and the subdirectory is the product's official home.

---

## 2. Verifying `github_url`

The `github_url` must be the **official or credible primary repository** for the project.

### Check

- Does the GitHub organization or username match the project or parent company?
- Is the repository actively maintained? (Check: last commit within 12 months, or the project has a clear release history.)
- Does the README describe the project accurately and link to the official website?
- Is the star count consistent with the project's public profile? (A widely-known project with 3 stars is suspicious; a niche dev tool with 15k stars also warrants a second look.)

### Reject if

- The repository is a fork with no substantial original work.
- The repository is a mirror of the actual project.
- The repository appears to be a cloned/stolen repo (different org name, no attribution, artificially inflated stars).
- The repository has no README, no commits beyond the initial scaffold, and no community activity.
- The repository URL points to a personal account that has no verifiable connection to the project.

### What if there is no GitHub?

If the project is closed-source and has no public repository, omit `github_url`. Do not link to a third-party repo, a competitor's repo, or an unofficial community mirror.

---

## 3. Verifying `docs_url`

The `docs_url` must be the **official documentation site** for the project.

### Check

- Is the documentation hosted on the project's official domain or a subdomain (e.g., `docs.example.com`)?
- Does the content match the project's features, API, and versioning?
- Is the documentation current and maintained?

### Reject if

- The URL is a third-party tutorial, blog post, or community wiki with no official affiliation.
- The URL is a generic docs platform (e.g., someone's Notion or GitBook) with no clear connection to the project.
- The URL is a competitor's documentation that happens to mention the project.

### Acceptable formats

- Subdomain: `docs.example.com`
- Path: `example.com/docs`
- Dedicated docs platforms that the project officially uses: ReadTheDocs, GitBook, Mintlify — but **only** if clearly linked from the official website.

---

## 4. Verifying `product_hunt_url`

The `product_hunt_url` must be the **Product Hunt launch page** for the project.

### Check

- Does the Product Hunt page title and tagline match the project?
- Does the PH page link to the same `website_url` as the profile?
- Is the maker/founder name consistent with other public sources?

### Reject if

- The PH URL is for a different product with a similar name.
- The PH page is a "coming soon" listing with no actual launch.
- The PH URL is a collection, topic page, or search results page, not a product page.

### Multiple launches

If a project has multiple PH launches (e.g., relaunch, major version), use the most recent one that represents the current product.

---

## 5. Verifying `hacker_news_url`

The `hacker_news_url` must be a **Hacker News discussion thread** about the project.

### Check

- Does the HN post title match the project name or describe the project accurately?
- Does the linked URL in the HN post point to the project's official website or launch page?
- Does the discussion include comments that confirm the project's identity?

### Reject if

- The HN URL is a "Show HN" for a completely different project.
- The HN discussion is tangentially related (e.g., a general AI discussion where the project is mentioned in passing).
- The URL is an HN user profile, job listing, or non-discussion page.

### No HN presence

Many legitimate projects have no HN discussion. This is normal. Do not force an HN URL. Omit the field if no relevant HN thread exists.

---

## 6. Verifying `founder_public_url`

The `founder_public_url` must be a **public, non-private profile** of the project's founder or maintainer.

### Check

- Is the profile clearly that of the project's founder or core maintainer?
- Is the connection between the person and the project verifiable? (Check: GitHub org membership, website team page, LinkedIn work history, Twitter bio.)

### Acceptable platforms

- LinkedIn public profile
- Twitter/X public profile
- GitHub user profile
- Personal website with a clear bio

### Reject if

- The URL is a private message link (DM, email-to-web form).
- The URL requires login to view any content.
- The URL is a company "About Us" page that lists the founder as part of a team (use the founder's personal public profile instead).
- The profile has no visible connection to the project.

### Important

Only one founder profile is needed — typically the CEO, CTO, or primary maintainer. Do not scrape multiple founder profiles.

---

## 7. Verifying `pricing_url`

The `pricing_url` must be a **public pricing page** for the project.

### Check

- Does the page display actual pricing information (tiers, plans, per-seat costs, usage-based pricing)?
- Is the page on the project's official domain?

### Reject if

- The URL is a "Contact Sales" page with no pricing information.
- The URL is a third-party pricing comparison or review page.
- The URL is a blog post about pricing (even if official) rather than the actual pricing page.
- The URL requires login to view pricing.

### Free or open-source projects

If the project is free or open-source with no pricing page, omit `pricing_url`.

---

## 8. Handling Uncertain Projects

If you cannot confidently verify one or more sources for a project:

1. **Do not include it** in the Seed 100 PR. A smaller, fully verified batch is better than a larger batch with questionable entries.
2. **Mark it as a candidate** in a separate tracking document or issue outside the PR.
3. **Wait for founder submission** — the project may eventually be claimed by its founder, which provides the strongest verification.

### When in doubt

If you have to reason your way into accepting a source ("well, the domain kind of matches," "the README sort of describes it"), that is a sign the source is not solid. Trust clear, obvious matches. Reject ambiguous ones.
