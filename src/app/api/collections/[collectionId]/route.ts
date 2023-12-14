import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH (
  req: Request, 
  { params }: { params: { collectionId: string } }
) {
  try {
    const session = await getAuthSession();
    const { collectionId } = params;
    const values = await req.json();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const collection = await prisma.collection.update({
      where: {
        id: collectionId,
        userId: session.user.id,
      },
      data: {
        ...values,
      }
      
    });
    return NextResponse.json(collection)
  } 
  catch (error) {
    console.log("[Collections]", error);
    return new NextResponse("Internal Error", { status: 500})
  }
}