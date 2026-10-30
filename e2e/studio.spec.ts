import { expect, test } from "@playwright/test";

test("featured games, magnifier and content navigation stay usable", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const choices = page.locator(".studio-hero__selectors button");
  await choices.nth(1).click();
  await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".studio-hero__stage")).toContainText(
    await choices
      .nth(1)
      .textContent()
      .then((text) => (text ?? "").replace(/^02\s*/, "")),
  );
  const loupe = page.locator(".studio-loupe").first();
  await loupe.focus();
  await expect(loupe).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Enter");
  await expect(loupe).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Space");
  await expect(loupe).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(loupe).toHaveAttribute("aria-pressed", "false");
  await page.goto("/games/nova-mahjong");
  await expect(page.locator("h1")).toContainText("Nova");
  const faq = page.locator(".game-detail-faq summary").first();
  await faq.click();
  await expect(faq.locator("..")).toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
  expect(errors).toEqual([]);
});

test("mobile menu contains keyboard focus, closes with Escape and resets on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open menu", exact: true });
  await opener.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link").first()).toBeFocused();
  expect(await page.locator("#main-content").evaluate((node) => node.inert)).toBe(true);
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("header")))).toBe(
      true,
    );
  }
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(nav).toHaveCount(0);
  await opener.click();
  await page.setViewportSize({ width: 1000, height: 900 });
  await expect(nav).toHaveCount(0);
  expect(await page.locator("#main-content").evaluate((node) => node.inert)).toBe(false);
  expect(await page.locator("body").evaluate((node) => node.style.overflow)).not.toBe("hidden");
});

test("all canonical sections and real 404s render without client JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const route of [
    "/",
    "/games",
    "/about",
    "/blog",
    "/contact",
    "/legal",
    "/games/nova-mahjong",
    "/blog/why-nova-mahjong-uses-large-clear-tiles",
  ]) {
    const response = await page.goto("http://127.0.0.1:4321" + route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.locator("#studio-collection-title")).toBeVisible();
  expect(
    await page
      .locator(".studio-section-heading")
      .first()
      .evaluate((node) => getComputedStyle(node).opacity),
  ).toBe("1");
  const missing = await page.goto("http://127.0.0.1:4321/not-a-page");
  expect(missing?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await context.close();
});

test("self-hosted fonts and recovery pages do not rely on Google Fonts", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.route(/fonts\.(?:googleapis|gstatic)\.com/, (route) => route.abort());
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(requests.some((url) => /fonts\.(?:googleapis|gstatic)\.com/.test(url))).toBe(false);
  expect(
    await page.evaluate(
      () => document.fonts.check('16px "Space Grotesk"') && document.fonts.check('16px "DM Sans"'),
    ),
  ).toBe(true);
  const missing = await page.goto("/games/not-a-game");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Game not found", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to games", exact: true }).click();
  await expect(page).toHaveURL(/\/games$/);
});
