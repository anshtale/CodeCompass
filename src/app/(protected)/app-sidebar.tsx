'use client'

import { Bot, CreditCardIcon, Github, LayoutDashboard, Plus, Presentation } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { title } from 'process'
import { Button } from '~/components/ui/button'

import logo from 'public/logo.png'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from '~/components/ui/sidebar'
import useProject from '~/hooks/use-projects'
import useRefetch from '~/hooks/use-refetch'
import { cn } from '~/lib/utils'
const items = [
    {
        title : "Dashboard",
        url : "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title : "Q&A",
        url : "/qa",
        icon: Bot,
    },
    {
        title : "Meetings",
        url : "/meetings",
        icon: Presentation,
    },
    {
        title : "Billing",
        url : "/billing",
        icon: CreditCardIcon,
    },

]

export function AppSideBar(){
    const pathname = usePathname();
    const { open } = useSidebar();
    const { projects, projectId, setProjectId} = useProject();
    
    return (
        <Sidebar collapsible='icon' variant='floating'>
          <SidebarHeader>
            <div className=' flex items-center justify-center'>
                <div className='flex items-center gap-1'>
                <Github className="h-6 w-6 text-green-500" />
                    {open && <h1 className='text-xl text-gray-500 font-bold'>GitChat</h1>}
                    
                </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Application
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map(item=>{
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={cn({'bg-primary text-white' : pathname === item.url},'list-none')}>
                                            <item.icon />
                                            <span>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            

            <SidebarGroup>
                <SidebarGroupLabel>
                    Your Projects
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {projects?.map(project=>{
                            return (
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild>
                                        <div className = "cursor-pointer"
                                        onClick={()=> 
                                            setProjectId(project.id)
                                        }>
                                            <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                            {
                                                'bg-primary text-white' : project.id === projectId
                                            })}>
                                                {project.name[0]}
                                            </div>
                                            <span> {project.name}</span>
                                        </div>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            )
                        })}

                        <div className='h-2'></div>
                        {open && 
                            <SidebarMenuItem key={'create-project'}>
                                <Link href={'/create'}>
                                    <Button variant={'outline'} className='sm w-fit'>
                                        <Plus/>
                                        Create Project
                                    </Button>
                                </Link>

                            </SidebarMenuItem>
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>
        </Sidebar>
      )
}