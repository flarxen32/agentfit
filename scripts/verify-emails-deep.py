#!/usr/bin/env python3
"""
Deep email verification for prospect list.
For each prospect:
  1. Resolve domain DNS (A/AAAA)
  2. Check MX records exist
  3. HTTP probe website (GET, follow redirects)
  4. SMTP RCPT TO verification against the mail server
     - Connect to MX, EHLO, MAIL FROM, RCPT TO
     - Interpret response: 250 = mailbox exists, 550 = doesn't exist, etc.
  5. Grade each prospect: VERIFIED, RISKY, or FAILED

Output: JSON report with per-prospect results + summary stats.
"""

import json, socket, smtplib, subprocess, sys, time, ssl, re
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

USER_AGENT = "Mozilla/5.0 (compatible; AgentFit-Bot/1.0; +https://xablam.com)"
TIMEOUT = 10

def log(msg):
    print(msg, flush=True)

def dns_mx(domain):
    """Return list of MX records (host, pref) or empty list."""
    try:
        r = subprocess.run(["dig", "+short", "MX", domain], capture_output=True, text=True, timeout=5)
        results = []
        for line in r.stdout.strip().split("\n"):
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            if len(parts) >= 2:
                try:
                    pref = int(parts[0])
                    host = parts[1].rstrip(".")
                    results.append((pref, host))
                except ValueError:
                    pass
        results.sort(key=lambda x: x[0])
        return [(h, p) for p, h in results]
    except Exception:
        return []

def dns_a(domain):
    """Return A record IP or None."""
    try:
        r = subprocess.run(["dig", "+short", "A", domain], capture_output=True, text=True, timeout=5)
        ip = r.stdout.strip().split("\n")[0].strip()
        return ip if ip else None
    except Exception:
        return None

def check_website(url):
    """HTTP GET with redirect following. Returns (status_code, final_url) or (0, None)."""
    if not url:
        return (0, None)
    url = url.strip()
    if not url.startswith("http"):
        url = "https://" + url
    try:
        req = Request(url, headers={"User-Agent": USER_AGENT})
        resp = urlopen(req, timeout=TIMEOUT)
        return (resp.getcode(), resp.geturl())
    except HTTPError as e:
        # 403, 401 etc still mean the site exists
        return (e.code, url)
    except (URLError, socket.timeout, Exception):
        # Try http:// fallback
        if url.startswith("https://"):
            http_url = "http://" + url[8:]
            try:
                req = Request(http_url, headers={"User-Agent": USER_AGENT})
                resp = urlopen(req, timeout=TIMEOUT)
                return (resp.getcode(), resp.geturl())
            except Exception:
                return (0, None)
        return (0, None)

def smtp_verify(email, mx_host, from_addr="verify@xablam.com"):
    """
    Connect to MX host and do RCPT TO check.
    Returns dict: {connect_ok, rcpt_code, rcpt_msg, verdict}
    verdict: 'exists' (250), 'nonexistent' (550), 'unverifiable' (other/can't connect)
    """
    result = {"connect_ok": False, "rcpt_code": 0, "rcpt_msg": "", "verdict": "unverifiable"}
    
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        smtp = smtplib.SMTP(timeout=12)
        smtp.connect(mx_host, 25)
        result["connect_ok"] = True
        
        # Greet
        code, _ = smtp.docmd("EHLO", "xablam.com")
        
        # Try STARTTLS if offered
        if code == 250:
            try:
                smtp.starttls(context=ctx)
                smtp.docmd("EHLO", "xablam.com")
            except:
                pass  # Continue without TLS
        
        # MAIL FROM
        code, msg = smtp.docmd("MAIL", f"FROM:<{from_addr}>")
        if code not in (250,):
            result["rcpt_msg"] = f"MAIL FROM rejected: {code}"
            smtp.quit()
            return result
        
        # RCPT TO
        code, msg_bytes = smtp.docmd("RCPT", f"TO:<{email}>")
        result["rcpt_code"] = code
        result["rcpt_msg"] = msg_bytes.decode("utf-8", errors="replace")[:200]
        
        if code == 250:
            result["verdict"] = "exists"
        elif code in (550, 551, 552, 553):
            result["verdict"] = "nonexistent"
        else:
            result["verdict"] = "unverifiable"
        
        smtp.docmd("RSET")
        smtp.quit()
    except smtplib.SMTPServerDisconnected as e:
        result["rcpt_msg"] = f"disconnect: {str(e)[:100]}"
    except smtplib.SMTPResponseException as e:
        result["rcpt_code"] = e.smtp_code
        if e.smtp_error:
            raw = e.smtp_error.decode("utf-8", errors="replace") if isinstance(e.smtp_error, bytes) else str(e.smtp_error)
            result["rcpt_msg"] = raw[:200]
        else:
            result["rcpt_msg"] = str(e)[:200]
        if e.smtp_code == 250:
            result["verdict"] = "exists"
        elif e.smtp_code in (550, 551, 552, 553):
            result["verdict"] = "nonexistent"
        else:
            result["verdict"] = "unverifiable"
    except Exception as e:
        result["rcpt_msg"] = f"error: {str(e)[:100]}"
    
    return result

def verify_prospect(idx, prospect):
    """Full verification of one prospect."""
    email = prospect.get("email", "")
    website = prospect.get("website", prospect.get("domain", ""))
    
    domain = email.split("@")[1] if "@" in email else website.replace("https://", "").replace("http://", "").split("/")[0].replace("www.", "")
    
    result = {
        "index": idx,
        "company": prospect.get("company", ""),
        "email": email,
        "domain": domain,
        "website": website,
        "checks": {
            "email_syntax": False,
            "dns_resolves": False,
            "mx_records": [],
            "mx_count": 0,
            "http_status": 0,
            "website_live": False,
            "smtp_connect": False,
            "smtp_rcpt_code": 0,
            "smtp_verdict": "unverifiable",
            "smtp_msg": "",
        },
        "grade": "FAILED",
        "notes": [],
    }
    
    # 1. Email syntax
    result["checks"]["email_syntax"] = bool(re.match(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$", email))
    if not result["checks"]["email_syntax"]:
        result["notes"].append("Invalid email syntax")
    
    # 2. DNS A record
    ip = dns_a(domain)
    result["checks"]["dns_resolves"] = ip is not None
    if not ip:
        result["notes"].append("DNS does not resolve")
    
    # 3. MX records
    mx = dns_mx(domain)
    result["checks"]["mx_records"] = [h for h, p in mx]
    result["checks"]["mx_count"] = len(mx)
    if not mx:
        result["notes"].append("No MX records")
    
    # 4. Website HTTP check
    status, final_url = check_website(website)
    result["checks"]["http_status"] = status
    result["checks"]["website_live"] = status >= 200 and status < 500
    if not result["checks"]["website_live"]:
        result["notes"].append(f"Website HTTP {status}")
    
    # 5. SMTP RCPT TO check (only if MX exists)
    if mx:
        mx_host = mx[0][0]
        smtp_result = smtp_verify(email, mx_host)
        result["checks"]["smtp_connect"] = smtp_result["connect_ok"]
        result["checks"]["smtp_rcpt_code"] = smtp_result["rcpt_code"]
        result["checks"]["smtp_verdict"] = smtp_result["verdict"]
        result["checks"]["smtp_msg"] = smtp_result["rcpt_msg"]
        if smtp_result["verdict"] == "nonexistent":
            result["notes"].append(f"Mailbox rejected: {smtp_result['rcpt_code']}")
    
    # Grade
    checks = result["checks"]
    if checks["email_syntax"] and checks["dns_resolves"] and checks["mx_count"] > 0 and checks["website_live"]:
        if checks["smtp_verdict"] == "exists":
            result["grade"] = "VERIFIED"
        elif checks["smtp_verdict"] == "nonexistent":
            result["grade"] = "FAILED"
        else:
            # SMTP unverifiable (catch-all, greylisting, etc.) — RISKY
            result["grade"] = "RISKY"
    else:
        result["grade"] = "FAILED"
    
    return result

def main():
    input_file = sys.argv[1] if len(sys.argv) > 1 else "data/outbound-prospects-v2.json"
    output_file = sys.argv[2] if len(sys.argv) > 2 else "data/v2-deep-audit.json"
    
    log(f"Loading prospects from {input_file}...")
    raw = json.load(open(input_file))
    if isinstance(raw, dict):
        prospects = raw.get("prospects", raw.get("data", []))
    else:
        prospects = raw
    
    log(f"Verifying {len(prospects)} prospects with deep SMTP checks...")
    log("(This includes RCPT TO mailbox verification - may take a few minutes)\n")
    
    results = []
    # Run with limited concurrency to avoid rate limiting
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(verify_prospect, i+1, p): i for i, p in enumerate(prospects)}
        for future in as_completed(futures):
            r = future.result()
            grade_icon = {"VERIFIED": "✓", "RISKY": "~", "FAILED": "✗"}.get(r["grade"], "?")
            log(f"  [{r['index']:2d}] {grade_icon} {r['grade']:8s} {r['company'][:30]:30s} | HTTP:{r['checks']['http_status']} MX:{r['checks']['mx_count']} SMTP:{r['checks']['smtp_verdict']}")
            results.append(r)
    
    results.sort(key=lambda x: x["index"])
    
    # Summary
    grades = {}
    for r in results:
        grades[r["grade"]] = grades.get(r["grade"], 0) + 1
    
    smtp_verdicts = {}
    for r in results:
        v = r["checks"]["smtp_verdict"]
        smtp_verdicts[v] = smtp_verdicts.get(v, 0) + 1
    
    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_prospects": len(results),
        "grades": grades,
        "smtp_verdicts": smtp_verdicts,
        "website_live_count": sum(1 for r in results if r["checks"]["website_live"]),
        "mx_present_count": sum(1 for r in results if r["checks"]["mx_count"] > 0),
        "dns_resolves_count": sum(1 for r in results if r["checks"]["dns_resolves"]),
    }
    
    output = {
        "summary": summary,
        "results": results,
    }
    
    with open(output_file, "w") as f:
        json.dump(output, f, indent=2)
    
    log(f"\n{'='*60}")
    log(f"DEEP AUDIT COMPLETE")
    log(f"{'='*60}")
    log(f"Total prospects:   {summary['total_prospects']}")
    log(f"Website live:      {summary['website_live_count']}")
    log(f"MX records found:  {summary['mx_present_count']}")
    log(f"DNS resolves:      {summary['dns_resolves_count']}")
    log(f"\nGRADES:")
    for g, c in sorted(grades.items()):
        log(f"  {g:10s}: {c}")
    log(f"\nSMTP RCPT TO VERDICTS:")
    for v, c in sorted(smtp_verdicts.items()):
        log(f"  {v:15s}: {c}")
    log(f"\nResults saved to: {output_file}")

if __name__ == "__main__":
    main()
