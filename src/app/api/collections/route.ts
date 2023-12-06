import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST (
  req: Request,
) {
  try {
    const session = await getAuthSession();
    const { title } = await req.json();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const collection = await prisma.collection.create({
      data: {
        title: title,
        userId: session.user.id
      }
    });

    return NextResponse.json(collection)
    
  }
  catch (error) {
    console.log("[Collections]", error);
    return new NextResponse("Internal Error", { status: 500})
  }
}