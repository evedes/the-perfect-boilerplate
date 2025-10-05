FROM node:22-alpine AS build

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm build

FROM node:22-alpine
RUN npm install -g pnpm
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .

EXPOSE 3001

CMD ["node", "dist/main"]
