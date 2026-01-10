import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with correct content", async ({ page }) => {
    await page.goto("/");

    // Verify main heading is visible
    await expect(
      page.getByRole("heading", { name: /experience the skies/i }),
    ).toBeVisible();

    // Verify navigation links are present
    await expect(page.getByRole("link", { name: /log in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /join now/i })).toBeVisible();
  });

  test("can navigate to login page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /log in/i }).click();

    await expect(page).toHaveURL("/login");
    await expect(
      page.getByRole("heading", { name: /login to your account/i }),
    ).toBeVisible();
  });

  test("can navigate to signup page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /join now/i }).click();

    await expect(page).toHaveURL("/signup");
    await expect(
      page.getByRole("heading", { name: /create your account/i }),
    ).toBeVisible();
  });

  test("login page has link to signup", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("link", { name: /sign up/i }).click();

    await expect(page).toHaveURL("/signup");
  });

  test("signup page has link to login", async ({ page }) => {
    await page.goto("/signup");

    await page.getByRole("link", { name: /sign in/i }).click();

    await expect(page).toHaveURL("/login");
  });
});

test.describe("Navigation - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile menu works correctly", async ({ page }) => {
    await page.goto("/");

    // Page should still be functional on mobile
    await expect(
      page.getByRole("heading", { name: /experience the skies/i }),
    ).toBeVisible();
  });
});
