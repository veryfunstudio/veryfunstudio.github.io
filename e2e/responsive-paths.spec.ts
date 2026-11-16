import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`game screenshots and store links remain independent at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 768 ? 1000 : 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/games/nova-mahjong");
    const gallery = page.getByRole("region", { name: "Gameplay screenshot gallery" });
    await expect(gallery.locator("figure")).toHaveCount(4);
    await expect(
      page.getByRole("button", { name: "Previous gameplay screenshots" }),
    ).toBeDisabled();
    const next = page.getByRole("button", { name: "Next gameplay screenshots" });
    if (await next.isEnabled()) {
      await next.focus();
      await page.keyboard.press("Enter");
      await expect.poll(() => gallery.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
      await expect(
        page.getByRole("button", { name: "Previous gameplay screenshots" }),
      ).toBeEnabled();
      for (let step = 0; step < 8; step++) {
        const before = await gallery.evaluate((element) => ({
          left: element.scrollLeft,
          end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
        }));
        if (before.end) break;
        await next.click();
        await expect
          .poll(() => gallery.evaluate((element) => element.scrollLeft))
          .toBeGreaterThan(before.left);
      }
      await expect(next).toBeDisabled();
      await page.screenshot({ path: test.info().outputPath(`gallery-end-${width}.png`) });
    }

    for (const card of await page.locator(".related-card:has(.related-card__main)").all()) {
      const title = await card.locator("strong").boundingBox();
      const store = await card.locator(".related-card__play").boundingBox();
      expect(title && store).toBeTruthy();
      if (title && store) {
        expect(title.x + title.width <= store.x || title.y + title.height <= store.y).toBe(true);
      }
    }
    const question = page.locator("details summary").first();
    await question.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");

    await page.goto("/about");
    for (const card of await page.locator(".studio-shelf__row").all()) {
      const title = await card.locator("strong").boundingBox();
      const store = await card.locator(".studio-shelf__play").boundingBox();
      expect(title && store).toBeTruthy();
      if (title && store) {
        expect(title.x + title.width <= store.x || title.y + title.height <= store.y).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}
