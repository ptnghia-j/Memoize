"use client";

import TypewriterTitle from "../../../components/ui/TypewriterTitle";
import { Session } from "next-auth";
import SignInButton from "../../../components/SignInButton";
import { NavigationMenuTab } from "./ui/navigation-menu";
import { HiSparkles } from "react-icons/hi2";

export const Heading = ({ session } : {session : Session | null}) => {
  return (
    <div className="max-w-4xl space-y-6 animate-fade-in-up">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium 
        bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 
        border border-emerald-100 dark:border-emerald-800/50 animate-fade-in-up">
        <HiSparkles className="w-4 h-4" />
        Your all-in-one learning companion
      </div>

      {/* Main headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up-delay-1">
        Learn Smarter.{" "}
        <span className="gradient-text">Play Better.</span>
        <br />
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground font-semibold">
          All in one place with Memoize.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-2">
        Create flashcards, explore a pixel-art game world, and generate AI images — 
        all designed to make studying engaging and fun.
      </p>

      {/* Typewriter */}
      <div className="text-blue-500 dark:text-blue-400 text-lg md:text-xl font-medium animate-fade-in-up-delay-2">
        <TypewriterTitle /> 
      </div>

      {/* CTA */}
      <div className="animate-fade-in-up-delay-3 pt-2">
        { !session?.user  && (
          <div className="flex flex-col items-center gap-3">
            <SignInButton text="Get Started — It's Free" />
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>
        )}
        
        { session?.user  && (
          <div className="flex flex-col items-center">
            <NavigationMenuTab />
          </div>
        )}
      </div>
    </div>
  )
}
