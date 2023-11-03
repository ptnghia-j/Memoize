import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { sign } from 'crypto'
import { Link, LogOut } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import UserAvartar from './UserAvartar'

type Props = {
  user: Pick<User, 'name' | 'email' | 'image'>
}

const UserAccountNav = ({ user} : Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvartar user={user} />
       
      </DropdownMenuTrigger>

      <DropdownMenuContent className="" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium"> {user.name} </p>}
            {user.email && <p className="w-[200px] truncate text-sm text-zinc-700"> {user.email} </p>}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
            <Link href=""> Placeholder </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={(e) => {
          e.preventDefault()
          signOut().catch(console.error)
        }}>
            Sign Out
            <LogOut className="w-4 h-4"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default UserAccountNav