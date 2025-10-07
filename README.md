# The Perfect Boilerplate

A modern, production-ready full-stack boilerplate with Next.js, NestJS, PostgreSQL, and Docker.

## Stack

- **Frontend**: Next.js 15.5.4 (App Router) + React 19.1.0 + Tailwind CSS 4 + TypeScript 5
- **Backend**: NestJS 11 + TypeScript 5.7
- **Database**: PostgreSQL 17 with Drizzle ORM 0.44.6
- **Dev Environment**: Docker Compose
- **Package Manager**: pnpm (workspace monorepo)

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
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1  # Client-side
API_URL=http://backend:3001/api/v1                # Server-side (SSR)
```

### Database (.env.database)
```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=the-perfect-boilerplate
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

**Note**: Backend `.env` also includes database credentials for Drizzle ORM configuration.

## Features

- ✅ Modern TypeScript setup across the stack
- ✅ Docker Compose for easy local development
- ✅ Hot reload for both frontend and backend
- ✅ ESLint + Prettier configured
- ✅ Next.js 15.5.4 with Turbopack
- ✅ NestJS 11 with ConfigModule
- ✅ PostgreSQL 17 with Drizzle ORM
- ✅ Type-safe database schema and migrations with Drizzle Kit
- ✅ shadcn/ui components integration (Base UI + Tailwind)
- ✅ Dark/Light theme toggle with context provider
- ✅ pnpm workspace for monorepo management

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
- Next.js App Router (App Directory structure)
- Tailwind CSS 4 with PostCSS
- shadcn/ui components (@base-ui-components/react)
- Theme system with dark/light mode toggle (ThemeContext)
- `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Separate API URLs for client/server rendering
- Turbopack for faster builds
- Lucide React icons

### Database
- PostgreSQL 17 with persistent volumes
- Drizzle ORM for type-safe database operations
- Schema-first migrations with Drizzle Kit
- Connection pooling with `pg` driver
- Health check before backend starts
- Isolated Docker network

## License

ISC
