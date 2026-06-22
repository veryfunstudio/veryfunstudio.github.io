# Sprint 4 — Post-deploy monitoring checklist

This sprint requires no code changes. It is a manual operations runbook
for verifying that the SEO/GEO work shipped in Sprints 1–3 actually
takes effect with Google, Bing, and LLM crawlers.

Deployed at: **https://cookabc.github.io/**
Sitemap: **https://cookabc.github.io/sitemap.xml**
llms.txt: **https://cookabc.github.io/llms.txt**

## Step 1 — Submit to Google Search Console (do now, T+0)

1. Go to https://search.google.com/search-console
2. Add property `https://cookabc.github.io` (URL prefix)
3. Verify ownership. Two options that work for GitHub Pages:
   - **HTML tag**: GSC gives a `<meta name="google-site-verification"
content="...">` token. Add it to `src/App.tsx` inside the
     `<Helmet>` block, rebuild, redeploy. GSC verifies on next fetch.
   - **DNS TXT record**: if you own a custom domain later. Faster for
     ongoing, slower to set up. Out of scope for `.github.io`.
4. Once verified, open **Sitemaps** → submit
   `https://cookabc.github.io/sitemap.xml`
5. Watch status flip to **Success** within 24–48h.

**C1 acceptance**: Sitemap status = Success (screenshot).

## Step 2 — Submit to Bing Webmaster Tools (do now, T+0)

1. Go to https://www.bing.com/webmasters
2. Sign in with any Microsoft account
3. Add site `https://cookabc.github.io`
4. Bing can import directly from GSC — choose that option if offered,
   skips re-verification
5. Submit sitemap: `https://cookabc.github.io/sitemap.xml`
6. Use **URL Inspection** to submit the homepage and 1-2 game pages
   individually for faster initial crawl

**C4 acceptance**: ≥8/14 URLs indexed (screenshot at T+14).

## Step 3 — T+14 days: verify indexing (C2, C3)

Run from any terminal:

```bash
# Should return >=10 results
curl "https://www.google.com/search?q=site:cookabc.github.io" -A "Mozilla/5.0" | grep -oE 'cookabc.github.io/[a-z/-]+' | sort -u | wc -l

# Manual cross-check
open "https://www.google.com/search?q=site:cookabc.github.io"
```

**C2**: GSC → Pages → ≥10/14 status Indexed.
**C3**: Google search `site:cookabc.github.io` returns ≥10 results.

## Step 4 — T+30 days: verify GEO signals (D1, D2, D3)

**D1 — LLM citation**: In a fresh session (no prior context), ask each
of these:

- ChatGPT: "What games does VeryFun Company make?"
- Perplexity: "VeryFun Company mobile games list"
- Claude: "Tell me about VeryFun Company's puzzle games"

Pass if **at least one** cites a `cookabc.github.io` URL.

**D2 — Perplexity source surfacing**: Search Perplexity for each game
title individually:

- "Classic Sudoku 2026"
- "Tile Journey mobile game"
- "Word Search Block"
- "Arrow Out puzzle game"
- "Pearl Coloring"
- "Bubble Shoot VeryFun"

Pass if the site appears in top-10 sources for any game.

**D3 — llms.txt fetched**: Check access logs if available, or just
verify the file is reachable:

```bash
curl -I https://cookabc.github.io/llms.txt
# Expect: HTTP/2 200, content-type text/plain
```

## Step 5 — Record results

Fill in this table when each milestone is reached:

| Criterion             | Target          | Result | Date |
| --------------------- | --------------- | ------ | ---- |
| C1 sitemap submitted  | Success         |        |      |
| C2 GSC indexed        | ≥10/14          |        |      |
| C3 site: query        | ≥10             |        |      |
| C4 Bing indexed       | ≥8/14           |        |      |
| D1 LLM citation       | ≥1 engine       |        |      |
| D2 Perplexity source  | any game top-10 |        |      |
| D3 llms.txt reachable | 200 OK          |        |      |

When every row has evidence, the SEO/GEO objective (per
docs/superpowers/specs/2026-06-21-seo-geo-objective.md) is complete.

## What to do if indexing is slow

- Use GSC **URL Inspection → Request Indexing** on the 14 URLs manually
- Check GSC **Coverage** report for any "Excluded" URLs and fix issues
- Confirm `robots.txt` is not blocking (it shouldn't be — it allows all)
- Confirm canonical tags all point to absolute `https://cookabc.github.io`
  URLs (verified by `scripts/audit-seo.ts` A5)
- Be patient: a brand-new `.github.io` subdomain can take 2-4 weeks to
  earn Google's initial trust signal
