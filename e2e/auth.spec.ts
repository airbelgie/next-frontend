import { expect, test } from "@playwright/test";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("displays login form with required fields", async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("shows validation errors for empty submission", async ({ page }) => {
    await page.getByRole("button", { name: /login/i }).click();

    // Form should show validation - HTML5 validation
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    // Check if the input is marked as invalid (HTML5 validation)
    const isInvalid = await emailInput.evaluate(
      (el) => !(el as HTMLInputElement).validity.valid,
    );
    expect(isInvalid).toBe(true);
  });

  test("allows entering email and password", async ({ page }) => {
    const testEmail = "test@example.com";
    const testPassword = "testpassword123";

    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(testPassword);

    await expect(page.getByLabel(/email/i)).toHaveValue(testEmail);
    await expect(page.getByLabel(/password/i)).toHaveValue(testPassword);
  });
});

test.describe("Signup Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("displays signup form with required fields", async ({ page }) => {
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/^email$/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /create account/i }),
    ).toBeVisible();
  });

  test("shows validation errors for empty submission", async ({ page }) => {
    await page.getByRole("button", { name: /create account/i }).click();

    const firstNameInput = page.getByLabel(/first name/i);
    await expect(firstNameInput).toBeVisible();

    const isInvalid = await firstNameInput.evaluate(
      (el) => !(el as HTMLInputElement).validity.valid,
    );
    expect(isInvalid).toBe(true);
  });

  test("allows entering signup details", async ({ page }) => {
    const testFirstName = "John";
    const testLastName = "Doe";
    const testEmail = "newuser@example.com";
    const testPassword = "securepassword123";

    await page.getByLabel(/first name/i).fill(testFirstName);
    await page.getByLabel(/last name/i).fill(testLastName);
    await page.getByLabel(/^email$/i).fill(testEmail);
    await page.getByLabel(/^password$/i).fill(testPassword);
    await page.getByLabel(/confirm password/i).fill(testPassword);

    await expect(page.getByLabel(/first name/i)).toHaveValue(testFirstName);
    await expect(page.getByLabel(/last name/i)).toHaveValue(testLastName);
    await expect(page.getByLabel(/^email$/i)).toHaveValue(testEmail);
    await expect(page.getByLabel(/^password$/i)).toHaveValue(testPassword);
  });
});

test.describe("Auth - Accessibility", () => {
  test("login page has proper heading structure", async ({ page }) => {
    await page.goto("/login");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/login to your account/i);
  });

  test("signup page has proper heading structure", async ({ page }) => {
    await page.goto("/signup");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/create your account/i);
  });

  test("form inputs have associated labels", async ({ page }) => {
    await page.goto("/login");

    // Verify inputs are properly labelled (getByLabel works)
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });
});
