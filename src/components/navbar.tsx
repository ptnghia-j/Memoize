"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import SignInButton from "./SignInButton";
import { Session } from "next-auth";
import UserAccountNav from "./UserAccountNav";


export const Navbar = ({ session, sidebarVisible } : { session: Session | null, sidebarVisible: boolean}) => {
  const scrolled = useScrollTop();
  
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo />
      <div className={cn("md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2", sidebarVisible && "md:mr-56") }>

        <ModeToggle />
        { session?.user? 
        <UserAccountNav user={session.user}/> : 
        <SignInButton text="Sign in" />
        }
        
      </div>
    </div>
  )
} 