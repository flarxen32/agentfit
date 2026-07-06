/**
 * submit-indexnow.ts
 *
 * Submits all production URLs from the sitemap to IndexNow (Bing, Yandex, and
 * the central IndexNow API). This is agent-executable distribution — it drives
 * organic search traffic without requiring any human platform accounts.
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts
 *
 * Requires the hex IndexNow key file to be live at:
 *   https://agentfit-mu.vercel.app/3f4c06b3a7dfb33e7fa5eff0fc67c88c.txt
 *
 * The key file content must match the key exactly.
 */

const SITE = "https://agentfit-mu.vercel.app";
const KEY = "3f4c06b3a7dfb33e7fa5eff0fc67c88c";
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

async function getUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

async function submit(endpoint: string, urls: string[]): Promise<void> {
  const body = {
    host: "agentfit-mu.vercel.app",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log(`  ${endpoint} → HTTP ${res.status} ${text ? text.slice(0, 100) : ""}`);
}

async function main() {
  console.log("IndexNow submission");
  console.log(`Site: ${SITE}`);
  const urls = await getUrls();
  console.log(`URLs from sitemap: ${urls.length}`);

  // Verify key file is accessible
  const keyRes = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyRes.ok) {
    throw new Error(`IndexNow key file not accessible: HTTP ${keyRes.status}`);
  }
  const keyContent = (await keyRes.text()).trim();
  if (keyContent !== KEY) {
    throw new Error(`Key file content mismatch: "${keyContent}" !== "${KEY}"`);
  }
  console.log("Key file verified ✓");

  for (const ep of ENDPOINTS) {
    try {
      await submit(ep, urls);
    } catch (e) {
      console.log(`  ${ep} → ERROR: ${e}`);
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
