#!/usr/bin/env tsx
/**
 * Prospect verification utility.
 * For each prospect: checks domain HTTP status, MX records, and email syntax.
 * Outputs verified list to stdout or specified file.
 *
 * Usage:
 *   npx tsx scripts/verify-prospects.ts --input data/outbound-prospects-v2.json [--output data/outbound-prospects-verified.json]
 *
 * Each prospect must have: name, company, email, website
 * Verified means: website returns HTTP 200/3xx AND MX record exists AND email syntax valid
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import * as dns from "dns";

// --- Helpers ---
function dnsMxLookup(domain: string): Promise<boolean> {
  return new Promise((resolvePromise) => {
    // Use Node's dns module
    const dnsMod = require("dns");
    dnsMod.resolveMx(domain, (err: any, addresses: any[]) => {
      resolvePromise(!err && addresses && addresses.length > 0);
    });
  });
}

async function checkWebsite(url: string): Promise<{ status: number; live: boolean }> {
  try {
    // Normalize URL
    let checkUrl = url.trim();
    if (!checkUrl.startsWith("http://") && !checkUrl.startsWith("https://")) {
      checkUrl = "https://" + checkUrl;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(checkUrl, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AgentFit-Bot/1.0)" },
    });

    clearTimeout(timeout);
    const status = resp.status;
    const live = status >= 200 && status < 400;
    return { status, live };
  } catch {
    // Try GET if HEAD fails (some servers reject HEAD)
    try {
      let checkUrl = url.trim();
      if (!checkUrl.startsWith("http://") && !checkUrl.startsWith("https://")) {
        checkUrl = "https://" + checkUrl;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const resp = await fetch(checkUrl, {
        method: "GET",
        signal: controller.signal,
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; AgentFit-Bot/1.0)" },
      });

      clearTimeout(timeout);
      const status = resp.status;
      const live = status >= 200 && status < 400;
      return { status, live };
    } catch {
      return { status: 0, live: false };
    }
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function getDomain(email: string): string {
  return email.split("@")[1] || "";
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2);
  const inputFile = args[args.indexOf("--input") + 1] || "data/outbound-prospects-v2.json";
  const outputFile = args[args.indexOf("--output") + 1] || "";

  if (!existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
  }

  const raw = readFileSync(inputFile, "utf-8");
  let prospects: any[];
  try {
    const parsed = JSON.parse(raw);
    prospects = Array.isArray(parsed) ? parsed : parsed.prospects || [];
  } catch {
    console.error("Invalid JSON in input file");
    process.exit(1);
  }

  console.log(`Verifying ${prospects.length} prospects...\n`);

  const verified: any[] = [];
  const failed: any[] = [];

  for (let i = 0; i < prospects.length; i++) {
    const p = prospects[i];
    const email = p.email || "";
    const website = p.website || p.domain || "";
    const domain = getDomain(email) || website.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");

    const checks: any = {
      emailValid: isValidEmail(email),
      websiteUrl: website,
      httpStatus: 0,
      websiteLive: false,
      hasMx: false,
    };

    // Check website
    const siteResult = await checkWebsite(website || domain);
    checks.httpStatus = siteResult.status;
    checks.websiteLive = siteResult.live;

    // Check MX
    checks.hasMx = await dnsMxLookup(domain);

    const passed = checks.emailValid && checks.websiteLive && checks.hasMx;
    const status = passed ? "VERIFIED" : "FAILED";

    console.log(
      `[${i + 1}/${prospects.length}] ${status} ${p.company || p.name || email} | HTTP:${checks.httpStatus} MX:${checks.hasMx ? "Y" : "N"} Email:${checks.emailValid ? "Y" : "N"}`
    );

    if (passed) {
      verified.push({ ...p, verifiedAt: new Date().toISOString() });
    } else {
      failed.push({ ...p, checks });
    }

    // Small delay to be polite
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Total: ${prospects.length}`);
  console.log(`Verified: ${verified.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\n--- FAILED PROSPECTS ---`);
    failed.forEach((p) => {
      console.log(`  ${p.company || p.name}: HTTP ${p.checks.httpStatus}, MX ${p.checks.hasMx ? "ok" : "missing"}, email ${p.checks.emailValid ? "ok" : "invalid"}`);
    });
  }

  if (outputFile) {
    const output = {
      generated_at: new Date().toISOString(),
      total_input: prospects.length,
      total_verified: verified.length,
      total_failed: failed.length,
      prospects: verified,
      failures: failed,
    };
    writeFileSync(outputFile, JSON.stringify(output, null, 2));
    console.log(`\nVerified list saved to: ${outputFile}`);
  }
}

main().catch(console.error);
