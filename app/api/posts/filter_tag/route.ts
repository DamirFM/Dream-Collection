
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// export async function GET(request: NextRequest) {
//   try {
//     await connectMongoDB();

//     const token = await getToken({ req: request });

//     if (!token || !token.sub) {
//       console.error("Token missing or invalid:", token);
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userId = token.sub;
//     const url = new URL(request.url);
//     const tags = url.searchParams.get("tags")?.split(",") || [];

//     let query: any = { userId: mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId };

//     if (tags.length > 0) {
//       query.tags = { $in: tags };
//     }

//     const posts = await Post.find(query);

//     return NextResponse.json({ posts });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json({ error: "Error getting posts" }, { status: 500 });
//   }
// }
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const token = await getToken({ req: request });
    console.log("Token:", token);


    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;
    let query;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      query = { userId: new mongoose.Types.ObjectId(userId) };
    } else {
      query = { userId: userId };
    }

    const posts = await Post.find(query);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Error getting posts" }, { status: 500 });
  }
}