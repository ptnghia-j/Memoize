import React from 'react'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import { File, LayoutDashboard, ListChecks, Share } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import { CategoryForm } from './_components/category-form'
import { ShareForm } from './_components/share-form'
import { AttachmentForm } from './_components/attachment-form'
import { FlashcardForm } from './_components/flashcard-form'

const CollectionIdPage = async ({params} : {
  params: { collectionId : string}
}) => {
  
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const collection = await prisma.collection.findUnique({
    where: {
      id: params.collectionId,
      userId: session?.user.id,
    },
    include: {
      flashcards: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        }
      }
    }
  })

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    }
  });
  

  if (!collection) {
    return redirect("/")
  }

  const requiredFields = [
    collection.title,
    collection.description,
    collection.imageUrl,
    collection.categoryId,
    collection.flashcards.some(flashcard => flashcard.isPublished),
  ];

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const progress = `(${completedFields}/${totalFields})`

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

          <CategoryForm 
            initialData = { collection }
            collectionId = { collection.id }
            options = { categories.map((category) => ({
              label: category.name,
              value: category.id
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">
                Add flashcards
              </h2>
            </div>
            <div>
              <FlashcardForm 
              initialData = { collection }
              collectionId = { collection.id }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Share} />
              <h2 className="text-xl">
                Share your collection
              </h2>
            </div>
            <div>
              <ShareForm collectionId={collection.id} />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">
              Add any attachments
            </h2>
          </div>
          <AttachmentForm 
            initialData = { collection }
            collectionId = { collection.id }
          />


        </div>

      </div>
    </div>
  )
}

export default CollectionIdPage