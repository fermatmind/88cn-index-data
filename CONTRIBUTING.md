# Contributing to 88cn-index-data

## How to Add a New Project

### 1. Prepare Your Data

Create a new JSON file in `data/projects/<your-slug>.json`. Copy `data/projects/example-ai-project.json` as a template.

### 2. Required Fields

You must provide:

- `schema_version`: Always `"88cn-project-v1"`
- `name`: Project name (max 120 characters)
- `slug`: URL-safe identifier (lowercase, alphanumeric, hyphens only: `^[a-z0-9]+(?:-[a-z0-9]+)*$`)
- `website_url`: Official project website (`https://` only)
- `category_slug`: From `taxonomy/categories.json`
- `one_liner`: Single sentence description (max 240 characters)
- `source_type`: From `taxonomy/source-types.json`
- `region`: From `taxonomy/regions.json`
- `language`: One of `en`, `zh`, `ja`, `de`, `fr`, `es`, `ko`, `other`

### 3. At Least One Public Source

Beyond `website_url`, you must provide at least one of:

- `github_url`
- `docs_url`
- `product_hunt_url`
- `hacker_news_url`
- `founder_public_url`
- `launch_url`

### 4. What NOT to Submit

Do NOT include any of the following in your project JSON:

- Email addresses, phone numbers, WeChat/Telegram handles
- Revenue, MRR, ARR, or financial data
- API keys, access tokens, passwords, or secrets
- Stripe data, analytics screenshots, or private dashboards
- Investor, backer, or capital information
- Customer lists or private contact data

### 5. Validate Locally

```bash
npm ci
npm test
```

All checks must pass before opening a PR.

### 6. Open a Pull Request

- Create a PR with a clear title (e.g., "Add Project: Example AI Project")
- Use the PR template and confirm the checklist
- Ensure the GitHub Actions workflow passes

## PR Review Process

1. **Automated validation** — GitHub Actions runs `npm test` (taxonomy check, privacy check, schema validation, aggregation).
2. **Human maintainer review** — A maintainer reviews the submission for accuracy, duplicates, and policy compliance.
3. **Merge** — If approved, the PR is merged.
4. **Import** — Merged data may later be imported into 88CN's `external_project_imports` staging table.
5. **Admin Review** — 88CN admins review imports before any project is published on 88cn.com.

**Note:** PR merge does NOT mean the project is published on 88cn.com.

## Requesting Changes or Removal

If you need to update or remove a project entry, open a new PR explaining the reason. For removal of private data accidentally submitted, see [SECURITY.md](SECURITY.md).

## Style Guidelines

- Use clear, factual English descriptions
- Do not use marketing exaggeration or superlatives
- Do not make ranking, traffic, or funding claims
- URLs must use `https://`
- Keep descriptions under 1200 characters
