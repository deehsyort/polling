import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client"
import { questionRouter } from "./questions";
import superjson from 'superjson';

export const appRouter = trpc
    .router()
    .transformer(superjson)
    .merge("questions.", questionRouter)

export type AppRouter = typeof appRouter;