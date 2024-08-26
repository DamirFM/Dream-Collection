// app/api/posts/user/route.ts

import connectMongoDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/post';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub; // Get the user's ID from the JWT token
    const posts = await Post.find({ userId }); // Fetch posts specific to the logged-in user

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Error getting posts" }, { status: 500 });
  }
}
