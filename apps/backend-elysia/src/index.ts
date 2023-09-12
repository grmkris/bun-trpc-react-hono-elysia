import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { publicProcedure, router } from "api";
import { Elysia } from "elysia";
import { z } from "zod";

export const elysiaRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}! from Elysia 🦊`;
  }),
});

export type ElysiaRouter = typeof elysiaRouter;

const app = new Elysia()
  .use(cors({ origin: "*" }))
  .use(trpc(elysiaRouter))
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
