# Privacy Boundary

## What This Repository Accepts

88cn-index-data only accepts **publicly available** project information:

- Project name and description
- Public website URLs
- Public GitHub repository URLs
- Public documentation, pricing, and launch URLs
- Public founder profile URLs
- Category, region, and technology stack metadata

## What This Repository Prohibits

The following are **strictly prohibited** and will cause validation failure:

### Contact Data
- Email addresses (`founder_email`, `email`, etc.)
- Phone numbers (`phone`)
- Private messaging handles (`wechat`, `telegram`, `discord_private`)

### Financial Data
- Revenue, MRR, ARR, GMV
- Stripe data (`stripe`, `stripe_customer_id`, `stripe_session_id`)
- Bank or investor information

### Authentication Data
- API keys, access tokens (`api_key`, `access_token`)
- Passwords, secrets (`secret`, `password`)
- Session tokens or cookies

### Private Operational Data
- Analytics screenshots (`analytics_screenshot`)
- Private dashboards (`private_dashboard`)
- Customer lists (`private_customer_list`, `customer_emails`)
- IP addresses (`ip_address`)

### Investment / Capital Data
- Investor or backer identities (`investor`, `backer`)
- Investment or equity information (`investment`, `equity`)

## What Happens If Prohibited Data Is Found

Validation scripts (`npm run privacy:check` and `npm run validate`) will reject any project containing prohibited fields or sensitive patterns. The PR will not pass CI.

## What Happens If Private Data Is Accidentally Submitted

See [SECURITY.md](../SECURITY.md) for reporting procedures. Do not file private data in public issues.

## Stripe as a Technology Choice

The `stripe` slug in `taxonomy/tech-stacks.json` is a technology stack label (i.e., "this project uses Stripe for payments"). It does **not** mean Stripe private data is accepted. The privacy boundary still blocks `stripe_customer_id`, `stripe_session_id`, and any other Stripe private field.

## Scope

This privacy boundary applies to all data in `data/projects/`. It does not cover:

- GitHub PR comments or issue discussions (governed by GitHub's terms)
- 88CN platform data (governed by 88CN's privacy policy)
- External links referenced in project entries (governed by those sites' policies)
