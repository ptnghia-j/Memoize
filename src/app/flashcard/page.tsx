import { Navbar } from '@/components/navbar'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect('/')
  }
  
  return (
    <Navbar session={session} />
  )
}

export default page