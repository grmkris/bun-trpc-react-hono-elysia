# bun-trpc-react

A bun monorepo boilerplate project for using [bun](https://bun.sh) with [trpc](https://trpc.io) and [React](https://reactjs.org).

This project includes:
- monorepo:
  - bun
  - prettier
- [apps/frontend](apps/frontend)
  - vite
  - tailwind
  - react
- Backend:
  I couldn't decide between using elysia or hono for the backend, so I included both as seperated apps. There is also package that makes combined router out of both services for seamless usage on frontend
  - [apps/backend-elysia](apps/backend-elysia)
    - elysia
    - trpc
    - zod
  - [apps/backend-hono](apps/backend-hono)
    - hono
    - trpc
    - zod

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v0.6.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
