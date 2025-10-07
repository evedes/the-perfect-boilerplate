FROM node:24-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm run build

FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml* .
COPY --from=build /app/drizzle.config.js .
COPY --from=build /app/src/db/migrations ./src/db/migrations

# Install production dependencies on the target platform
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3001

CMD ["node", "dist/main"]
