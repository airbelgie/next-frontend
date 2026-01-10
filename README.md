# Air Belgie Frontend

A Next.js 16 application for Air Belgie built with TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Next.js 16** with App Router (React 19, TypeScript)
- **Tailwind CSS v4** - Modern CSS framework
- **shadcn/ui** - Accessible component library
- **Theming** - next-themes with dark mode support
- **Testing** - Vitest + React Testing Library + Playwright
- **Linting** - Biome

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (required - this project uses pnpm workspaces)

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variables

A `.env.local` file is included in the repository with default settings. This file configures the API endpoint for authentication and other backend services.

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://airbelgie.rbcdigital.co.uk
```

**To use a different API endpoint:**
1. Open `.env.local`
2. Update `NEXT_PUBLIC_API_URL` to your desired API server
3. Restart the development server

**Important:** `NEXT_PUBLIC_API_URL` is required and has no fallback in the code.

### Development

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once
pnpm test:coverage # Run tests with coverage
pnpm test:e2e     # Run Playwright E2E tests
```

## Deployment

### Vercel Deployment

To deploy this application to Vercel and ensure API calls work correctly:

**1. Configure Environment Variables in Vercel:**

Go to your Vercel project settings → Environment Variables and add:

```
Key: NEXT_PUBLIC_API_URL
Value: https://airbelgie.rbcdigital.co.uk
```

**2. Environment Scopes:**
- Select **Production**, **Preview**, and **Development** environments
- This ensures the variable is available in all deployment contexts

**3. Redeploy After Adding Variables:**
- Environment variables are only available after redeployment
- Go to Deployments → Click "..." on latest deployment → Redeploy
- Or push a new commit to trigger automatic redeployment

**4. Verify Configuration:**

After deployment, check the build logs to confirm environment variables are loaded:
```
- Environments: .env.production
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are embedded at build time (not runtime)
- Changing environment variables requires a new build/deployment
- Variables are NOT secret - they're exposed in the browser bundle
- For truly secret values (API keys, tokens), use server-only variables (no `NEXT_PUBLIC_` prefix)

### Other Deployment Platforms

**Docker:**
```dockerfile
# In your Dockerfile
ENV NEXT_PUBLIC_API_URL=https://airbelgie.rbcdigital.co.uk
```

**Other Platforms (Netlify, Railway, etc.):**

Set the environment variable in your platform's settings:
```
NEXT_PUBLIC_API_URL=https://airbelgie.rbcdigital.co.uk
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Home page (landing page)
│   ├── login/page.tsx      # Login page
│   └── signup/page.tsx     # Signup page
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── DarkModeToggle/     # Theme switcher component
│   ├── LoginForm/          # Login form component
│   └── SignupForm/         # Signup form component
└── lib/
    └── utils.ts            # Utility functions
```

## Testing

This project uses a two-tier testing approach:

- **Unit Tests (Vitest):** Component-level tests with React Testing Library
- **E2E Tests (Playwright):** Full user journey validation

Run tests:
```bash
pnpm test           # Unit tests in watch mode
pnpm test:run       # Run all unit tests once
pnpm test:e2e       # Run E2E tests
pnpm test:e2e:ui    # Run E2E tests with UI
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Styling framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Playwright](https://playwright.dev/) - E2E testing framework
