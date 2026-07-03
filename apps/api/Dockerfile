# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm typescript@5.7.3

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json .npmrc ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

RUN cd apps/api && tsc

# Copy schema.graphql to dist (tsc doesn't copy non-TS files)
RUN cp apps/api/src/schema/schema.graphql apps/api/dist/schema/schema.graphql

# --- Production stage ---
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 4000

CMD ["node", "apps/api/dist/index.js"]
