"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import TypewriterTitle from "../../../components/ui/TypewriterTitle";
import { Session } from "next-auth";
import SignInButton from "../../../components/SignInButton";
import { NavigationMenuTab } from "./ui/navigation-menu";

import { useTheme } from "next-themes";

import Link from "next/link"
import { cn } from "@/lib/utils"


export const Heading = ({ session } : {session : Session | null}) => {
  const theme = useTheme()
  const isDark = theme.theme === "dark"

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Information, Your Definition. All in one place. Learn and Play with <span className="underline"> Memoize </span>
      </h2>

      <h4 className={cn("text-base sm:text-xl md:text-2xl font-medium bg-gradient-to-r from-blue-200 to-green-200 rounded-md", isDark && " from-blue-200 to-violet-200")}>
        Memoize is a flashcard game app <br/> that allows you to create your own flashcards and play with them.
      </h4>
      <div className="text-blue-400 sm:text-xl md:text-2xl">
        <TypewriterTitle /> 
      </div>

      { !session?.user  && (
        <SignInButton text="Sign in" />
       )}
      
      { session?.user  && (
        // <Link href="/dashboard"> 
        //   <Button>
        //     Enter Memoize
        //   <ArrowRight />
        //   </Button> 
        // </Link>
        <div className="flex flex-col items-center">
          <NavigationMenuTab />
        </div>

        
      )}

      
        
      
    </div>

  )
}

