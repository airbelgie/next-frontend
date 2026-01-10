# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build (standalone output)
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once
pnpm test:coverage # Run tests with coverage report
pnpm test:e2e     # Run Playwright E2E tests
pnpm test:e2e:ui  # Run Playwright with interactive UI
```

Package manager: **pnpm** (required - uses pnpm-lock.yaml and pnpm-workspace.yaml)

## Mandatory Verification After Code Changes

**CRITICAL: After ANY code modification, Claude MUST run these verification steps in order:**

1. **Lint check**: `pnpm lint` - Fix any linting errors before proceeding
2. **Unit tests**: `pnpm test:run` - Ensure all unit tests pass
3. **Type check**: `pnpm build` - Verify TypeScript compilation succeeds
4. **E2E tests** (if UI changes): `pnpm test:e2e` - Run Playwright tests for UI changes

**Do NOT mark a task as complete until all verification steps pass.**

If any step fails:
- Fix the issue immediately
- Re-run the failed verification step
- Continue through remaining steps

## Code Quality

- **Linter/Formatter**: Biome (not ESLint/Prettier)
- **Git Hooks**: Lefthook runs `biome check --write` on pre-commit
- The `src/components/ui/` directory is excluded from Biome linting (shadcn/ui generated components)
- **Always run `pnpm lint` after making changes** - do not wait for git hooks

## Testing Requirements

**ALWAYS add tests when creating or modifying components and pages.**

### Testing Philosophy
- **User-focused tests**: Test what users see and do, not implementation details
- **Interaction testing**: Verify clicks, navigation, form submissions work correctly
- **Accessibility testing**: Ensure landmarks, headings, and ARIA attributes are correct
- **Avoid snapshot tests**: Prefer explicit assertions over brittle snapshots
- **Two-tier testing**: Unit tests (Vitest) for components, E2E tests (Playwright) for user flows

### Testing Stack
- **Vitest**: Unit test runner for component tests (configured in `vitest.config.ts`)
- **React Testing Library**: Component testing with user-centric queries
- **@testing-library/user-event**: Realistic user interaction simulation
- **Playwright**: E2E browser testing for full user journey validation

### Test File Location
```
# Unit tests (Vitest + RTL) - next to source files
src/app/page.tsx           → src/app/page.test.tsx
src/components/Foo.tsx     → src/components/Foo.test.tsx

# E2E tests (Playwright) - in e2e directory
e2e/
├── auth.spec.ts           # Login/signup flows
├── navigation.spec.ts     # Site navigation
└── booking.spec.ts        # Core user journeys
```

### What to Test

**Unit Tests (Vitest):**
1. **User can see**: Important content, headings, CTAs are visible
2. **User can interact**: Buttons are clickable, links navigate correctly
3. **User can navigate**: Keyboard navigation works, focus management is correct
4. **Accessibility**: Semantic HTML, ARIA labels, heading hierarchy

**E2E Tests (Playwright):**
1. **Critical user flows**: Login, signup, booking, payment
2. **Cross-page navigation**: Multi-step workflows complete successfully
3. **Form submissions**: Data persists and flows correctly between pages
4. **Error states**: Graceful handling of network failures, invalid inputs
5. **Responsive behavior**: Key flows work on mobile and desktop viewports

### Unit Test Example (Vitest + RTL)
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("allows user to submit the form", async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  await user.type(screen.getByLabelText(/email/i), "test@example.com");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

### E2E Test Example (Playwright)
```ts
import { test, expect } from "@playwright/test";

test("user can complete login flow", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/email/i).fill("test@example.com");
  await page.getByLabel(/password/i).fill("securepassword");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
});
```

### Playwright Setup (if not installed)
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

Create `playwright.config.ts`:
```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

Add to `package.json` scripts:
```json
{
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (React 19, TypeScript)
- **Tailwind CSS v4** (uses `@import "tailwindcss"` in globals.css, no tailwind.config.js)
- **shadcn/ui** (new-york style, stone base color, RSC enabled)
- **Theming**: next-themes with dark mode support via CSS variables in oklch() color space

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Home page (landing page)
│   ├── page.test.tsx       # Landing page tests
│   ├── login/page.tsx      # Login page (client component)
│   └── signup/page.tsx     # Signup page (client component)
├── components/
│   ├── ui/                 # shadcn/ui primitives (don't modify directly)
│   ├── DarkModeToggle/     # Theme switcher component
│   ├── LoginForm/          # Login form component
│   ├── SignupForm/         # Signup form component
│   └── theme-provider.tsx  # next-themes wrapper (client component)
├── test/
│   └── setup.ts            # Vitest setup with mocks for next/navigation, next-themes
└── lib/
    └── utils.ts            # cn() helper using clsx + tailwind-merge
```

### Key Patterns

**Path Aliases**: Use `@/*` for imports from `src/` (e.g., `@/components/ui/button`)

**Component Conventions**:
- UI primitives use `data-slot` attributes for styling hooks
- Form components use the Field system (`FieldGroup`, `Field`, `FieldLabel`, `FieldError`)
- Variants handled via class-variance-authority (cva)

**API Integration**: Auth endpoints configured via `NEXT_PUBLIC_API_URL` environment variable (defaults to `https://airbelgie.rbcdigital.co.uk`)

**Build Output**: Configured for standalone deployment (Docker-ready)

## Error Handling Conventions

- **API errors**: Always handle network failures gracefully with user-friendly messages
- **Form validation**: Use inline error messages with `FieldError` component
- **Loading states**: Show loading indicators during async operations
- **Never swallow errors**: Log errors to console in development, consider error tracking in production

## Environment Variables

**For environment setup and deployment instructions, see README.md.**

Required variables:
- `NEXT_PUBLIC_API_URL` - API base URL (no fallback in code)

The `.env.local` file is included in the repository with default values. See README.md for Vercel and other deployment platform configuration.

## Git Workflow

### Commit Messages
Follow conventional commits format:
```
feat: add booking confirmation page
fix: resolve login form validation error
chore: update dependencies
docs: improve API integration docs
test: add E2E tests for signup flow
```

### Branch Naming
```
feature/booking-flow
fix/login-validation
chore/dependency-updates
```

### Before Committing Checklist
Claude should verify these before any commit:
1. ✅ `pnpm lint` passes
2. ✅ `pnpm test:run` passes
3. ✅ `pnpm build` succeeds
4. ✅ E2E tests pass (if UI changes): `pnpm test:e2e`
5. ✅ No console errors in browser
6. ✅ Changes work in both light and dark mode

## When to Write Which Test Type

| Scenario | Unit Test (Vitest) | E2E Test (Playwright) |
|----------|-------------------|----------------------|
| Component renders correctly | ✅ | |
| Button click handlers | ✅ | |
| Form validation messages | ✅ | |
| Multi-page user journey | | ✅ |
| Login/signup flow | | ✅ |
| API integration | | ✅ |
| Navigation between pages | | ✅ |
| Responsive layout | | ✅ |
| Accessibility (basic) | ✅ | |
| Accessibility (navigation) | | ✅ |

## TypeScript Conventions

- **Strict mode enabled**: No `any` types without justification
- **Prefer interfaces** for object shapes, types for unions
- **Use `satisfies`** for type-safe object literals
- **Component props**: Define explicit prop interfaces

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", children, onClick }: ButtonProps) {
  // ...
}
```
