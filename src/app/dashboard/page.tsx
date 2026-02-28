import { Navbar } from '@/components/navbar'
import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import CreateFlashCard from './_components/CreateFlashCard'
import HistoryCard from './_components/HistoryCard'
import TrendingTopics from './_components/TrendingTopics'
import RecentActivities from './_components/RecentActivities'
import CreateQuiz from './_components/CreateQuiz'
import GameWorld from './_components/GameWorld'
import { prisma } from '@/lib/db'

type Props = {}

export const metadata = {
  title: 'Dashboard | Memoize',

}

const page = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect('/')
  }

  // Fetch collections for this user
  const collections = await prisma.collection.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { flashcards: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Prepare data for HistoryCard
  const totalCollections = collections.length

  // Prepare data for RecentActivities (top 5)
  const recentCollections = collections.slice(0, 5)

  // Prepare data for WordCloud from collection titles
  // We'll extract words, filter out common stop words, and count frequencies
  const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not'])
  
  const wordFrequencies: Record<string, number> = {}
  collections.forEach(collection => {
    // Split by non-word characters
    const words = collection.title.toLowerCase().split(/\W+/)
    words.forEach(word => {
      if (word && word.length > 2 && !stopWords.has(word)) {
        wordFrequencies[word] = (wordFrequencies[word] || 0) + 1
      }
    })
  })

  const formattedTopics = Object.entries(wordFrequencies)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 20) // Top 20 words

  return (
    <div>
      <Navbar session={session} sidebarVisible={false}/>
      <main className="p-8 mx-auto max-w-7xl">
        <div className="flex items center">
          <h2 className="mr-2 text-3xl font-bold tracking-tighter">Dashboard</h2>
        </div>

        <div className = "grid gap-4 mt-4 md:grid-cols-2">
          <CreateFlashCard />
          <HistoryCard totalCollections={totalCollections} />
        </div>

        <div className = "grid gap-4 mt-4 md:grid-cols-2">
          <CreateQuiz />
          <GameWorld />
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7"> 
          <TrendingTopics formattedTopics={formattedTopics} />
          <RecentActivities recentCollections={recentCollections} />
        </div>

        


      </main>
      
    </div>
  )
}

export default page