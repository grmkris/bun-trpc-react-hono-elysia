import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "api/combined.ts";

export const trpcClient = createTRPCReact<AppRouter>();
