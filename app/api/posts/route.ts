import connectMongoDB from '@/lib/mongodb';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';

// Function to handle CORS headers
function handleCors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this as needed for security
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
}

// Handle POST requests
export async function POST(request: NextRequest) {
  let response = NextResponse.json({ message: 'Post Created' }, { status: 201 });
  handleCors(response);

  const { title, description } = await request.json();
  await connectMongoDB();
  await Post.create({ title, description });
  return response;
}

// Handle GET requests
export async function GET(request: NextRequest) {
  let response = NextResponse.json({ posts: [] });
  handleCors(response);

  await connectMongoDB();
  const posts = await Post.find();
  response = NextResponse.json({ posts });
  return response;
}

// Handle DELETE requests
export async function DELETE(request: NextRequest) {
  let response = NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  handleCors(response);

  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return response;
}
