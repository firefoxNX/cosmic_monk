import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message} and stack: ${error?.stack}`,
          );
        }
      : undefined,
});
