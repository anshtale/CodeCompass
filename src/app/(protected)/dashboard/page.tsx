'use client'
import { useUser } from '@clerk/nextjs'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import useProject from '~/hooks/use-projects'
import CommitLog from './commit-log'
import AskQuestionCard from './ask-question-card'
import MeetingCard from './meeting-card'
import ArchiveButton from './archive-button'
import InviteButton from './invite-button'

const DashBoard = ()=>{
    const { project } = useProject()

    return(
        <div>
            <div className='flex items-center justify-between flex-wrap gap-y-4'>

                {/*github link */}
                <div className='w-fit rounded-md bg-primary px-4 py-3'>
                    <div className="flex items-center">
                        <Github className='size-5 text-white'/>
                        <div className='ml-2'>
                            <p className='text-white text-sm font-medium'>
                                This project is linked to {' '}
                                <Link href={project?.githubUrl ?? ""} className='inline-flex items-center text-white/80 hover:underline'>
                                    {project?.githubUrl}
                                    <ExternalLink className='ml-1 size-4'/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className='h-4'></div>

                <div className = 'flex items-center gap-4'>
                    {/* <h1> Team Members</h1> */}
                    {/* <InviteButton/> */}
                    <ArchiveButton/>
                </div>
            </div>

            <div className='mt-4 '>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-5'>
                    <AskQuestionCard/>
                    <MeetingCard/>
                </div>
            </div>

            <div className="mt-8">
                <CommitLog/>
            </div>
        </div>
    )
}

export default DashBoard