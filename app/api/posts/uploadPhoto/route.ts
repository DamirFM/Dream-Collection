import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Adjust the path if necessary
import multer from "multer";
import User from '@/models/user';
import connectMongoDB from '@/lib/mongodb';

// Set up Multer storage
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Multer middleware to handle the file upload
const uploadMiddleware = upload.single("file");

// Helper to convert NextRequest to Express-like request for multer
const convertNextRequestToExpress = async (req: NextRequest) => {
  const body = await req.body();
  return { ...req, body };
};

// Create a POST handler
export async function POST(req: NextRequest) {
  await connectMongoDB();
  
  const session = await getServerSession({ req, res: null }, authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const expressReq = await convertNextRequestToExpress(req);

  return new Promise((resolve, reject) => {
    uploadMiddleware(expressReq as any, {} as any, async (err) => {
      if (err) {
        return reject(
          NextResponse.json({ message: "File upload error" }, { status: 500 })
        );
      }

      const imagePath = `/uploads/${expressReq.file.filename}`;
      const userId = session.user?.id;

      try {
        const user = await User.findById(userId);
        if (!user) {
          resolve(NextResponse.json({ message: "User not found" }, { status: 404 }));
          return;
        }

        user.image = imagePath;
        await user.save();

        resolve(NextResponse.json({ imageUrl: imagePath }, { status: 200 }));
      } catch (error) {
        reject(
          NextResponse.json(
            { message: "Failed to update user image", error: error.message },
            { status: 500 }
          )
        );
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parsing to use Multer
  },
};
