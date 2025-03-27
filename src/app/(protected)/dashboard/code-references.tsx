import { TabsContent } from '@radix-ui/react-tabs';
import React, { useState } from 'react'
import { Button } from '~/components/ui/button';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Tabs } from '~/components/ui/tabs';
import { cn } from '~/lib/utils';

type Props = {
    fileReferences : {
        fileName:string;
        sourceCode: string;
        summary:string
    }[]
}
function CodeReferences({fileReferences} : Props) {
    const [tab,setTab] = useState(fileReferences[0]?.fileName);
    return (
        <div className='max-w-[70vw]'>
            <Tabs value={tab} onValueChange={setTab}>
                <div className="scrollable overflow-scroll gap-2 bg-gray-200 p-1 rounded-md">
                    {fileReferences.map((file)=>{
                        console.log(file.fileName)
                        return <button onClick = {()=>setTab(file.fileName)} key={file.fileName} className={cn(
                            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:bg-muted',
                            {
                                'bg-primary text-primary-foreground' : tab === file.fileName,

                            }
                        )}>
                            {file.fileName}
                        </button>
                    })}
                </div>
                {fileReferences.map(file=> {
                    return <TabsContent key = {file.fileName} value={file.fileName} className='max-h-[40vh] scrollable overflow-scroll max-w-[70vw] rounded-md'>
                         <SyntaxHighlighter language='typescript' style = {lucario}
                         wrapLongLines = {true}>
                            {file.sourceCode}
                         </SyntaxHighlighter>
                    </TabsContent>
                })}
            </Tabs>

        </div>
    )
}

export default CodeReferences