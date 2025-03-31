'use client'

import { DialogTitle } from "@radix-ui/react-dialog";
import { CopyIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import useProject from "~/hooks/use-projects"

function InviteButton() {
    const {projectId} = useProject();
    const [open,setOpen] = useState(false);
    return (
        <>
            <Dialog open= {open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Invite Team Members
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">
                        Ask them to copy and paste this link
                    </p>
                    <Input
                        readOnly
                        className="mt-4 justify-between hover:cursor-pointer"
                        onClick={()=>{
                            navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)

                            toast.success("Copied!")
                        }}
                        value={`${window.location.origin}/join/${projectId}`}
                    >
                        
                    </Input>
                </DialogContent>

            </Dialog>
            <Button className="flex items-center justify-center" variant={'outline'} size = 'sm' onClick={()=>{
                setOpen(true);
            }}>
                <PlusIcon></PlusIcon>
                <span className="text-[12px]">Invite Members</span>
            </Button>
        </>
    )
}

export default InviteButton