import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const FORBIDDEN_KEYS = new Set([
  "founder_email", "email", "phone", "wechat", "telegram",
  "discord_private", "revenue", "mrr", "arr", "gmv",
  "stripe_customer_id", "stripe_session_id", "stripe",
  "api_key", "access_token", "secret", "password",
  "analytics_screenshot", "bank", "investor", "backer",
  "investment", "equity", "token", "wallet",
  "private_dashboard", "private_customer_list", "customer_emails",
  "ip_address", "cookie", "session",
]);

const SENSITIVE_PATTERNS = [
  { regex: /sk-[A-Za-z0-9]{32,}/, label: "OpenAI API key (sk-...)" },
  { regex: /ghp_[A-Za-z0-9]{36,}/, label: "GitHub personal access token" },
  { regex: /xoxb-[0-9]+-[0-9]+-[A-Za-z0-9]+/, label: "Slack bot token" },
  { regex: /AKIA[0-9A-Z]{16}/, label: "AWS access key" },
  { regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/, label: "Private key header" },
  { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, label: "Email pattern" },
];

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`  PASS: ${msg}`);
}

function scanObject(obj, filePath, prefix = "") {
  if (typeof obj !== "object" || obj === null) return;

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => scanObject(item, filePath, `${prefix}[${i}]`));
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${key}` : key;

    // Check forbidden keys
    if (FORBIDDEN_KEYS.has(key)) {
      fail(`${filePath}:${keyPath} — forbidden key: "${key}"`);
    }

    // Check string values for sensitive patterns
    if (typeof value === "string") {
      for (const { regex, label } of SENSITIVE_PATTERNS) {
        if (regex.test(value)) {
          const masked = value.slice(0, 8) + "***";
          fail(`${filePath}:${keyPath} — contains ${label} (value starts: "${masked}")`);
        }
      }
    }

    // Recurse
    if (typeof value === "object" && value !== null) {
      scanObject(value, filePath, keyPath);
    }
  }
}

const projectsDir = path.join(ROOT, "data/projects");
if (!fs.existsSync(projectsDir)) {
  console.error("data/projects/ directory not found");
  process.exit(1);
}

const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.error("No project files found");
  process.exit(1);
}

console.log(`Privacy check: ${files.length} file(s)...\n`);

for (const file of files) {
  const filePath = path.join(projectsDir, file);
  console.log(`--- ${file} ---`);

  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    fail("Cannot read file");
    continue;
  }

  let project;
  try {
    project = JSON.parse(raw);
  } catch {
    fail("Invalid JSON");
    continue;
  }

  scanObject(project, file);
  ok("No forbidden fields or sensitive patterns detected");
  console.log("");
}

if (process.exitCode) {
  console.error("Privacy check FAILED");
  process.exit(1);
}

console.log("Privacy check passed.");
