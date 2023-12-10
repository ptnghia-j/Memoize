"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Collection } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Collection;
  collectionId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { 
    message: "Description is required" }),
});

export const ImageForm = ({ initialData, collectionId} : ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/collections/${collectionId}`, values);
      toast.success("Collection updated");
      toggleEdit();
      router.refresh();
    }
    catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-cneter justify-between">
        Collection Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && 
            (<>Cancel</>) 
          }

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
                Add Image
            </>
          )}

          {!isEditing && initialData.imageUrl && 
            (<>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>)
          }
        </Button>
      </div>

      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
             />
            Current Image
          </div>
        )
      )}

      {isEditing && (
        <div>
          <FileUpload 
            endpoint="collectionImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs test-muted-foreground mt-4">
            Add a cover image to your collection
          </div>
        </div>

        
      )}
    </div>
  )
}

