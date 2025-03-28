'use client'

import useProject from "~/hooks/use-projects"
import { api } from "~/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MeetingPage = ()=>{
    const {projectId} = useProject();
    const router = useRouter()
    const {data : meetings,isLoading} = api.project.getMeetings.useQuery({ projectId },{
        refetchInterval: 4000
    })
    const [deletingId,setDeletingId] = useState('')
    const deleteMeeting = api.project.deleteMeeting.useMutation()
    return (
        <>
            <MeetingCard/>
            <div className="h-6"></div>
            <h1 className="mb-1 text-2xl font-semibold">Meetings</h1>
            {meetings && meetings.length === 0 && (
                <div>No Meetings found</div>
            )}
            {isLoading && <div>Loading...</div>}
            <ul className="divide-y divide-gray-200">
                {meetings?.map(meeting =>(
                    <li key = {meeting.id} className = 'p-2 flex mb-2 items-center border shadow rounded-md justify-between py-5 gap-x-6'>
                        <div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <Link href={`/meetings/${meeting.id}`} className = "text-sm font-semibold">
                                        {meeting.name}
                                    </Link>
                                    {meeting.status === 'PROCESSING' && (
                                        <Badge className="bg-yellow-500 text-white">
                                            Processing...
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center  text-xs text-gray-500 gap-x-2">
                                <p className="whitespace-nowrap">
                                    {meeting.createdAt.toDateString()}
                                </p>
                                <p className="truncate">
                                    {meeting.issues.length} issues
                                </p>
                            </div>                
                        </div>
                        <div className="flex items-center flex-none gap-x-4">
                            <Link href={`/meetings/${meeting.id}`}>
                                <Button variant={"outline"}>
                                    View Meeting
                                </Button>
                            </Link>
                            <Button disabled = {deleteMeeting.isPending && meeting.id === deletingId } onClick={()=>{
                                setDeletingId(meeting.id)
                                deleteMeeting.mutate({meetingId: meeting.id},{
                                    onSuccess: () => {
                                        router.refresh()
                                        toast.success('Meeting successfully deleted!')
                                        setDeletingId('')
                                    },
                                    onError:()=>{
                                        setDeletingId('')
                                        toast.error('Failed to delete meeting')
                                    }
                                })
                            }} variant={'destructive'} className="flex items-center justify-center">
                                <Trash className="h-2 w-2"/>
                            </Button>

                        </div>
                    </li>
                ))}
            </ul>
        </>
    )




}

export default MeetingPage