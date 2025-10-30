
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return new NextResponse('Missing video URL', { status: 400 });
  }

  try {
    const response = await fetch(videoUrl);

    if (!response.ok) {
      return new NextResponse('Failed to fetch video', { status: response.status });
    }

    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'video/mp4');

    return new NextResponse(response.body, {
      headers,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
