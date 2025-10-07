FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json ./
# In production builds, the lock file should be copied from root during CI/CD
# For now, we'll generate it if not present
RUN pnpm install --no-frozen-lockfile
COPY . .

RUN pnpm run build

FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

EXPOSE 3001

CMD ["node", "dist/main"]
