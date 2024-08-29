import connectMongoDB from '@/lib/mongodb';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getToken } from 'next-auth/jwt';

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing AWS configuration");
}

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  }
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const params = {
    Bucket: bucketName,
    Key: randomImageName() + fileName,
    Body: file,
    ContentType: "image/jpg"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]"); // Parse tags
    const file = formData.get("file") as File;

    if (!file || !title || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadFileToS3(buffer, file.name);

    const newPost = new Post({
      title,
      description,
      imageUrl,
      userId: token.sub,
      tags, // Include tags in the post creation
    });

    await newPost.save();

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error uploading post:", error);
    return NextResponse.json({ error: "Error uploading post" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const searchParams = request.nextUrl.searchParams;
    const tags = searchParams.getAll("tags"); // Get tags from query params

    const query = tags.length > 0 ? { tags: { $in: tags } } : {}; // Filter posts by tags if provided
    const posts = await Post.find(query);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Error getting posts" }, { status: 500 });
  }
}

// Function to delete file from S3
async function deleteFileFromS3(key: string) {
  const params = { Bucket: bucketName, Key: key };
  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();

  const post = await Post.findById(id);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  if (post.imageUrl) {
    const key = post.imageUrl.split('/').pop();
    try {
      await deleteFileFromS3(key!);
    } catch (err) {
      console.error("Error deleting image from S3:", err);
      return NextResponse.json({ error: "Error deleting image from S3" }, { status: 500 });
    }
  }

  await Post.findByIdAndDelete(id);

  return NextResponse.json({ message: "Post and image deleted successfully" }, { status: 200 });
}
