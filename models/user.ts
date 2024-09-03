import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Only required if using credentials provider
    },
    provider: {
      type: String,
      required: true,
      enum: ['google', 'credentials'], // Restrict to specific values
    },
    image: {
      type: String,
      required: false,
      default: "public/default-profile.jpg", // Add a default image path
    },
    profileImageUrl: {  // field for profile image URL
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "", // Default to empty string if no description is provided
    },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
  },
  { timestamps: true }
);


const User = models.User || mongoose.model("User", userSchema);
export default User;


