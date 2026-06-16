# 88cn-index-data

Open, structured AI project data submissions for the [88CN Index](https://88cn.com).

## What Is This Repository

This repository stores **public project facts** — structured JSON files describing AI projects, tools, and products. It serves as the community contribution channel for the 88CN Free AI Project Growth Index.

This repository does **not** store:

- Founder emails, phone numbers, or private contact data
- Revenue, MRR, ARR, or financial metrics
- API keys, access tokens, or credentials
- Analytics screenshots or private dashboards
- Stripe customer/session data
- Signal Scores or Source Confidence (those are computed by 88CN)
- Editorial Notes or Claim verification status
- Backer, capital, or investor data

## Relationship with 88cn.com

```
GitHub PR (this repo)  →  Maintainer Review  →  external_project_imports  →  88CN Admin Review  →  Published on 88cn.com
```

- **Merging a PR here does NOT automatically publish the project on 88cn.com.**
- Merged data enters the `external_project_imports` staging table in 88CN's database.
- 88CN admins review imports before any project becomes publicly visible.
- 88CN does not guarantee traffic, ranking, funding, or AI search citation.

## How to Add a Project

1. Copy `data/projects/example-ai-project.json` to `data/projects/<your-slug>.json`.
2. Fill in the required fields: name, slug, website_url, category_slug, one_liner, source_type, region, language.
3. Add at least one public source beyond the website (github_url, docs_url, product_hunt_url, etc.).
4. Choose a `category_slug` from `taxonomy/categories.json`.
5. Run `npm test` locally to validate:
   ```bash
   npm ci
   npm test
   ```
6. Open a pull request.

## License

- **Code** (scripts, schemas, workflows, configuration): [MIT License](LICENSE)
- **Data** (project JSON files in `data/projects/`, taxonomy files in `taxonomy/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

See [DATA_LICENSE.md](DATA_LICENSE.md) for details.

## Dynamic 88CN Fields (Not in This Repo)

The following are computed or managed by the 88CN platform and are **not** stored in this repository:

- Signal Score
- Source Confidence
- Editorial Notes
- Claim verification status
- Admin review status
- Traffic, click, or engagement data
- Backer or capital interest data

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## Security

If you accidentally submitted private information, see [SECURITY.md](SECURITY.md). Do not file private data in public issues.
