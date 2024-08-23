import connectMongoDB from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';
// import multer from 'multer';
// import { promises as fs } from 'fs';
// import path from 'path';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

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

async function uploadFileToS3(file: Buffer, fileName: any) {

	const fileBuffer = file;
	console.log(fileName);

	const params = {
		Bucket: bucketName,
		Key: `${fileName}-${new Date().getTime()}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	return `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
}

export async function POST(request: { formData: () => any; }) {
	try {
		await connectMongoDB();
		const formData = await request.formData();
		const title = formData.get("title");
		const description = formData.get("description");
		const file = formData.get("file");

		if(!file || !title || !description) {
			return NextResponse.json( { error: "All fields are required."}, { status: 400 } );
		} 

		const buffer = Buffer.from(await file.arrayBuffer());
		const imageUrl = await uploadFileToS3(buffer, file.name);

		// Create a new post with the image URL
		const newPost = new Post({
		title,
		description,
		imageUrl,
		});

		await newPost.save();

		return NextResponse.json({ success: true, post: newPost });
	} catch (error) {
    console.error("Error uploading post:", error);
		return NextResponse.json({ error: "Error uploading post" }, { status: 500 });
	}
}


// Handle GET requests
export async function GET() {
	try {
	  await connectMongoDB();
	  
	  const posts = await Post.find();  // Fetch all posts from MongoDB
	  
	  return NextResponse.json({ posts });
	} catch (error) {
	  console.error("Error fetching posts:", error);
	  return NextResponse.json({ error: "Error getting post " }, { status: 500 });
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
	
	// Find the post to delete so you can get the image URL
	const post = await Post.findById(id);
  
	if (!post) {
	  return NextResponse.json({ message: "Post not found" }, { status: 404 });
	}
  
	// Delete the image from S3
	if (post.imageUrl) {
	  const key = post.imageUrl.split('/').pop(); // Extract the S3 key from the imageUrl
	  try {
		await deleteFileFromS3(key!); // Delete from S3
	  } catch (err) {
		console.error("Error deleting image from S3:", err);
		return NextResponse.json({ error: "Error deleting image from S3" }, { status: 500 });
	  }
	}
  
	// Delete the post from the database
	await Post.findByIdAndDelete(id);
  
	return NextResponse.json({ message: "Post and image deleted successfully" }, { status: 200 });
  }
