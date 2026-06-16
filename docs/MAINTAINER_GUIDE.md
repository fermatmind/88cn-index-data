# Maintainer Guide

## How to Review PRs

### Step 1: Check CI

Ensure all GitHub Actions checks pass:
- `npm run taxonomy:check` — green
- `npm run privacy:check` — green
- `npm run validate` — green
- `npm run aggregate` — green

If any check fails, request the contributor to fix before reviewing.

### Step 2: Verify the Project

- Visit the `website_url` — does it load? Is it a real project?
- Check `github_url` if provided — is it a real repository?
- Verify the project matches the chosen `category_slug`
- Confirm the `one_liner` and `description` are factual (not marketing hype)

### Step 3: Check for Duplicates

- Search existing `data/projects/` for similar names or slugs
- If a duplicate exists, ask the contributor to close the PR or explain why it's distinct

### Step 4: Review Data Quality

- Slug follows the pattern `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- All URLs use `https://`
- At least one public source beyond `website_url` is provided
- Description is not empty or placeholder text
- No marketing exaggeration, superlatives, or unverifiable claims

### Step 5: Privacy Check

- No email addresses, phone numbers, or private contact data
- No API keys, tokens, or credentials
- No revenue or financial data
- No Stripe private fields (`stripe_customer_id`, etc.)
- Even if automated checks passed, do a manual scan

### Step 6: Merge or Request Changes

- If everything looks good, approve and merge
- If issues found, request changes with specific feedback

## What to Reject

- **Fake projects** — No verifiable public presence
- **Private data** — Any prohibited field, even if automated check missed it
- **Marketing spam** — Exaggerated claims, SEO-optimized descriptions, promotional language
- **Duplicate entries** — Already in the index
- **Prohibited categories** — Gambling, adult content, illegal activities

## Handling Suspicious Submissions

If a submission looks suspicious:

1. **Do not merge** — Mark as "changes requested"
2. **Check the contributor's GitHub profile** — New account with no activity?
3. **Verify URLs more carefully** — Are they real or placeholder domains?
4. **Check for hidden fields** — Does the JSON contain extra keys not in the schema?
5. **Ask for clarification** — Request additional public sources or context

## Handling Removal Requests

1. The contributor or project owner opens a PR deleting the JSON file
2. Verify the request is legitimate (from the project owner or a maintainer)
3. Check if the project has been published on 88cn.com — if so, coordinate with 88CN admin
4. Merge the deletion PR
5. Note: git history retains the deleted file

## Privacy Preservation

- Never include private data in PR comments or issue discussions
- If a contributor accidentally submitted private data, ask them to force-push a cleaned commit or open a new PR removing the data
- For urgent private data exposure, see [SECURITY.md](../SECURITY.md)

## Taxonomy Updates

To add new categories, source types, regions, or tech stacks:

1. Open a PR modifying the relevant `taxonomy/*.json` file
2. Ensure slugs are unique and follow the pattern
3. Update documentation if needed
4. Existing project data should not be affected
