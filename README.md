# The Perfect Boilerplate

A modern, production-ready full-stack boilerplate with Next.js, NestJS, PostgreSQL, and Docker.

## Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind CSS 4 + TypeScript
- **Backend**: NestJS 11 + TypeScript
- **Database**: PostgreSQL 17
- **Dev Environment**: Docker Compose
- **Package Manager**: pnpm with workspaces

## Quick Start

```bash
# Clone the repository
git clone https://github.com/evedes/the-perfect-boilerplate.git
cd the-perfect-boilerplate

# Start all services (frontend, backend, database)
pnpm dev:up
```

Your application is now running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/v1
- PostgreSQL: localhost:5432

To stop all services:
```bash
pnpm dev:down
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
pnpm install      # Install dependencies
pnpm dev          # Run dev server (with Turbopack)
pnpm build        # Build for production
pnpm lint         # Run linter
```

### Backend Development

```bash
cd backend
pnpm install      # Install dependencies
pnpm start:dev    # Run in watch mode
pnpm build        # Build for production
pnpm lint         # Run linter
pnpm format       # Format code
```

### Testing

```bash
cd backend
pnpm test         # Run unit tests
pnpm test:watch   # Run tests in watch mode
pnpm test:e2e     # Run E2E tests
pnpm test:cov     # Run with coverage
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

## Features

- ✅ Modern TypeScript setup across the stack
- ✅ Docker Compose for easy local development
- ✅ Hot reload for both frontend and backend
- ✅ ESLint + Prettier configured
- ✅ Next.js 15 with Turbopack
- ✅ NestJS with ConfigModule
- ✅ PostgreSQL with health checks
- ✅ pnpm workspaces for monorepo management

## Architecture Highlights

### Backend
- Global API prefix: `/api/v1`
- Environment-based configuration using `@nestjs/config`
- Modular NestJS architecture
- Jest for testing

### Frontend
- Next.js App Router
- Tailwind CSS 4 with PostCSS
- Separate API URLs for client/server rendering
- Turbopack for faster builds

### Database
- PostgreSQL 17 with persistent volumes
- Health check before backend starts
- Isolated Docker network

## License

ISC
