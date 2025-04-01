import { string, z } from "zod";
import { createTRPCRouter, protectedProcedures } from "../trpc";
import { pollCommits } from "~/lib/github";
import { checkCredits, indexGithubRepo } from "~/lib/github-loader";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TRPCError } from "@trpc/server";
import { RequestError } from "octokit";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedures.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({where : {id: ctx.user.userId!}});
        
        if(!user) throw new Error('User not found')
        const currentCredits = user.credits || 0

        const fileCount = await checkCredits(input.githubUrl,input.githubToken)

        if(currentCredits < fileCount){
            throw new Error('Insufficient credits')
        }


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

        await ctx.db.user.update({where:{id: ctx.user.userId! },data:{credits:{decrement:fileCount}}})
        
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
    }),

    getMeetingById: protectedProcedures.input(z.object({
        meetingId: z.string()
    })).query(async ({ctx,input})=>{
        return await ctx.db.meeting.findUnique({
            where:{
                id:input.meetingId
            },
            include:{
                issues:true
            }
        })
    }),

    archiveProject: protectedProcedures.input(z.object({
        projectId:z.string()
    })).mutation(async({ctx,input})=>{
        return await ctx.db.project.update({
            where:{
                id:input.projectId
            },
            data:{
                deletedAt: new Date()
            }
        })
    }),

    getMyCredits: protectedProcedures.query(async({ctx})=>{
        return await ctx.db.user.findUnique({
            where:{
                id:ctx.user.userId!,
            },
            select:{
                credits: true
            }
        })
    }),

    checkCredits: protectedProcedures.input(z.object({
        githubUrl:z.string(),
        githubToken: z.string().optional()
    })).mutation(async ({ctx,input})=>{
        const githubUrl = input.githubUrl;

        try{
            if (!ctx.user?.userId) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }

            const user = await ctx.db.user.findUnique({
                where: { id: ctx.user.userId },
                select: { credits: true }
              })
        
            if (!user) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
            }

            const fileCount = await checkCredits(githubUrl,input.githubToken)

            const userCredits = await ctx.db.user.findUnique({
                where:{
                    id:ctx.user.userId!
                },select: {
                    credits:true
                }
            })

            return {fileCount, userCredits : userCredits?.credits || 0,githubUrl}

        }catch(error){
            
            throw new TRPCError({
                code: error instanceof TRPCError ? error.code : 'INTERNAL_SERVER_ERROR',
                message: error instanceof Error ? error.message : 'Operation failed',
                cause: error
            })
            
        }
    })
})

