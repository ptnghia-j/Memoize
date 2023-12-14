"use client"
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface SidebarItemProps {
  icon: LucideIcon,
  label: string,
  href: string,
}

export const SidebarItem = ({
  icon: Icon, 
  label,
  href
}: SidebarItemProps) => {
  const pathName = usePathname()
  const router = useRouter()

  const theme = useTheme()
  const isDark = theme.theme === "dark"

  
  const isActive = pathName === href
    

  const onClick = () => {
    router.push(href)
  }

  return (
    <button 
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700",
        isDark && "hover:bg-slate-700/20 hover:text-slate-100 text-white"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={20} className={cn ("text-slate-500", isActive && "text-sky-700", isDark && "text-white")} />
        {label}
      </div>

      <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-11 transition-all", isActive && "opacity-100", isDark && "border-white")}/>

    </button>
  )
}