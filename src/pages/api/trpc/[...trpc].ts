import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '../../../server/api/root';

// Handle incoming tRPC requests
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default createNextApiHandler({
  router: appRouter,
});
