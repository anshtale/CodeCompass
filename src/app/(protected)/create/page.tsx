'use client'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'

type formInput = {
    repoUrl : string
    projectName : string
    githubToken ?: string
}
function CreatePage() {
    const {register, handleSubmit, reset} = useForm<formInput>();

    const createProject = api.project.createProject.useMutation()

    function onSubmit( data : formInput){
        createProject.mutate({
            githubUrl : data.repoUrl,
            name : data.projectName,
            githubToken:data.githubToken
        },{
            onSuccess:()=>{
                toast.success('Project Created Successfully!')
                reset();
            },
            onError: (error)=>{
                console.log('CREATE',error.message)
                toast.error('Failed to create project')
            }
        })
    }

    

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

                    
                    <div className='h-4'></div>

                    <Button type='submit'>
                        Create Project
                    </Button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default CreatePage