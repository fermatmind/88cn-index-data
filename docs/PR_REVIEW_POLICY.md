# PR Review Policy

## Automated Validation

Every pull request triggers GitHub Actions validation (`validate-project.yml`):

1. `npm run taxonomy:check` — Validates taxonomy files
2. `npm run privacy:check` — Scans for forbidden fields and sensitive patterns
3. `npm run validate` — Schema validation, slug uniqueness, category/region/source checks, URL format
4. `npm run aggregate` — Generates aggregated project data and statistics

PRs that fail automated validation will not be merged.

## Human Maintainer Review

After automated checks pass, a human maintainer reviews the submission:

### What Maintainers Check

1. **Accuracy** — Does the project exist? Are the URLs real and correct?
2. **Duplicates** — Is this project already in the index?
3. **Category fit** — Is the `category_slug` appropriate?
4. **Description quality** — Is the description factual and not marketing exaggeration?
5. **Privacy** — No private data, even if it passed automated checks

### What Maintainers Reject

- Submissions with fake or placeholder data
- Duplicate projects already in the index
- Projects with no verifiable public presence
- Projects with clearly exaggerated or misleading descriptions
- Submissions containing prohibited fields that evaded automated checks
- Projects in prohibited categories (gambling, adult content, etc.)

### What Maintainers Ask Contributors To Fix

- Incorrect category classification
- Missing public sources (need at least one beyond website_url)
- Invalid or non-HTTPS URLs
- Description too short or too vague
- Slug format issues

## Merge Does NOT Mean Published

**Important:** Merging a PR into this repository does **not** mean the project is published on 88cn.com. After merge:

1. Data may be imported into 88CN's `external_project_imports` table
2. 88CN admins review the import
3. If approved, a `projects` record is created in `approved` / `preview_noindex` state
4. A separate publish action makes it publicly visible (`published` / `indexable`)

## No Automatic Indexing

88CN does not crawl or automatically index from this repository. All imports are manual and reviewed.

## Removal Requests

To request removal of a project entry:

1. Open a PR that deletes the JSON file
2. Explain the reason for removal
3. A maintainer will review and merge if appropriate

For removal of accidentally submitted private data, see [SECURITY.md](../SECURITY.md).
