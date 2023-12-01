import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const FlashCardPage = async (props: Props) => {
  return (
    <div className="pl-6">
      <Link href="/flashcard/create">
        <Button>
          Add new card
        </Button>
      </Link>
      
    </div>
    
    
  )
}

export default FlashCardPage