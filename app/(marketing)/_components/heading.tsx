"use client";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Information, Your Definition. All in one place. Learn and Play with <span className="underline"> Memoize </span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Memoize is a flashcard game app <br/> that allows you to create your own flashcards and play with them.
      </h3>
      <div className="text-blue-400 sm:text-xl md:text-2xl">
        <TypewriterTitle /> 
      </div>
      

      <Button>
        Enter Memoize
        <ArrowRight />
      </Button> 
    </div>

  )
}

