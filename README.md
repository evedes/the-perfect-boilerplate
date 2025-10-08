# The Perfect Boilerplate

A modern, production-ready full-stack boilerplate with Next.js, NestJS, PostgreSQL, and Docker.

## Stack

- **Frontend**: Next.js 15.5.4 (App Router) + React 19.1.0 + Tailwind CSS 4 + TypeScript 5
- **Backend**: NestJS 11 + TypeScript 5.7
- **Database**: PostgreSQL 17 with Drizzle ORM 0.44.6
- **Dev Environment**: Docker Compose
- **Package Manager**: pnpm

## Quick Start

```bash
# Clone the repository
git clone https://github.com/evedes/the-perfect-boilerplate.git
cd the-perfect-boilerplate

# Start all services (frontend, backend, database)
pnpm run dev:up
```

Your application is now running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/v1
- PostgreSQL: localhost:5432

To stop all services:
```bash
pnpm run dev:down
```

## Project Structure

```
the-perfect-boilerplate/
├── frontend/          # Next.js application
│   ├── src/
│   │   └── app/      # App Router pages
│   └── public/       # Static assets
├── backend/          # NestJS application
│   ├── src/          # Source code
│   └── test/         # Tests
└── docker-compose.dev.yaml
```

## Development

The project uses Docker Compose for local development. All dependencies are automatically installed when containers start.

### Frontend Development

```bash
cd frontend
pnpm install       # Install dependencies
pnpm run dev       # Run dev server (with Turbopack)
pnpm run build     # Build for production
pnpm run lint      # Run linter
```

### Backend Development

```bash
cd backend
pnpm install       # Install dependencies
pnpm run start:dev # Run in watch mode
pnpm run build     # Build for production
pnpm run lint      # Run linter
pnpm run format    # Format code

# Database operations
pnpm run db:generate  # Generate migrations
pnpm run db:migrate   # Run migrations
pnpm run db:seed      # Seed database
```

### Testing

```bash
cd backend
pnpm test          # Run unit tests
pnpm run test:watch # Run tests in watch mode
pnpm run test:e2e  # Run E2E tests
pnpm run test:cov  # Run with coverage
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
API_PORT=3001

# PostgreSQL Database (required for Drizzle ORM)
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=the-perfect-boilerplate

# Database Seeding (optional - defaults provided)
SEED_USER_EMAIL=demo@example.com
SEED_USER_FIRST_NAME=Demo
SEED_USER_LAST_NAME=User
```

### Frontend (.env)
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1  # Client-side
API_URL=http://backend:3001/api/v1                # Server-side (SSR)
```

### Database (database/.env)
```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=the-perfect-boilerplate
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

**Setup Instructions**:
1. Copy `database/.env.example` to `database/.env`
2. Copy `backend/.env.example` to `backend/.env` (includes database credentials)
3. Copy `frontend/.env.example` to `frontend/.env`
4. Update credentials as needed (defaults work for local development)

## Features

- ✅ Modern TypeScript setup across the stack
- ✅ Docker Compose for easy local development
- ✅ Hot reload for both frontend and backend
- ✅ ESLint + Prettier configured for both frontend and backend
- ✅ Next.js 15.5.4 with Turbopack (dev and build)
- ✅ React 19.1.0 with App Router
- ✅ NestJS 11 with ConfigModule for environment management
- ✅ PostgreSQL 17 with Drizzle ORM 0.44.6
- ✅ Type-safe database schema and migrations with Drizzle Kit
- ✅ Database seeding with conflict handling
- ✅ basecn/ui components integration (Base UI + Tailwind CSS 4)
- ✅ Dark/Light theme toggle using next-themes
- ✅ Tailwind CSS 4 with PostCSS (using `@theme` inline syntax)
- ✅ Server-side API health check with timeout handling
- ✅ Monorepo structure with independent frontend/backend packages

## Architecture Highlights

### Backend
- Global API prefix: `/api/v1`
- Environment-based configuration using `@nestjs/config`
- Modular NestJS architecture
- Drizzle ORM with PostgreSQL connection pooling
- Type-safe database schema (`backend/src/db/schema.ts`)
- Database migrations and seeding support
- Jest 30 for testing

### Frontend
- Next.js 15.5.4 App Router (App Directory structure)
- React 19.1.0 with Server Components
- Tailwind CSS 4 with PostCSS (`@theme` inline syntax in `globals.css`)
- Basecn/ui components (@base-ui-components/react)
- Theme system with dark/light mode toggle (next-themes)
- `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Separate API URLs for client/server rendering
- Server-side API health check (`checkApiHealth()` in `lib/api.ts`)
- Turbopack for faster dev and production builds
- Lucide React icons (Moon, Sun, etc.)
- Geist Sans and Geist Mono fonts

### Database
- PostgreSQL 17 with persistent volumes
- Drizzle ORM 0.44.6 for type-safe database operations
- Schema-first migrations with Drizzle Kit 0.31.5
- Connection pooling with `pg` driver (pg 8.16.3)
- Database seeding script (`backend/src/db/seed.ts`) with conflict handling
- Health check before backend starts (Docker Compose)
- Isolated Docker network (`the-perfect-boilerplate-network`)
- Current schema: `users` table with UUID primary key, email (unique), names, timestamps

## License

ISC
