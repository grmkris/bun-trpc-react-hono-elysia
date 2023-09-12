import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { Hono } from "hono";
import { cors } from "hono/cors";

import { honoRouter } from "./trpc";

const app = new Hono();

app
  .use(
    "/trpc/*",
    cors({
      origin: "*",
    }),
  )
  .use(
    "/trpc/*",
    trpcServer({
      router: honoRouter,
    }),
  );

export default app;

console.log(`🔥 Hono is running`);
