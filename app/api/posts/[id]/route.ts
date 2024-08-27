import connectMongoDB from '@/lib/mongodb';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
export const dynamic = 'force-dynamic';
// Utility function to generate a random image name
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// AWS S3 configuration
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing AWS configuration");
}

// S3 Client
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  }
});

// Function to upload a file to S3
async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;
  const params = {
    Bucket: bucketName,
    Key: randomImageName() + fileName,
    Body: fileBuffer,
    ContentType: "image/jpg"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
}

// Function to delete a file from S3
async function deleteFileFromS3(key: string) {
  const params = { Bucket: bucketName, Key: key };
  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}

// PUT handler for updating a post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();
    
    const formData = await request.formData();
    const newTitle = formData.get("title")?.toString();
    const newDescription = formData.get("description")?.toString();
    const file = formData.get("file");

    // Fetch the current post
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update title and description
    post.title = newTitle || post.title;
    post.description = newDescription || post.description;

    // Handle file update
    if (file && file instanceof File) {
      // If there's an existing image, delete it from S3
      if (post.imageUrl) {
        const key = post.imageUrl.split('/').pop(); // Extract the S3 key from the imageUrl
        await deleteFileFromS3(key!);
      }

      // Upload the new image to S3
      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadFileToS3(buffer, file.name);
      post.imageUrl = imageUrl;
    }

    // Save the updated post to the database
    await post.save();

    return NextResponse.json({ message: "Post updated successfully", post }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}
