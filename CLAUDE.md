# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack monorepo boilerplate with:
- **Frontend**: Next.js 15.5.4 (React 19.1.0, Tailwind CSS 4, TypeScript 5)
- **Backend**: NestJS 11 (TypeScript 5.7)
- **Database**: PostgreSQL 17 with Drizzle ORM 0.44.6
- **Container Orchestration**: Docker Compose
- **Package Manager**: pnpm

## Development Environment

### Starting the Full Stack

```bash
# Start all services (frontend, backend, database)
pnpm run dev:up

# Stop all services
pnpm run dev:down
```

The Docker Compose setup:
- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:3001` with base path `/api/v1`
- PostgreSQL runs on `localhost:5432`

### Development

The local development environment is based on Docker Compose.

`pnpm run dev:up` starts all services (frontend, backend, database).
`pnpm run dev:down` stops all services.

## Frontend Development
```bash
cd frontend

# Install dependencies
pnpm install

# Run linter
pnpm run lint
```

### Backend Development

```bash
cd backend

# Install dependencies
pnpm install

# Lint and auto-fix
pnpm run lint

# Format code
pnpm run format

# Database operations
pnpm run db:generate  # Generate migrations from schema
pnpm run db:migrate   # Run migrations
pnpm run db:seed      # Seed database with initial data
```

### Testing

```bash
cd backend

# Unit tests
pnpm test

# Watch mode
pnpm run test:watch

# E2E tests
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

## Architecture

### Backend Architecture

- **Framework**: NestJS with modular architecture
- **Entry Point**: `backend/src/main.ts` - configures global API prefix `/api/v1` and port from environment
- **Root Module**: `backend/src/app.module.ts` - imports `ConfigModule` globally for environment variable management
- **Configuration**: Uses `@nestjs/config` for environment management (loaded from `.env` files)
- **Database Module**: `backend/src/db/db.module.ts` - provides Drizzle ORM connection with PostgreSQL
- **Database Schema**: `backend/src/db/schema.ts` - defines database tables using Drizzle ORM
- **ORM**: Drizzle ORM 0.44.6 with `pg` driver for type-safe database operations

Key backend configuration:
- API listens on port defined by `API_PORT` (default: 3001)
- Global API prefix: `/api/v1`
- Environment-based configuration using ConfigService
- Database connection pooling with PostgreSQL
- `DATABASE_CONNECTION` provider for injecting Drizzle instance

### Frontend Architecture

- **Framework**: Next.js 15.5.4 with App Router
- **Entry Point**: `frontend/src/app/page.tsx`
- **Layout**: `frontend/src/app/layout.tsx`
- **Styling**: Tailwind CSS 4 with PostCSS
- **Build Tool**: Turbopack (enabled for both dev and build)
- **UI Components**: shadcn/ui setup with @base-ui-components/react
- **Component Library Config**: `frontend/components.json` - shadcn/ui configuration (New York style)
- **Theme System**: `frontend/src/contexts/ThemeContext.tsx` - provides dark/light mode toggle
- **UI Components**: `frontend/src/components/ui/` - Button, Avatar, ThemeToggle, Profile components
- **Utilities**: `frontend/src/lib/utils.ts` - `cn()` helper (clsx + tailwind-merge)
- **Icons**: Lucide React for icon components

API communication:
- Client-side: Uses `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- Server-side: Uses `API_URL=http://backend:3001/api/v1` (Docker network)

### Database

PostgreSQL 17 configuration (defined in `.env.database`):
- Database: `the-perfect-boilerplate`
- User/Password: `root/root` (development only)
- Host: `db` (Docker network) or `localhost` (local)
- Port: 5432

**Drizzle ORM Configuration**:
- **Config File**: `backend/drizzle.config.js` - configures schema path, migrations directory, and database credentials
- **Schema**: `backend/src/db/schema.ts` - type-safe table definitions (e.g., `users` table)
- **Migrations**: `backend/src/db/migrations/` - auto-generated migration files
- **Seeding**: `backend/src/db/seed.ts` - database seeding script
- **Database Module**: `backend/src/db/db.module.ts` - provides Drizzle connection via `DATABASE_CONNECTION` token

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
API_PORT=3001

# PostgreSQL Database (also required for Drizzle ORM)
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=the-perfect-boilerplate
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1  # Client-side
API_URL=http://backend:3001/api/v1                # Server-side (SSR)
```

### Database (.env.database)
Database credentials are in root `.env.database` file, shared by Docker Compose.

## Code Quality Tools

### Frontend
- **Linter**: ESLint 9 with Next.js and Prettier configs
- **Formatter**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript 5

### Backend
- **Linter**: ESLint 9 with TypeScript-ESLint
- **Formatter**: Prettier
- **Type Checking**: TypeScript 5.7

## Key Dependencies

### Frontend
- Next.js 15.5.4 with Turbopack
- React 19.1.0
- Tailwind CSS 4 (PostCSS)
- @base-ui-components/react 1.0.0-beta.4 (shadcn/ui foundation)
- class-variance-authority 0.7.1 (CVA for component variants)
- clsx 2.1.1 + tailwind-merge 3.3.1 (className utilities)
- lucide-react 0.544.0 (icon library)
- tw-animate-css 1.4.0 (Tailwind animations)

### Backend
- NestJS 11
- @nestjs/config 4.0.2 for environment management
- Drizzle ORM 0.44.6 for database operations
- Drizzle Kit 0.31.5 for migrations and schema management
- pg 8.16.3 (PostgreSQL driver)
- Jest 30 for testing
- Reflect-metadata for decorators

## Working with Docker

The project uses Docker Compose for development with:
- **Automatic dependency installation**: pnpm installs on container start
- **Volume mounting**: Source code is mounted for hot reload
- **Network**: All services share `the-perfect-boilerplate-network`
- **Health checks**: Database has health check before backend starts
- **Persistent data**: PostgreSQL data persists in named volume

Dependencies are installed inside containers, so local `node_modules` may differ from container versions.

## Important Notes

- This is a monorepo (root + frontend + backend)
- All services are designed to run in Docker for development
- API routes are prefixed with `/api/v1` globally
- Use environment-specific API URLs (different for client vs server-side rendering)
- Database schema changes require running `pnpm run db:generate` to create migrations
- Use `DATABASE_CONNECTION` token to inject Drizzle instance in NestJS services
- Frontend uses shadcn/ui with Base UI components (not the traditional shadcn/ui setup)
- Theme system is implemented via React Context (`ThemeContext.tsx`)
- All UI components use the `cn()` utility for conditional class merging
