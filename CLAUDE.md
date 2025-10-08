# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack boilerplate with:
- **Frontend**: Next.js 15.5.4 (React 19.1.0, Tailwind CSS 4, TypeScript 5)
- **Backend**: NestJS 11 (TypeScript 5.7)
- **Database**: PostgreSQL 17 with Drizzle ORM 0.44.6
- **Authentication**: BetterAuth 1.3.27 with email/password support
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

### Authentication Architecture

- **Framework**: BetterAuth 1.3.27 with Drizzle ORM adapter
- **Auth Configuration**: `backend/src/auth/auth.ts` - BetterAuth instance with email/password enabled
- **Auth Module**: `backend/src/auth/auth.module.ts` - NestJS module for authentication
- **Auth Controller**: `backend/src/auth/auth.controller.ts` - handles all `/api/v1/auth/*` routes
- **Database Index**: `backend/src/db/index.ts` - exports Drizzle instance for BetterAuth
- **Auth Tables**: `backend/src/db/schema.ts` - includes `user`, `session`, `account`, and `verification` tables

Auth endpoints:
- Authentication routes are available at `/api/v1/auth/*`
- Supports email/password sign-up and sign-in
- Session management with token-based authentication
- Frontend client configured in `frontend/src/lib/auth-client.ts`

Auth components:
- `frontend/src/components/auth/SignInForm.tsx` - sign-in/sign-up form component
- `frontend/src/components/auth/UserSession.tsx` - displays user session and sign-out button
- Uses BetterAuth React hooks: `useSession`, `signIn`, `signUp`, `signOut`

### Frontend Architecture

- **Framework**: Next.js 15.5.4 with App Router
- **Entry Point**: `frontend/src/app/page.tsx` - displays API health check and profile
- **Layout**: `frontend/src/app/layout.tsx` - configures fonts, metadata, and theme provider
- **Styling**: Tailwind CSS 4 with PostCSS (using `@theme` inline syntax, no traditional config file)
- **Build Tool**: Turbopack (enabled for both dev and build)
- **UI Components**: basecn/ui setup with @base-ui-components/react
- **Component Library Config**: `frontend/components.json` - basecn/ui configuration (New York style)
- **Theme System**: Uses `next-themes` package with `ThemeProvider` in layout
- **UI Components**: `frontend/src/components/ui/` - Button, Avatar, ThemeToggle, Profile components
- **Theme Toggle**: `frontend/src/components/ui/ThemeToggle/index.tsx` - uses `next-themes` `useTheme()` hook
- **Utilities**: `frontend/src/lib/utils.ts` - `cn()` helper (clsx + tailwind-merge)
- **API Client**: `frontend/src/lib/api.ts` - server-side API health check function
- **Icons**: Lucide React for icon components (Moon, Sun used in ThemeToggle)

API communication:
- Client-side: Uses `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- Server-side (SSR): Uses `API_URL=http://backend:3001/api/v1` (Docker network)
- Health check: `checkApiHealth()` function with 5s timeout and error handling

### Database

PostgreSQL 17 configuration (defined in `database/.env`):
- Database: `the-perfect-boilerplate`
- User/Password: `root/root` (development only)
- Host: `db` (Docker network) or `localhost` (local)
- Port: 5432

**Environment Setup**:
- Copy `database/.env.example` to `database/.env` and configure credentials
- Backend `.env` must also include the same database credentials for Drizzle ORM

**Drizzle ORM Configuration**:
- **Config File**: `backend/drizzle.config.js` - configures schema path, migrations directory, and database credentials
- **Schema**: `backend/src/db/schema.ts` - type-safe table definitions for BetterAuth tables
- **Migrations**: `backend/src/db/migrations/` - auto-generated migration files
- **Database Module**: `backend/src/db/db.module.ts` - provides Drizzle connection via `DATABASE_CONNECTION` token
- **Database Index**: `backend/src/db/index.ts` - exports Drizzle instance for BetterAuth

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
API_PORT=3001

# CORS - comma-separated list of allowed origins (ignored in development, uses * instead)
ALLOWED_ORIGINS=https://your-production-domain.com

# PostgreSQL Database (required for Drizzle ORM)
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=the-perfect-boilerplate

# BetterAuth
BETTER_AUTH_SECRET=your-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:3001
```

**Note**: Backend needs database credentials for Drizzle ORM. When running in Docker, the backend container loads both `database/.env` and `backend/.env` files.

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1  # Client-side
API_URL=http://backend:3001/api/v1              # Server-side (SSR) - use http://backend:3001/api/v1 in Docker
```

### Database (database/.env)
Database credentials are in `database/.env` file, shared by Docker Compose. Copy from `database/.env.example`.

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
- Tailwind CSS 4 (PostCSS-based, using `@theme` inline syntax)
- @base-ui-components/react 1.0.0-beta.4 (basecn/ui foundation)
- next-themes 0.4.6 (theme management)
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
- BetterAuth 1.3.27 for authentication
- Jest 30 for testing
- Reflect-metadata for decorators

## Working with Docker

The project uses Docker Compose for development with:
- **Automatic dependency installation**: pnpm installs on container start
- **Volume mounting**: Source code is mounted for hot reload
- **Network**: All services share `the-perfect-boilerplate-network`
- **Health checks**: Database has health check before backend starts
- **Persistent data**: PostgreSQL data persists in named volume

## Important Notes

- All services are designed to run in Docker for development
- API routes are prefixed with `/api/v1` globally (configured in `backend/src/main.ts`)
- Use environment-specific API URLs (different for client vs server-side rendering and Docker vs local)
- Backend CORS is configured via `ALLOWED_ORIGINS` env var (development mode uses `*` for convenience)
- Database schema changes require running `pnpm run db:generate` to create migrations
- Use `DATABASE_CONNECTION` token to inject Drizzle instance in NestJS services
- Frontend uses basecn/ui with Base UI components (not the traditional basecn/ui setup)
- Theme system uses `next-themes` package, not a custom React Context
- Tailwind CSS 4 uses `@theme` inline syntax in `globals.css` instead of traditional config file
- All UI components use the `cn()` utility for conditional class merging
- Backend controller (`app.controller.ts`) provides a simple ping endpoint at `/api/v1`
- BetterAuth handles user registration/authentication - no manual seeding required
- Authentication routes are available at `/api/v1/auth/*`
- Use BetterAuth React hooks (`useSession`, `signIn`, `signUp`, `signOut`) for frontend auth
