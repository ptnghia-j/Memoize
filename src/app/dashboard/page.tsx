import { Navbar } from '@/components/navbar'
import React from 'react'
import { getAuthSession } from '@/lib/nextauth'

type Props = {}

const page = async (props: Props) => {
  const session = await getAuthSession()
  return (
    <div>
      <Navbar session={session} />
      
    </div>
  )
}

export default page