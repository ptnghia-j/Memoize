"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import WordCloud from './WordCloud'

type Props = {
  formattedTopics: { text: string; value: number }[];
}

const TrendingTopics = ({ formattedTopics }: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader className="">
        <CardTitle className="text-2xl font-bold"> Trending Topics</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          View cards on one of the trending topics
        </CardDescription>

        <CardContent className=""> 
          <WordCloud formattedTopics={formattedTopics} />
        </CardContent>
        
      </CardHeader>


    </Card>
  )
}

export default TrendingTopics