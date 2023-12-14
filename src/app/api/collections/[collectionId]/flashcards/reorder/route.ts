import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { collectionId: string; } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownCollection = await prisma.collection.findUnique({
      where: {
        id: params.collectionId,
        userId: session?.user.id,
      }
    });

    if (!ownCollection) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await prisma.flashcard.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}