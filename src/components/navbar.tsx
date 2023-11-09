"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "../app/(marketing)/_components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import SignInButton from "../app/(marketing)/_components/SignInButton";
import { Session } from "next-auth";
import UserAccountNav from "./UserAccountNav";


export const Navbar = ({ session } : { session: Session | null}) => {
  const scrolled = useScrollTop();
  
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        { session?.user? 
        <UserAccountNav user={session.user}/> : 
        <SignInButton text="Sign in" />
        }
        
      </div>
    </div>
  )
} 