# Objective: SEO & GEO uplift

Date: 2026-06-21
Status: Active — Sprint 1 in progress

## North Star

By end of 2026 Q3, every game page (6) and blog post (4), plus the home /
about / projects / blog index pages (4), serves search engines and LLM
crawlers a fully rendered HTML response with unique meta tags and
relevant structured data. `/llms.txt` and `/sitemap.xml` accurately
reflect the full site map.

## Success criteria

### A. Build-time deliverables (verifiable at deploy)

| #   | Requirement                                                                                                 | Verification                                                            |
| --- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| A1  | Every route produces an `index.html` in `dist/` with content already in `#root` (not just bootstrap shell). | `grep -L "<game-title>" dist/projects/<slug>/index.html` returns empty. |
| A2  | 14 routes exist: `/`, `/about`, `/projects`, `/projects/{6 slugs}`, `/blog`, `/blog/{1..4}`.                | `find dist -name index.html \| wc -l` ≥ 14.                             |
| A3  | Every page has a unique `<title>`.                                                                          | Audit script.                                                           |
| A4  | Every page has a unique `<meta name="description">` 120–160 chars.                                          | Audit script.                                                           |
| A5  | Every page has `<link rel="canonical">` pointing to its absolute URL.                                       | Audit script.                                                           |
| A6  | Every page has independent og:title / og:description / og:image / og:url.                                   | Audit script.                                                           |
| A7  | Home page contains `Organization` JSON-LD with `sameAs` listing all 6 Play Store URLs.                      | `jq` validation.                                                        |
| A8  | Each game page contains a `SoftwareApplication` JSON-LD.                                                    | `jq` validation.                                                        |
| A9  | Each blog page contains a `BlogPosting` JSON-LD.                                                            | `jq` validation.                                                        |
| A10 | Each game page contains ≥3 FAQ entries plus `FAQPage` JSON-LD.                                              | Audit script.                                                           |
| A11 | `dist/robots.txt` references `sitemap.xml` and allows `/`.                                                  | `cat dist/robots.txt`.                                                  |
| A12 | `dist/sitemap.xml` lists all 14 URLs with `<lastmod>`.                                                      | XML validation.                                                         |
| A13 | `dist/llms.txt` matches Anthropic spec and lists all 14 URLs.                                               | Manual review.                                                          |
| A14 | Every `<img>` in rendered HTML has `width`, `height`, `alt`.                                                | Lint rule + audit.                                                      |
| A15 | Schema.org Validator and Google Rich Results Test pass on every page type.                                  | Online tools.                                                           |

### B. Lighthouse (verifiable post-deploy)

| #   | Requirement                                             | Verification                    |
| --- | ------------------------------------------------------- | ------------------------------- |
| B1  | Home mobile Lighthouse: SEO ≥ 95, A11y ≥ 90, Perf ≥ 85. | `lighthouse … --preset=mobile`. |
| B2  | Any game detail page: SEO ≥ 95.                         | Same.                           |
| B3  | Any blog detail page: SEO ≥ 95.                         | Same.                           |
| B4  | All measured pages CLS < 0.1.                           | Lighthouse report.              |

### C. Indexing signals (T+14 days after deploy)

| #   | Requirement                                                   | Verification    |
| --- | ------------------------------------------------------------- | --------------- |
| C1  | Sitemap submitted to Google Search Console; status "Success". | GSC screenshot. |
| C2  | ≥10/14 URLs indexed in GSC Pages report.                      | GSC screenshot. |
| C3  | `site:cookabc.github.io` returns ≥10 results.                 | Manual check.   |
| C4  | Bing Webmaster Tools: ≥8/14 URLs indexed.                     | BWT screenshot. |

### D. GEO signals (T+30 days, qualitative)

| #   | Requirement                                                                                                           | Verification                |
| --- | --------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| D1  | At least one of ChatGPT / Perplexity / Claude cites a `cookabc.github.io` URL when asked about VeryFun Company games. | Manual prompt + screenshot. |
| D2  | Perplexity searches for each of the 6 game titles surface the site in the top-10 sources.                             | Manual.                     |
| D3  | `llms.txt` is fetched by at least one LLM crawler (per server access logs if available).                              | Optional.                   |

## Out of scope

- Custom domain / CNAME
- Dynamic og:image generation
- i18n / multi-language
- Paid acquisition
- Programmatic GSC integration
- Wholesale blog content rewrites

## Sprint plan

**Sprint 1 — Foundation** (this branch: `sprint-1-ssg-foundation`)

1. Integrate `vite-react-ssg` (or equivalent) static-site generation.
2. Switch `createHashRouter` → `createBrowserRouter`.
3. Introduce `react-helmet-async` and per-route head config.
4. Build-time generation of `robots.txt`, `sitemap.xml`, `llms.txt`.
   Covers: A1–A6, A11–A13.

**Sprint 2 — Structured data + content depth** 5. JSON-LD: Organization / SoftwareApplication / BlogPosting / FAQPage. 6. Extend `projects.ts` with `answer` and `faq` fields; render on detail pages.
Covers: A7–A10.

**Sprint 3 — Polish** 7. Image `width` / `height` / `loading` / `fetchpriority`. 8. Per-page og:image using each game's banner. 9. Internal linking: related games / related blog posts. 10. Lighthouse tuning to hit targets.
Covers: A14–A15, B1–B4.

**Sprint 4 — Post-deploy operations** (no code) 11. Submit sitemap to GSC + Bing. 12. Monitor at T+14 and T+30 days.
Covers: C1–C4, D1–D3.

## Completion

The objective is complete only when every row in A, B, C, D has evidence
attached. Partial completion is not completion.
