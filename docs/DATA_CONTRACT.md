# Data Contract

## Project JSON Fields

Each project entry in `data/projects/*.json` follows the schema defined in `schemas/project.schema.json`.

### Required Fields

| Field | Type | Description |
|---|---|---|
| `schema_version` | `string` | Always `"88cn-project-v1"` |
| `name` | `string` | Public project name (max 120 chars) |
| `slug` | `string` | URL-safe identifier (`^[a-z0-9]+(?:-[a-z0-9]+)*$`) |
| `website_url` | `string` | Official website (`https://` only) |
| `category_slug` | `string` | From `taxonomy/categories.json` |
| `one_liner` | `string` | Single sentence description (max 240 chars) |
| `source_type` | `string` | From `taxonomy/source-types.json` |
| `region` | `string` | From `taxonomy/regions.json` |
| `language` | `string` | `en`, `zh`, `ja`, `de`, `fr`, `es`, `ko`, `other` |

### Optional Fields

| Field | Type | Description |
|---|---|---|
| `description` | `string` | Longer description (max 1200 chars) |
| `github_url` | `string` | Public GitHub repository (`https://`) |
| `docs_url` | `string` | Documentation URL (`https://`) |
| `pricing_url` | `string` | Pricing page URL (`https://`) |
| `product_hunt_url` | `string` | Product Hunt launch URL (`https://`) |
| `hacker_news_url` | `string` | Hacker News URL (`https://`) |
| `founder_public_url` | `string` | Founder's public profile URL (`https://`) |
| `launch_url` | `string` | Launch announcement URL (`https://`) |
| `tags` | `array` | Discovery tags (max 8, each max 32 chars) |
| `tech_stack` | `array` | Technology stack slugs (max 12) |

## Public Source Requirement

At least one optional public source field beyond `website_url` must be provided. Submissions without any public sources will be rejected by validation.

## URL Rules

All URLs must use the `https://` protocol. The following are blocked:

- `http://`
- `javascript:`
- `data:`
- `file:`
- `ftp:`
- `localhost`, `127.0.0.1`, `0.0.0.0`, `::1`

## Taxonomy

All slugs must reference existing entries in the taxonomy files:

- `category_slug` → `taxonomy/categories.json`
- `source_type` → `taxonomy/source-types.json`
- `region` → `taxonomy/regions.json`
- `tech_stack` entries → `taxonomy/tech-stacks.json`

## No Private Data

The following are explicitly forbidden in any project JSON:

- Emails, phone numbers, private contact data
- Revenue, MRR, ARR, GMV, or financial metrics
- API keys, access tokens, passwords, or secrets
- Stripe customer/session/checkout data
- Analytics screenshots or private dashboards
- Investor, backer, or capital information
- Private customer lists or contact data

## No Automatic Publication

Merging a PR into this repository does **not** automatically publish the project on 88cn.com. Merged data enters `external_project_imports` staging, then goes through 88CN Admin Review.

## External Import Relationship

Data merged into `88cn-index-data` may later be imported into 88CN's database via the `external_project_imports` table. This process is:

1. Maintainer merges PR into `88cn-index-data`
2. Data is imported into `external_project_imports` (manually or via scheduled sync)
3. 88CN admins review imports
4. Approved imports create `projects` records (status: `approved`, index_status: `preview_noindex`)
5. Admin publishes project (status: `published`, index_status: `indexable`)
