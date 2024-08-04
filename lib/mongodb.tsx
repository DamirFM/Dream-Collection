import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1); // Exit the process with an error code
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
  }
};

export default connectMongoDB;
