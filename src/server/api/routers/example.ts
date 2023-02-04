import {z} from "zod";

import {createTRPCRouter, publicProcedure, protectedProcedure} from "../trpc";

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/hello',
                tags: ['hello'],
                summary: 'Say hello'
            }
        })
        .input(z.object({text: z.string()}))
        .output(z.object({greeting: z.string()}))
        .query(({input}) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/all',
                tags: ['all'],
                summary: 'Get all'
            }
        })
        .input(z.void())
        .output(z.object({
            all: z.array(
                z.object({
                        id: z.string().uuid(),
                        createdAt: z.date(),
                        updatedAt: z.date()
                    }
                )
            )
        }))
        .query(async ({ctx}) => {
            const examples = await ctx.prisma.example.findMany();
            return {all: examples};
        }),

    getSecretMessage: protectedProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/secret',
                tags: ['secret'],
                summary: 'Get secret message'
            }
        })
        .input(z.void())
        .output(z.string())
        .query(() => {
            return "you can now see this secret message!";
        }),
});
