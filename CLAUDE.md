# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A pnpm workspace monorepo containing AI-powered tools and frameworks for building startups. Uses git submodules for major packages.

## Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev              # Run all packages/apps in parallel
pnpm dev:web          # Run startups.org.ai app (port 3000)
pnpm dev:games        # Run startup.games app (port 3002)

# Build
pnpm build            # Build everything
pnpm build:packages   # Build only packages
pnpm build:apps       # Build only apps

# Quality
pnpm test             # Run all tests (vitest)
pnpm lint             # Run all linters (eslint)
pnpm typecheck        # Run TypeScript type checking
```

Package-level commands use tsup for building, vitest for testing.

## Architecture

### Monorepo Structure
- `apps/` - Next.js applications
  - `startups.org.ai/` - Main platform with Fumadocs documentation
  - `startup.games/` - Gamification platform
- `packages/` - Shared libraries and frameworks
- `primitives/` - Git submodule with core AI primitives
- `docs/` - MDX documentation content

### Package Categories

**Core Type System**
- `startups.org.ai` - Type system and workflows for startup generation (exports `.` and `./ai`)
- `primitives.org.ai` - AI primitives (functions, providers, database) - submodule monorepo
- `mdx.org.ai` - MDX-based content management - submodule
- `business.org.ai` - Business modeling tools - submodule

**Builders** (git submodules)
- `startup-builder`, `sales-builder`, `service-builder`, `builder.domains`

**Startup Frameworks** (non-submodule packages)
- `lean-canvas`, `design-sprint`, `storybrand`, `jobs-to-be-done`
- `ideal-customer-profile`, `foundation-sprint`, `experimentation-machine`
- `landing-page`, `startup-names`, `product-names`, `startup-school`

### Key Dependencies
- Most packages depend on `ai-functions` (workspace package from primitives.org.ai)
- Uses Zod for schema validation
- Apps use Next.js 14 with React 18
- Documentation uses Fumadocs

### Workspace References
Packages use `workspace:*` for internal dependencies. The pnpm-workspace.yaml explicitly lists packages rather than using glob patterns for submodules.

## Tech Stack
- **Runtime**: Node.js >= 18
- **Package Manager**: pnpm 9.14.4
- **Build**: tsup (ESM output with TypeScript declarations)
- **Testing**: vitest
- **Linting**: eslint
- **TypeScript**: ES2020 target, ESNext modules, bundler resolution
- **Apps**: Next.js 14, React 18, Tailwind CSS

## Git Submodules

Clone with `--recurse-submodules`. Submodule packages are in `packages/` directory and linked via `.gitmodules`. The `primitives/` directory is also a submodule containing additional packages.
