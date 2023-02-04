import type {NextApiRequest, NextApiResponse} from 'next';
import cors from 'nextjs-cors';
import {createOpenApiNextHandler} from 'trpc-openapi';

import {appRouter} from '../../server/api/root';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Setup CORS
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await cors(req, res);

    // Handle incoming OpenAPI requests
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return createOpenApiNextHandler({router: appRouter})(req, res);
};

export default handler;
