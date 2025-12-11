# startups.org.ai

A monorepo containing AI-powered tools and frameworks for building startups.

## Structure

```
startups.org.ai/
├── apps/
│   ├── startup.games/      # Gamification platform (Next.js)
│   └── startups.org.ai/    # Main platform & docs (Next.js + Fumadocs)
├── docs/                   # MDX documentation content
└── packages/
    ├── startups.org.ai/    # Core type system
    ├── primitives.org.ai/  # AI primitives
    ├── mdx.org.ai/         # MDX tools
    ├── business.org.ai/    # Business modeling
    ├── startup-builder/    # Startup building workflows
    ├── sales-builder/      # Sales pipeline builder
    ├── service-builder/    # Service business builder
    ├── builder.domains/    # Domain management
    ├── startup.games/      # Gamification library
    ├── design-sprint/      # Design Sprint framework
    ├── lean-canvas/        # Lean Canvas implementation
    ├── storybrand/         # StoryBrand framework
    ├── jobs-to-be-done/    # JTBD framework
    └── ...                 # Additional packages
```

## Getting Started

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/dot-org-ai/startups.org.ai.git

# Install dependencies
pnpm install

# Start development
pnpm dev

# Start specific app
pnpm dev:web     # startups.org.ai (port 3000)
pnpm dev:games   # startup.games (port 3002)

# Build all packages
pnpm build:packages
```

## Apps

- **startups.org.ai** (port 3000) - Main platform & documentation (Fumadocs)
- **startup.games** (port 3002) - Gamification platform for founders

## Packages

### Core
- `startups.org.ai` - Type system and workflows for startup generation
- `primitives.org.ai` - Core AI primitives (functions, providers, database)
- `mdx.org.ai` - MDX-based content management
- `business.org.ai` - Business modeling tools

### Builders
- `startup-builder` - AI-powered startup building workflows
- `sales-builder` - Sales pipeline and process builder
- `service-builder` - Service business builder
- `builder.domains` - Multi-tenant domain management

### Frameworks
- `design-sprint` - Jake Knapp's Design Sprint methodology
- `lean-canvas` - Lean Canvas business model
- `storybrand` - StoryBrand marketing framework
- `jobs-to-be-done` - JTBD customer research framework
- `ideal-customer-profile` - ICP definition tools
- `foundation-sprint` - Early-stage validation methodology
- `experimentation-machine` - Systematic experimentation

### Additional
- `landing-page` - Landing page generation
- `startup-names` - Startup name generation
- `product-names` - Product naming tools
- `startup-school` - Educational content
- `startup.games` - Gamification library

## Development

This is a pnpm workspace monorepo. Run commands from the root:

```bash
# Run all tests
pnpm test

# Run all type checks
pnpm typecheck

# Run all linters
pnpm lint

# Build everything
pnpm build
```

## License

MIT
