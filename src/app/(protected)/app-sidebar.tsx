'use client'

import { Bot, CreditCardIcon, LayoutDashboard, Plus, Presentation } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { title } from 'process'
import { Button } from '~/components/ui/button'
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

const projects = [
    {
        name : 'project-1'
    },
]


export function AppSideBar(){
    const pathname = usePathname();
    const {open} = useSidebar();

    return (
        <Sidebar collapsible='icon' variant='floating'>
          <SidebarHeader>
            Logo
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
                        {projects.map(project=>{
                            return (
                                <SidebarMenuItem key={project.name}>
                                    <SidebarMenuButton asChild>
                                        <div>
                                            <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',{
                                                'bg-primary text-white': true
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