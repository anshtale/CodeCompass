"use client"
import { DialogContent } from "@radix-ui/react-dialog";
import { useState } from "react";
import { AlertDialogHeader } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { RouterOutputs } from "~/trpc/react";

function IssueCard({issue} : {issue : NonNullable<RouterOutputs["project"]["getMeetingById"]>["issues"][number]}){

    const [open,setOpen] = useState(false);

    return (
        <>
            <Dialog open = {open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{issue.gist}</DialogTitle>
                        <DialogDescription>{issue.createdAt.toLocaleDateString()}</DialogDescription>
                        <p className="text-gray-600">
                            {issue.headLine}
                        </p>
                        <blockquote className="mt-2 border-l-4 border-gray-300 bg-gray-50 p-4">
                            <span className="text-sm text-gray-600">
                                {issue.start} - {issue.end}
                            </span>
                            <p className="font-medium italic leading-relaxed text-gray-900">
                                {issue.summary}
                            </p>
                        </blockquote>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Card className="relative">
                <CardHeader>
                    <CardTitle className="text-xl">
                        {issue.gist}
                    </CardTitle>
                    <div className="border-b"></div>
                    <CardDescription>
                        {issue.headLine}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={()=>setOpen(true)}>
                        Details
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default IssueCard