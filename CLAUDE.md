# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack monorepo boilerplate with:
- **Frontend**: Next.js 15.5.4 (React 19, Tailwind CSS 4, TypeScript)
- **Backend**: NestJS 11 (TypeScript)
- **Database**: PostgreSQL 17
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

Key backend configuration:
- API listens on port defined by `API_PORT` (default: 3001)
- Global API prefix: `/api/v1`
- Environment-based configuration using ConfigService

### Frontend Architecture

- **Framework**: Next.js 15 with App Router
- **Entry Point**: `frontend/src/app/page.tsx`
- **Layout**: `frontend/src/app/layout.tsx`
- **Styling**: Tailwind CSS 4 with PostCSS
- **Build Tool**: Turbopack (enabled for both dev and build)

API communication:
- Client-side: Uses `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- Server-side: Uses `API_URL=http://backend:3001/api/v1` (Docker network)

### Database

PostgreSQL 17 configuration (defined in `.env.database`):
- Database: `the-perfect-boilerplate`
- User/Password: `root/root` (development only)
- Host: `db` (Docker network) or `localhost` (local)
- Port: 5432

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
API_PORT=3001
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

### Backend
- NestJS 11
- @nestjs/config for environment management
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
