'use client'

import { useState } from "react"
import { Card } from "~/components/ui/card"
import {useDropzone} from 'react-dropzone'
import { uploadFile } from "~/lib/firebase"
import { toast } from "sonner"
import { Presentation, Upload } from "lucide-react"
import { Button } from "~/components/ui/button"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"
import useProject from "~/hooks/use-projects"
import { useRouter } from "next/navigation"


function MeetingCard() {
    const {project} = useProject()
    const router = useRouter();
    const [isUploading,setIsUploading] = useState(false)
    const [progress,setProgress] = useState(0)
    const uploadMeeting = api.project.uploadMeeting.useMutation();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'audio/': ['.mp3','.wav','.m4a']
        },
        multiple: false,
        maxSize: 50_000_000,
        onDrop: async (acceptedFiles)=>{
            console.log(acceptedFiles)
            if(!project) return;

            const file = acceptedFiles[0];
            if(!file) return;
            
            setIsUploading(true)
            try{
                const downloadURL = await uploadFile(file as File,setProgress) as string
                
                uploadMeeting.mutate({
                    projectId:project.id,
                    meetingUrl: downloadURL,
                    name: file.name
                },{
                    onSuccess: () => {
                        toast.success('Meeting uploaded successfully!')
                        router.push('/meetings')
                    },
                    onError: ()=>{
                        toast.error('Error in uploading meeting')
                    }
                })
            }catch (err) {
                toast.error('Error in uploading meeting')
            }finally {
                setIsUploading(false)
            }
        }
    })

    return (
        <Card className = {cn('col-span-2 flex flex-col items-center justify-center p-10',{
            'hover: cursor-pointer ': !isUploading
        })}  {...getRootProps()}>
            {!isUploading && (
                <>
                    <Presentation className="h-10 w-10 animate-bounce"/>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                Create a new meeting
                        </h3>
                        <p className="mt-1 text-center text-sm text-gray-500">
                            Analyse your meeting with GitChat
                            <br/>
                            Powered by AI.
                        </p>
                        <div className="mt-6">
                            <Button disabled = {isUploading}>
                                <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden = "true"/>
                                Upload Meeting
                                <input className = "hidden" {...getInputProps()}/>

                            </Button>

                        </div>

                </>
            )}

            {isUploading && (
                <div >
                    
                        <CircularProgressbar text = {`${progress}`} value={progress} className="size-20"styles={buildStyles({
                            pathColor: '#2563eb',
                            textColor: '#2563eb',
                        })}/>
                        
                        <p className="mt-5 animate-pulse text-sm text-gray-500 text-center" >
                            Uploading your meeting...
                        </p>

                </div>
            )}
        </Card>
    )
}

export default MeetingCard