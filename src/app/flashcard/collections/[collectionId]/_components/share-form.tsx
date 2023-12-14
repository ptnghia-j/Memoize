"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

interface ShareFormProps {
  collectionId: string;
}

export const ShareForm = ( { collectionId } : ShareFormProps) => {
  const shareUrl = `${window.location.origin}/flashcard/collections/${collectionId}`;
  return (
    <div className="">
      <h3 className="text-md">
          Anyone with this link can view your collection
      </h3>
      <div className="my-4 flex flex-col gap-2 items-center h-full border-b">
        <Input className="w-full" readOnly value={shareUrl} />
        <Button className="mt-2 w-full"
          onClick={ () => 
            navigator.clipboard.writeText(shareUrl)
            .then(() => toast.success("Copied to clipboard"))}
        >
          Copy link
        </Button>
          
        
      </div>
    </div>
    
  )
}

