'use client'

import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import useProject from "~/hooks/use-projects";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react"

function ArchiveButton() {
    const archiveProject = api.project.archiveProject.useMutation();    
    const refetch = useRefetch();
    
    const {projectId} = useProject();
    return (
        <Button size='sm' disabled={archiveProject.isPending} variant={"destructive"} onClick={()=>{
            const confirm = window.confirm("are you sure you want to archive this project?")

            if(confirm) archiveProject.mutate({projectId: projectId},{
                onSuccess: ()=>{
                    toast.success("Successfully archived");
                    refetch();
                },
                onError:()=>{
                    toast.error("Failed to archive");
                }
            });
        }}>
            Archive
        </Button>
    )
}

export default ArchiveButton