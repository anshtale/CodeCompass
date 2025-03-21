import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"

import {Document} from '@langchain/core/documents'
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "~/server/db";

export const loadGithubRepo = async(githubUrl : string, githubToken? : string)=>{

    const loader  = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || '',
        branch: 'main',
        ignoreFiles: ['package.json', 'yarn.lock', 'pnpm-lock.yaml'],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })

    const docs = await loader.load();
    return docs;
}

export const indexGithubRepo = async(projectId:string,githubUrl:string, githubToken?:string )=>{
    const docs = await loadGithubRepo(githubUrl,githubToken);
    const allEmbeddings = await generateEmbeddings(docs);

    const reponse = await 

    const response  = await 
}

const generateEmbeddings = async(docs:Document[])=>{
    return Promise.all(docs.map(async (doc)=>{
        const summary = await summariseCode(doc)
        const embedding  = await generateEmbedding(summary)
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.souce,

        }
    }))
}