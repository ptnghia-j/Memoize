import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
  recentCollections: { id: string; title: string; createdAt: Date; _count: { flashcards: number } }[];
  totalGames?: number;
}

const RecentActivities = ({ recentCollections, totalGames = 0 }: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Recent Activities
        </CardTitle>

        <CardDescription>
          You have created {recentCollections.length} recent collections.
        </CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-scroll">
        <ul className="space-y-4">
          {recentCollections.length === 0 ? (
            <p className="text-muted-foreground text-sm">No recent activities found. Start creating flashcards!</p>
          ) : (
            recentCollections.map((collection) => (
              <li key={collection.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{collection.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {collection._count.flashcards} flashcard(s) • Created on {new Date(collection.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

export default RecentActivities