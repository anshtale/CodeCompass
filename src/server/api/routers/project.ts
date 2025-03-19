import { createTRPCRouter, protectedProcedures, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedures.input().mutation(async({ctx,input})=>{
        console.log('hi')
        return true;
    })
})