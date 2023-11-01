"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import SignInButton from "./SignInButton";

// TODO: Add session type
export const Navbar = ({ session }: { session: any }) => {
  const scrolled = useScrollTop();
  
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        { session?.user? 
        ( <h1> Welcome {session.user.name} </h1> ): <SignInButton text="Sign in" />}
        
      </div>
    </div>
  )
} 