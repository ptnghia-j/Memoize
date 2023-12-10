import React from 'react'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'

const CollectionIdPage = async ({params} : {
  params: { collectionId : string}
}) => {
  
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const collection = await prisma.collection.findUnique({
    where: {
      id: params.collectionId
    }
  })

  if (!collection) {
    return redirect("/")
  }

  const requiredFields = [
    collection.title,
    collection.description,
    collection.imageUrl,
    collection.categoryId
  ];

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const progress = `(${completedFields}/${totalFields})`
  const text = collection.description;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Creating a new collection
          </h1>
          <span className="text-sm text-slate-700">
            Complete collection details to start adding cards. Progress {progress}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-l">
              Collection details
            </h2>
          </div>

          <TitleForm 
            initialData = { collection }
            collectionId = { collection.id }
          />
          
          <DescriptionForm 
            initialData = { collection }
            collectionId = { collection.id }
          />

          <ImageForm 
            initialData = { collection }
            collectionId = { collection.id }
          />
        </div>

      </div>
    </div>
  )
}

export default CollectionIdPage