import  connectMongoDB  from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Register a new user (either via Google or custom credentials)
export async function POST(request: Request) {
  try {
  const { name, email, password, provider } = await request.json();
  await connectMongoDB();
  if (provider === "google") {
  // Handle Google authentication registration
  await User.create({ name, email, provider: "google" });
  } else {
  // Handle custom credentials registration
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword, provider: "credentials" });
  }
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
} catch (error) {
  return NextResponse.json(
    { message: "An error occurred while registering the user." },
    { status: 500 }
  );
}
}

// Get the count of all users
export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users }); // Return the user count
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the users." },
      { status: 500 }
    );
  }
}


// Delete a user by ID
export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the user." },
      { status: 500 }
    );
  }
}