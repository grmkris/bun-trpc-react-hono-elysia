import { publicProcedure, router } from "api";
import { z } from "zod";

export const honoRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}! from hono 🔥`;
  }),
});

export type HonoRouter = typeof honoRouter;
