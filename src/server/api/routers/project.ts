import { z } from "zod";
import { createTRPCRouter, protectedProcedures, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedures.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async({ctx,input})=>{
        console.log('input',input)
        return true;
    })
})