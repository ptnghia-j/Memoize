import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";

import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { collectionId: string, attachmentId: string } }
) {
  try {
    const session = await getAuthSession();

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

    const attachment = await prisma.attachment.delete({
      where: {
        collectionId: params.collectionId,
        id: params.attachmentId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
