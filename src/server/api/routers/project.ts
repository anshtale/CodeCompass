import { string, z } from "zod";
import { createTRPCRouter, protectedProcedures } from "../trpc";
import { pollCommits } from "~/lib/github";
import { indexGithubRepo } from "~/lib/github-loader";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedures.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async ({ ctx, input }) => {
        const project = await ctx.db.project.create({
            data: {
                githubUrl: input.githubUrl,
                name: input.name,
                userToProjects: {
                    create: {
                        userId: ctx.user.userId!,
                    }
                }
            }
        })
        
        console.log('indexing github repo');
        await indexGithubRepo(project.id,input.githubUrl,input.githubToken)
        await pollCommits(project.id)
        
        return project;
    }),

    getProjects: protectedProcedures.query(async ({ ctx }) => {
        return await ctx.db.project.findMany({
            where: {
                userToProjects: {
                    some: {
                        userId: ctx.user.userId!
                    },
                },
                deletedAt: null
            }
        })
    }),
    
    getCommits: protectedProcedures.input(
        z.object({
            projectId: z.string(),
        })
    ).query(async({ctx,input})=>{
        pollCommits(input.projectId).then().catch(console.error);
        
        return await ctx.db.commit.findMany({
            where: { 
                projectId : input.projectId
            }
        })
    }),

    saveAnswer:protectedProcedures.input(z.object({
        projectId: z.string(),
        answer: z.string(),
        question: z.string(),
        fileReferences: z.any()
    })).mutation(async ({ctx,input})=>{
        return await ctx.db.question.create({
            data:{
                answer:input.answer,
                projectId: input.projectId,
                question: input.question,
                fileReferences: input.fileReferences,
                userId: ctx.user.userId!
            }
        })
    }),

    getQuestions:protectedProcedures.input(z.object({
        projectId: z.string()
    })).query(async({ctx,input})=>{
        return await ctx.db.question.findMany({
            where:{
                projectId:input.projectId
            },
            include:{
                user:true,

            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }),

    uploadMeeting : protectedProcedures.input(z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string()
    })).mutation(async ({ctx,input})=>{
        const meeting =  await ctx.db.meeting.create({
            data:{
                meetingUrl: input.meetingUrl,
                projectId: input.projectId,
                name: input.name,
                status: "PROCESSING"
            }
        })

        return meeting
    }),

    getMeetings : protectedProcedures.input(z.object({
        projectId: z.string()
    })).query(async({ctx,input})=>{
        return await ctx.db.meeting.findMany({
            where: {
                projectId: input.projectId
            },
            orderBy:{
                createdAt: 'desc'
            },
            include:{
                issues:true
            }
        })
    }),

    deleteMeeting: protectedProcedures.input(z.object({
        meetingId: z.string()
    })).mutation(async({ctx,input})=>{
        return await ctx.db.meeting.delete({
            where:{
                id:input.meetingId
            }
        })
    })
})

