import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  console.log(title, description);
  await connectMongoDB();
  await Post.create({ title, description });
  return NextResponse.json({ message: "Post Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const posts = await Post.find();
  return NextResponse.json({ posts });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
