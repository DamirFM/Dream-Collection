import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse, NextRequest } from "next/server";

import { uploadFileToS3 } from '@aws-sdk/client-s3';

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Post.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

export async function PUT(request: { formData: () => any; }) {
  try {
    await connectMongoDB();
    
    const formData = await request.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    // Find the existing post
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update the title and description
    post.title = title || post.title;
    post.description = description || post.description;

    // If a new file is provided, upload it to S3 and update the image URL
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadFileToS3(buffer, file.name);
      post.imageUrl = imageUrl;
    }

    await post.save();

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: 'Error updating post:'}, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}