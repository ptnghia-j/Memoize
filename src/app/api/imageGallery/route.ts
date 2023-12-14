import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/nextauth';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function POST(
  req: Request
) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!prompt) {
      return new NextResponse("Bad Request. prompt are required", { status: 400 })
    }

    if (!amount) {
      return new NextResponse("Bad Request. amount are required", { status: 400 })
    }

    if (!resolution) {
      return new NextResponse("Bad Request. resolution are required", { status: 400 })
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 5),
      size: resolution
    })
    return NextResponse.json(response.data)

  }
  catch (error) {
    return new NextResponse("[Image error]", { status: 500 })
  }
}