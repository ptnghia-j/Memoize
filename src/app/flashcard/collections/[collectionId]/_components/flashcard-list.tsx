"use client";

import { Flashcard } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { set } from "zod";

interface FlashcardsListProps {
  items: Flashcard[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};

export const FlashcardsList = ({
  items,
  onReorder,
  onEdit
}: FlashcardsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [flashcards, setFlashcards] = useState(items);

  const [isFlipped, setIsFlipped] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setFlashcards(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(flashcards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedFlashcards = items.slice(startIndex, endIndex + 1);

    setFlashcards(items);

    const bulkUpdateData = updatedFlashcards.map((flashcard) => ({
      id: flashcard.id,
      position: items.findIndex((item) => item.id === flashcard.id)
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="flashcards">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {flashcards.map((flashcard, index) => (
              <Draggable 
                key={flashcard.id} 
                draggableId={flashcard.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      flashcard.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        flashcard.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="grid w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2 p-2">
                      <div className="p-2">
                        {flashcard.front}
                      </div>
                      <div className="p-2">
                        {flashcard.back}
                      </div>
                    </div>
            
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          flashcard.isPublished && "bg-sky-700"
                        )}
                      >
                        {flashcard.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(flashcard.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}