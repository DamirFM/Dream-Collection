import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';

function handleCors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
}

interface Post {
  _id: string;
  title: string;
  description: string;
}

interface PostResponse {
  posts: Post[];
}

interface MessageResponse {
  message: string;
}
// Handle POST requests
export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Post.create({ title, description });

  let response = NextResponse.json<MessageResponse>({ message: 'Post Created' }, { status: 201 });
  handleCors(response);
  return response;
}

// Handle GET requests
export async function GET(request: NextRequest) {
  await connectMongoDB();
  const posts = await Post.find();

  let response = NextResponse.json<PostResponse>({ posts });
  handleCors(response);
  return response;
}

// Handle DELETE requests
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Post.findByIdAndDelete(id);

  let response = NextResponse.json<MessageResponse>({ message: 'Post deleted' }, { status: 200 });
  handleCors(response);
  return response;
}
