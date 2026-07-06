#!/usr/bin/env python3
"""
Scrape real published email addresses from prospect websites.
Instead of guessing hello@domain.com, we crawl the actual website
(home page, /contact, /about, /team) and extract mailto: links and
text emails that the business has publicly published.

A published email is inherently deliverable — the company put it there
knowing people would use it.

Usage: python3 scripts/scrape-contact-emails.py [input.json] [output.json]
"""

import json, sys, re, time
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

UA = "Mozilla/5.0 (compatible; AgentFit-Bot/1.0; +https://xablam.com)"
TIMEOUT = 12

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')
MAILTO_RE = re.compile(r'mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})', re.IGNORECASE)

# Pages most likely to have contact info
CONTACT_PAGES = ['', '/contact', '/contact-us', '/about', '/about-us', '/team', '/reach', '/get-in-touch']

SKIP_EMAILS = {'sentry', 'noreply', 'no-reply', 'donotreply', 'newsletter', 'webmaster', 'admin@', 
               'example@', '.png', '.jpg', '.gif', '.webp', '.svg', 'sentry.io', 'wixpress.com'}

def fetch_page(url):
    """Fetch page HTML. Returns (status, html) or (0, '')."""
    try:
        req = Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
        resp = urlopen(req, timeout=TIMEOUT)
        return resp.getcode(), resp.read().decode('utf-8', errors='replace')
    except HTTPError as e:
        if e.code in (403, 401, 429):
            return e.code, ''
        try:
            return e.code, e.read().decode('utf-8', errors='replace')
        except:
            return e.code, ''
    except (URLError, Exception):
        return 0, ''

def normalize_url(base, path=''):
    if not base:
        return ''
    base = base.strip().rstrip('/')
    if not base.startswith('http'):
        base = 'https://' + base
    return base + path

def extract_emails(html):
    """Extract clean email addresses from HTML, prioritizing mailto: links."""
    # Priority: mailto: links are intentional contact emails
    mailto_emails = set()
    for m in MAILTO_RE.finditer(html):
        email = m.group(1).lower()
        if not any(s in email for s in SKIP_EMAILS):
            mailto_emails.add(email)
    
    # Also extract from text, but only if we have few mailto results
    text_emails = set()
    for m in EMAIL_RE.finditer(html):
        email = m.group(0).lower().rstrip('.')
        if not any(s in email for s in SKIP_EMAILS):
            text_emails.add(email)
    
    return mailto_emails, text_emails

def scrape_prospect(idx, prospect):
    website = prospect.get('website', prospect.get('domain', ''))
    base_domain = website.replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '')
    old_email = prospect.get('email', '')
    
    result = {
        'index': idx,
        'company': prospect.get('company', ''),
        'website': website,
        'domain': base_domain,
        'old_email': old_email,
        'found_emails_mailto': [],
        'found_emails_text': [],
        'best_email': '',
        'pages_checked': 0,
        'pages_ok': 0,
        'email_source': '',
    }
    
    all_mailto = set()
    all_text = set()
    
    for path in CONTACT_PAGES:
        url = normalize_url(website, path)
        if not url:
            continue
        result['pages_checked'] += 1
        status, html = fetch_page(url)
        if status >= 200 and status < 400 and html:
            result['pages_ok'] += 1
            mailto, text = extract_emails(html)
            all_mailto.update(mailto)
            all_text.update(text)
        
        # Be polite
        time.sleep(0.3)
    
    # Prioritize: mailto emails first, then text emails
    # Among those, prefer ones at the same domain (not third-party)
    domain_emails = set()
    for e in all_mailto | all_text:
        if base_domain in e or base_domain.replace('www.', '') in e:
            domain_emails.add(e)
    
    # Prefer mailto emails on the company domain
    domain_mailto = domain_emails & all_mailto
    if domain_mailto:
        result['best_email'] = sorted(domain_mailto)[0]
        result['email_source'] = 'mailto:link'
        result['found_emails_mailto'] = sorted(all_mailto)
    elif all_mailto:
        # Use any mailto email
        domain_match = [e for e in all_mailto if base_domain.split('.')[0] in e]
        result['best_email'] = sorted(domain_match or all_mailto)[0]
        result['email_source'] = 'mailto:link'
        result['found_emails_mailto'] = sorted(all_mailto)
    elif domain_emails:
        # Text emails on company domain
        result['best_email'] = sorted(domain_emails)[0]
        result['email_source'] = 'text'
        result['found_emails_text'] = sorted(all_text)
    elif all_text:
        # Any text email
        result['best_email'] = sorted(all_text)[0]
        result['email_source'] = 'text'
        result['found_emails_text'] = sorted(all_text)
    
    # If old email was hello@ and we found a different one, note the change
    if result['best_email'] and result['best_email'] != old_email.lower():
        result['email_changed'] = True
    else:
        result['email_changed'] = False
    
    return result

def main():
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'data/outbound-prospects-v2.json'
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'data/v2-email-scrape.json'
    
    raw = json.load(open(input_file))
    prospects = raw.get('prospects', raw) if isinstance(raw, dict) else raw
    
    print(f"Scraping published emails from {len(prospects)} prospect websites...\n")
    
    results = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(scrape_prospect, i+1, p): i for i, p in enumerate(prospects)}
        for future in as_completed(futures):
            r = future.result()
            icon = '✓' if r['best_email'] else '✗'
            changed = ' [CHANGED]' if r.get('email_changed') else ''
            print(f"  [{r['index']:2d}] {icon} {r['company'][:28]:28s} | old:{r['old_email'][:25]:25s} -> new:{r['best_email'][:30]}{changed}")
            results.append(r)
    
    results.sort(key=lambda x: x['index'])
    
    # Summary
    found = sum(1 for r in results if r['best_email'])
    changed = sum(1 for r in results if r.get('email_changed'))
    print(f"\n{'='*60}")
    print(f"EMAIL SCRAPE COMPLETE")
    print(f"{'='*60}")
    print(f"Emails found:      {found}/{len(results)}")
    print(f"Emails changed:    {changed}")
    print(f"Pages checked avg: {sum(r['pages_checked'] for r in results)/len(results):.1f}")
    print(f"Pages OK avg:      {sum(r['pages_ok'] for r in results)/len(results):.1f}")
    
    output = {
        'generated_at': datetime.now(timezone.utc).isoformat(),
        'total': len(results),
        'emails_found': found,
        'emails_changed': changed,
        'results': results,
    }
    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"\nResults saved to: {output_file}")

if __name__ == '__main__':
    main()
