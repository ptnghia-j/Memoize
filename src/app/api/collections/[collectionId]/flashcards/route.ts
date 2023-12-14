import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    const session = await getAuthSession();
    const { term, description } = await req.json();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const collectionOwner = await prisma.collection.findUnique({
      where: {
        id: params.collectionId,
        userId: session?.user.id,
      }
    });

    if (!collectionOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastFlashcard = await prisma.flashcard.findFirst({
      where: {
        collectionId: params.collectionId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastFlashcard ? lastFlashcard.position + 1 : 1;

    const flashcard = await prisma.flashcard.create({
      data: {
        front: term,
        back: description,
        collectionId: params.collectionId,
        position: newPosition,
      }
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.log("[FLASHCARDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}