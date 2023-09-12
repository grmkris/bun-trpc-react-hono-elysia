import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";

import { trpcClient } from "./trpc-client.ts";

export function TrpcProvider(props: { children?: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [combinedClient] = useState(() => {
    return trpcClient.createClient({
      links: [
        // create a custom ending link
        (runtime) => {
          // initialize the different links for different targets
          const servers = {
            honoServer: httpBatchLink({ url: "http://localhost:3000/trpc" })(
              runtime,
            ),
            elysiaRouter: httpBatchLink({ url: "http://localhost:8080/trpc" })(
              runtime,
            ),
          };
          return (ctx) => {
            const { op } = ctx;
            // split the path by `.` as the first part will signify the server target name
            const pathParts = op.path.split(".");

            // first part of the query should be `server1` or `server2`
            const serverName =
              pathParts.shift() as string as keyof typeof servers;

            // combine the rest of the parts of the paths
            // -- this is what we're actually calling the target server with
            const path = pathParts.join(".");
            console.log(`> calling ${serverName} on path ${path}`, {
              input: op.input,
            });

            const link = servers[serverName];

            return link({
              ...ctx,
              op: {
                ...op,
                // override the target path with the prefix removed
                path,
              },
            });
          };
        },
      ],
    });
  });

  return (
    <trpcClient.Provider client={combinedClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpcClient.Provider>
  );
}
