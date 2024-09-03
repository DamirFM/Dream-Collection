import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { IUser } from "@/models/interfaces";
// Function to generate a random image name
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

// Check if AWS environment variables are set
if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing AWS configuration");
}

// Initialize the S3 client
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function PUT(request: Request) {
  try {
    await connectMongoDB();

    const { userId, name, email, description, location, file } = await request.json();

    // Correctly typing updates as Partial<IUser>
    const updates: Partial<IUser> = { name, email, description, location };

    // Handle profile image upload if a new image is provided
    if (file) {
      const buffer = Buffer.from(file, "base64");
      const fileName = `${randomImageName()}.jpg`;

      const params = {
        Bucket: bucketName,
        Key: `profile-images/${fileName}`,
        Body: buffer,
        ContentType: "image/jpeg",
      };

      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const profileImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/profile-images/${fileName}`;
        updates.profileImageUrl = profileImageUrl; // Set the URL of the uploaded profile image
      } catch (s3Error) {
        console.error("Error uploading image to S3:", s3Error);
        return NextResponse.json({ message: "Failed to upload image." }, { status: 500 });
      }
    }

    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Profile updated successfully.", 
      user: updatedUser 
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate', // Prevent caching
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "An error occurred while updating the profile." }, { status: 500 });
  }
}

