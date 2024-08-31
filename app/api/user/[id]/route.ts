import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// AWS S3 configuration
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

// Helper functions for S3
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

async function uploadFileToS3(file: Buffer, fileName: string) {
  const params = {
    Bucket: bucketName!,
    Key: randomImageName() + fileName,
    Body: file,
    ContentType: "image/jpg"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
}

async function deleteFileFromS3(key: string) {
  const params = { Bucket: bucketName!, Key: key };
  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}

export async function PUT(request: NextRequest) {
  try {
    await connectMongoDB();

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const description = formData.get("description")?.toString();
    const file = formData.get("file");

    const user = await User.findById(token.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.description = description || user.description;

    // Handle file update for profile picture
    if (file && file instanceof File) {
      // If there's an existing image, delete it from S3
      if (user.imageUrl) {
        const key = user.imageUrl.split('/').pop(); // Extract the S3 key from the imageUrl
        if (key) {
          await deleteFileFromS3(key);
        }
      }

      // Upload the new image to S3
      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadFileToS3(buffer, file.name);
      user.imageUrl = imageUrl;
    }

    // Save the updated user details to the database
    await user.save();

    return NextResponse.json({ message: "Profile updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Error updating profile" }, { status: 500 });
  }
}
export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get the total number of users
    const userCount = await User.countDocuments();

    // Return the user count as a JSON response
    return NextResponse.json({ userCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json({ error: "Error fetching user count" }, { status: 500 });
  }
}