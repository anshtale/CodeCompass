import MDEditor from '@uiw/react-md-editor'
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import useProject from "~/hooks/use-projects"
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import CodeReferences from './code-references';
import { api } from '~/trpc/react';
import { toast } from 'sonner';
import { SaveIcon } from 'lucide-react';
import useRefetch from '~/hooks/use-refetch';

function AskQuestionCard() {
    const saveAnswer = api.project.saveAnswer.useMutation();
    const {project} = useProject();
    const [ question,setQuestion ] = useState('');
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false)
    const [fileReferences,setFileReferences] = useState<{fileName:string,summary:string,sourceCode:string}[]>([])
    const[answer,setAnswer ] = useState("");

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        setAnswer('')
        setFileReferences([]);

        e.preventDefault();
        if(!project?.id) return;
        setLoading(true)
        
        const { output, fileReferences } = await askQuestion(question,project.id);
        
        setOpen(true)
        setFileReferences(fileReferences)

        for await(const delta of readStreamableValue(output)){
            if(delta){
                setAnswer(ans => ans + delta);
            }
        }

        setLoading(false);
    }
    const refetch = useRefetch()

    return (
        <>
            <Dialog  open = {open} onOpenChange={setOpen}>
                <DialogContent className='scrollable max-h-[80vh] sm:max-w-[80vw] overflow-auto'>
                    <DialogHeader>
                        <div className="flex items-center gap-2">

                            <DialogTitle>
                                <p>Logo</p>
                            </DialogTitle>
                            <Button disabled = {saveAnswer.isPending} variant={'outline'} onClick={()=>{
                                saveAnswer.mutate({
                                    projectId:project!.id,
                                    question,
                                    answer,
                                    fileReferences
                                },{
                                    onSuccess:()=>{
                                        toast.success('Answer saved!')
                                        refetch()
                                    },
                                    onError: ()=>{
                                        toast.error('Failed to save answer!')
                                    }
                                })
                            }}>
                                <div className='flex justify-center items-center gap-1'>
                                    <SaveIcon/>
                                    <span>
                                        Save
                                    </span>
                                </div>

                            </Button>
                        </div>
                    </DialogHeader>

                    <div>
                        <MDEditor.Markdown 
                            // data-color-mode="light"
                            source={answer}
                            data-color-mode="light"
                            className=" scrollable max-w-[70vw] h-full max-h-[40vh] overflow-auto"
                        />
                        <div className="h-4"></div>
                        <CodeReferences fileReferences={fileReferences}/>
                    </div>
 
                    <Button type='button' onClick = {()=>setOpen(false)}>
                        Close
                    </Button>
                    
                </DialogContent>
            </Dialog>
            <Card className="relative col-span-3">
                <CardHeader>
                    <CardTitle>Ask a Question</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Textarea value = {question} onChange = {e=>setQuestion(e.target.value)}placeholder="Which file should I edit to change the home page?"> 
                        </Textarea>
                        <div className="h-4"></div>
                        <Button disabled = {loading} type="submit">
                            Ask GitChat
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AskQuestionCard