/** combined
 *
 */
import { elysiaRouter } from "backend-elysia/src";
import { honoRouter } from "backend-hono/src/trpc.ts";

import { router } from "./index.ts";

const appRouter = router({
  honoServer: honoRouter,
  elysiaRouter: elysiaRouter,
});

export type AppRouter = typeof appRouter;
