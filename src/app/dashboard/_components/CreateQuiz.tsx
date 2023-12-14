"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpenCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const CreateQuiz = (props: Props) => {
  const router = useRouter()
  return (
    <Card className="hover:cursor-pointer hover:opacity-70" onClick={() => {
      // router.push('/flashcard')
    } }>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
        <CardTitle className="text-2xl font-bold">Create Quiz</CardTitle>
        <BookOpenCheck size={28} strokeWidth={2.5} />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground"> Test your memory with information from selected flashcards</p>
      </CardContent>

    </Card>
  )
}

export default CreateQuiz