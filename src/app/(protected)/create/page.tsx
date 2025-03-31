'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'
import Spinner from './spinner'
import useRefetch from '~/hooks/use-refetch'
import { Info } from 'lucide-react'
import { TRPCClientError } from '@trpc/client'

type formInput = {
    repoUrl : string
    projectName : string
    githubToken ?: string
}

function CreatePage() {
    const {register, handleSubmit, reset} = useForm<formInput>();

    const [gtbUrl, setGtbUrl] = useState<string>()
    const refetch = useRefetch();

    const createProject = api.project.createProject.useMutation()
    const checkCredits = api.project.checkCredits.useMutation()

    function onSubmit( data : formInput){
        setGtbUrl(data.repoUrl)
        if(!!checkCredits.data && gtbUrl === checkCredits.data.githubUrl){
            createProject.mutate({
                githubUrl : data.repoUrl,
                name : data.projectName,
                githubToken:data.githubToken
            },{
                onSuccess:()=>{
                    toast.success('Project Created Successfully!')
                    refetch();
                    reset();
                },
                onError: (error)=>{
                    console.log('CREATE',error.message)
                    toast.error('Failed to create project')
                }
            })
        }else{
            checkCredits.mutate({
                githubToken:data.githubToken,
                githubUrl: data.repoUrl
            },{
                onError: (error)=>{
                    if (error instanceof TRPCClientError) {
                        toast.error(error.message)
                    }
                    else {
                        toast.error('An unexpected error occurred')
                    }
                }
            })
            
        }
    }

    const hasEnoughCredits = checkCredits?.data?.userCredits ? checkCredits.data.fileCount <= checkCredits.data.userCredits:true

    return (
        <div className='flex items-center gap-12 h-full justify-center'>
            <img src={'/github.svg'} className = 'h-56 w-auto'/>
            <div>
                <div>
                    <h1 className='font-semibold text-2xl'>
                        Link Your Github Repository
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Enter the URL of your repository to link to GitChat
                    </p>
                </div>
                
                <div className='h-4'></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                        {...register('repoUrl',{required : true})}
                        onChange={(e)=>{
                            setGtbUrl(e.target.value)
                        }}
                        
                        placeholder='Repo-Url'
                        type='url'
                        required/>

                        <div className='h-4'></div>

                        <Input 
                        {...register('projectName',{required : true})}
                        placeholder='Project Name'
                        required/>

                        <div className='h-4'></div>

                        <Input 
                        {...register('githubToken',{required : false})}
                        placeholder='Token (Optional)'/>

                        
                        <div className='h-2'></div>
                        {!!checkCredits.data && (
                            <>
                                <div className='mt-4 bg-orange-50 px-4 py-4 rounded-md border border-orange-200 text-orange-700'  >
                                    <div className='flex items-center gap-2'>
                                        <Info className='size-4'/>
                                        <p className='text-sm'>
                                            You will be charged <strong>{checkCredits.data?.fileCount}</strong> credits for this repository
                                        </p>

                                    </div>
                                    <p className='text-sm text-blue-600 ml-6'>
                                        You have <strong>{checkCredits.data?.userCredits}</strong> credits remaining
                                    </p>
                                </div>
                                <div className='h-4'></div>
                            </>
                    )}

                        <Button type='submit' disabled = {createProject.isPending || checkCredits.isPending || !hasEnoughCredits}>
                            {createProject.isPending || checkCredits.isPending && 
                            <Spinner/>
                            }
                            {!!checkCredits.data && gtbUrl === checkCredits.data.githubUrl ? "Create Project" : "Check Credits"}
                        </Button>
                    </form>
                </div>
            </div>

        </div>
  )
}

export default CreatePage