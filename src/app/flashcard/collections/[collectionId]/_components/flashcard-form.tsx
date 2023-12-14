"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Flashcard, Collection } from "@prisma/client";
import { FlashcardsList } from "./flashcard-list";

interface FlashcardFormProps {
  initialData: Collection & { flashcards: Flashcard[] };
  collectionId: string;
}

const formSchema = z.object({
  term: z.string().min(1, {
    message: "Term is required",
  }),
  description: z.string().min(1, { 
    message: "Description is required" }),
});

export const FlashcardForm = ({ initialData, collectionId} : FlashcardFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: "",
      description: initialData?.description || ""
    }
  })

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/collections/${collectionId}/flashcards`, values);
      toast.success("Flashcard created");
      toggleCreating();
      router.refresh();
    }
    catch {
      toast.error("Something went wrong")
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/collections/${collectionId}/flashcards/reorder`, {
        list: updateData
      });
      toast.success("Flashcard reordered");
      router.refresh();
    }
    catch {
      toast.error("Something went wrong")
    }
    finally {
      setIsUpdating(false);
    }
  }
  const onEdit = (id: string) => {
    router.push(`/flashcard/collections/${collectionId}/flashcards/${id}`)
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-cneter justify-between">
        Collection flashcards
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (<>Cancel</>) : 
            (<>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a flashcard
            </>)
          }
        </Button>
      </div>


      {isCreating && (
        <Form {...form}>
          <form
            onSubmit = {form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control = {form.control}
              name = "term"
              render = {({field}) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled = {isSubmitting}
                      placeholder = "Name the term on the front of the card"
                      {...field}
                    />

                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              control = {form.control}
              name = "description"
              render = {({field}) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled = {isSubmitting}
                      placeholder = "Give the definition for the term on the back of the card"
                      {...field}
                    />

                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
              <Button 
                disabled = {isSubmitting || !isValid}
                type = "submit"
              >
                Create
              </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          initialData.flashcards.length === 0 && "text-slate-500 italic"
        )}>
          {!initialData.flashcards.length && "No flashcards yet"}
          <FlashcardsList
            onEdit = {onEdit}
            onReorder = {onReorder}
            items={initialData.flashcards || []}
          />
        </div>
      )}

      {isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Reorder the flashcards by dragging them
        </p>
      )}
    </div>
  )
}

