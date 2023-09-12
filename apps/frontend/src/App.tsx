import { trpcClient } from "./features/trpc-client.ts";

export default function App() {
  const hono = trpcClient.honoServer.hello.useQuery();
  const elysia = trpcClient.elysiaRouter.hello.useQuery();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-4xl font-bold">Hello world!</h1>
        <h2 className="mb-4 text-2xl">Elysia - TRPC:</h2>
        <p className="text-gray-700">{elysia.data}</p>

        <h2 className="mb-4 text-2xl">Hono - TRPC:</h2>
        <p className="text-gray-700">{hono.data}</p>
      </div>
    </div>
  );
}
