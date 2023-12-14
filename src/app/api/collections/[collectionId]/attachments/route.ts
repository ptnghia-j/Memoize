
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";

export async function POST(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    const session = await getAuthSession()
    const { url } = await req.json();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const collectionOwner = await prisma.collection.findUnique({
      where: {
        id: params.collectionId,
        userId: session?.user.id,
      }
    });
    console.log("collectionOwner", collectionOwner);

    if (!collectionOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        collectionId: params.collectionId,
      }
    });

    return NextResponse.json(attachment);

  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}