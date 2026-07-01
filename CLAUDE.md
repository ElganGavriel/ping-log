# ping-log

MERN stack monorepo with GraphQL, Apollo, pnpm, and Nx.

## Stack

- **Web** (`apps/web`): React 18, Vite, Apollo Client 3, TypeScript
- **API** (`apps/api`): Node.js, Express, Apollo Server 4, Mongoose, TypeScript
- **Shared** (`packages/shared`): shared TypeScript types
- **Package manager**: pnpm with workspace protocol
- **Monorepo tooling**: Nx (task orchestration + caching)
- **GraphQL types**: graphql-codegen (run `pnpm codegen`)

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start both apps in parallel |
| `pnpm dev:api` | API only on :4000 |
| `pnpm dev:web` | Web only on :3000 |
| `pnpm codegen` | Regenerate types from schema |
| `pnpm codegen:watch` | Watch mode for codegen |
| `pnpm build` | Build all apps |

## GraphQL workflow

1. Edit `apps/api/src/schema/schema.graphql` — this is the source of truth
2. Add/edit operation files in `apps/web/src/graphql/*.graphql`
3. Run `pnpm codegen`
4. Import typed hooks: `useHelloQuery()` from `./generated/graphql.generated`
5. API resolvers must satisfy the schema or TypeScript will error

## Env setup

Copy `apps/api/.env.example` → `apps/api/.env` and set `MONGODB_URI`.

## Ports

- Web: http://localhost:3000
- API / GraphQL playground: http://localhost:4000/graphql
- Vite proxies `/graphql` → `:4000` so the client uses relative URLs
