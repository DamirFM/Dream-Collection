import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse, NextRequest } from "next/server";
import { applyCors } from '@/lib/cors';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}