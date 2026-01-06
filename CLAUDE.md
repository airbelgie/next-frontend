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
```

Package manager: **pnpm** (required - uses pnpm-lock.yaml and pnpm-workspace.yaml)

## Code Quality

- **Linter/Formatter**: Biome (not ESLint/Prettier)
- **Git Hooks**: Lefthook runs `biome check --write` on pre-commit
- The `src/components/ui/` directory is excluded from Biome linting (shadcn/ui generated components)

## Testing Requirements

**ALWAYS add tests when creating or modifying components and pages.**

### Testing Philosophy
- **User-focused tests**: Test what users see and do, not implementation details
- **Interaction testing**: Verify clicks, navigation, form submissions work correctly
- **Accessibility testing**: Ensure landmarks, headings, and ARIA attributes are correct
- **Avoid snapshot tests**: Prefer explicit assertions over brittle snapshots

### Testing Stack
- **Vitest**: Test runner (configured in `vitest.config.ts`)
- **React Testing Library**: Component testing with user-centric queries
- **@testing-library/user-event**: Realistic user interaction simulation

### Test File Location
Place tests next to the code they test:
```
src/app/page.tsx       → src/app/page.test.tsx
src/components/Foo.tsx → src/components/Foo.test.tsx
```

### What to Test
1. **User can see**: Important content, headings, CTAs are visible
2. **User can interact**: Buttons are clickable, links navigate correctly
3. **User can navigate**: Keyboard navigation works, focus management is correct
4. **Accessibility**: Semantic HTML, ARIA labels, heading hierarchy

### Example Test Pattern
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

**API Integration**: Auth endpoints at `https://airbelgie.rbcdigital.co.uk/auth/` (login, signup)

**Build Output**: Configured for standalone deployment (Docker-ready)
