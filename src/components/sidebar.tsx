import React from 'react'
import { Logo } from './logo'
import { SidebarRoutes } from './sidebar-routes'

type Props = {}

export const Sidebar = (props: Props) => {
  return (
    <div className="h-full w-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="pt-6">
        <Logo />

      </div>
      
      <div className="pt-14">
        <SidebarRoutes />

      </div>
  
      
      

    </div>
  )
}

