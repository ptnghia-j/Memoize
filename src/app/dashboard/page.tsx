import { Navbar } from '@/components/navbar'
import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import CreateFlashCard from './_components/CreateFlashCard'
import HistoryCard from './_components/HistoryCard'
import TrendingTopics from './_components/TrendingTopics'
import RecentActivities from './_components/RecentActivities'

type Props = {}

export const metadata = {
  title: 'Dashboard | Memoize',

}

const page = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect('/')
  }
  return (
    <div>
      <Navbar session={session} sidebarVisible={false}/>
      <main className="p-8 mx-auto max-w-7xl">
        <div className="flex items center">
          <h2 className="mr-2 text-3xl font-bold tracking-tighter">Dashboard</h2>
        </div>

        <div className = "grid gap-4 mt-4 md:grid-cols-2">
          <CreateFlashCard />
          <HistoryCard />

        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7"> 
          <TrendingTopics />
          <RecentActivities />

        </div>

      </main>
      
    </div>
  )
}

export default page