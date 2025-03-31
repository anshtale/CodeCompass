import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSideBar } from './app-sidebar'

type props = {
    children: React.ReactNode
}

function SideBarLayout({children} : props) {
  return (
    <SidebarProvider>
      <AppSideBar/>

      <main className='w-full m-2'>
        <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow shadow-rounded rounded-md p-2 px-4'>
          {/* SearchBar*/}
        <SidebarTrigger />
          <div className="ml-auto"></div>
          <UserButton/>
        </div>
        <div className='h-4'></div>
        {/*main content*/ }
        <div className='scrollable border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4  '>
          {children}
        </div>
      </main>

    </SidebarProvider>
  )
}

export default SideBarLayout