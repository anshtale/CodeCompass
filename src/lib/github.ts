import { Octokit } from "octokit" 
import { db } from "~/server/db";
import axios from "axios"
import { AIsummariseCommit } from "./gemini";

export const octoKit = new Octokit({
    auth : process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/docker/genai-stack"

type Response = {
    commitMessage: string;
    commitHash : string;
    commitAuthorName : string;
    commitAuthorAvatar : string;
    commitDate : string;
}

export const getCommitHashes = async (githubUrl : string): Promise<Response[]>=> {
    const [owner,repo] = githubUrl.split('/').slice(-2);
    // console.log(owner,repo);
    
    if(!owner || !repo){
        throw new Error("Invalid Repository Url");
    }

    const { data } = await octoKit.rest.repos.listCommits({
        owner : owner,
        repo: repo
    })

    const sortedCommits = data.sort((a:any,b:any) => new Date(b.commit.author.data).getTime() - new Date(a.commit.author.date).getTime()) as any

    return sortedCommits.slice(0,10).map((commit:any) => {
        return {
            commitHash: commit.sha as string,
            commitMessage: commit.commit.message ?? "",
            commitAuthorName : commit.commit?.author?.name ?? " ",
            commitAuthorAvatar : commit.author?.avatar_url ?? "",
            commitDate : commit.commit?.author?.date ?? "",
        }
    });
}

{/*pagination can be applied */}
export const pollCommits = async(projectId : string) =>{
    const {project, githubUrl} = await fetchProjectGithubUrl(projectId);

    const commitHashes = await getCommitHashes(githubUrl);

    const unprocessedCommits = await filterUnprocessedCommits(commitHashes,projectId);

    const summaryResponses = await Promise.allSettled(unprocessedCommits.map((commit)=>{
        return summariseCommit(githubUrl,commit.commitHash)
    }))

    const summaries = summaryResponses.map((response)=>{
        if(response.status === 'fulfilled'){
            return response.value as string
        }
        return ""
    })

    const commits = await db.commit.createMany({
        data: summaries.map((summary,index)=>{
            return {
                projectId : projectId,
                commitHash : unprocessedCommits[index]!.commitHash,
                commitMessage : unprocessedCommits[index]!.commitMessage,
                commitAuthorName : unprocessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar : unprocessedCommits[index]!.commitAuthorAvatar,
                commitDate : unprocessedCommits[index]!.commitDate,
                summary
            }
        })
    })

    return commits;

    // console.log(unprocessedCommits);
}

async function summariseCommit(githubUrl: string, commitHash:string){
        //githubUrl stucture-> https://github.com/{owner}/{repo}/commit/<commitHash>.diff

        const { data }  = await axios.get<string>(`${githubUrl}/commit/${commitHash}.diff`,{
            headers: {
                Accept:'application/vnd.github.v3.diff'
            }
        })

        return await AIsummariseCommit(data) || "" 
}

async function fetchProjectGithubUrl(projectId : string){
    const project = await db.project.findUnique({
        where: {id:projectId},
        select:{
            githubUrl:true
        }
    })

    if(!project?.githubUrl){
        throw new Error("Project has no github url")
    }

    return {project,githubUrl : project?.githubUrl};
}

async function filterUnprocessedCommits(commitHashes: Response[],projectId:string){
    const processedCommits = await db.commit.findMany({
        where:{
            projectId
        }
    })

    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processCommit)=> processCommit.commitHash === commit.commitHash))

    return unprocessedCommits;
}