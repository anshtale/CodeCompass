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

function AskQuestionCard() {
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

    return (
        <>
            <Dialog open = {open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-[80vw]'>
                    <DialogHeader>
                        <DialogTitle>
                            <p>Logo</p>
                        </DialogTitle>
                    </DialogHeader>

                    <div className=" bg-white">
                        <MDEditor.Markdown 
                            // data-color-mode="light"
                            source={answer}
                            data-color-mode="light"
                            className=" custom-scrollbar  [&_.wmde-markdown]:bg-white [&_.wmde-markdown]:text-gray-800 max-w-[70vw] h-full max-h-[40vh] overflow-scroll"
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