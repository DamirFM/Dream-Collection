import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Make title required
      trim: true,     // Trim whitespace
    },
    description: {
      type: String,
      required: true, // Make description required
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false, // Store the image URL, not required
    },
    userId: {
      type: Schema.Types.ObjectId,  // Store the user's ID
      ref: 'User',  // Reference the User model
      required: true,
    },
    tags: {
      type: [String], // Array of strings to store tags
      required: false, // Tags are optional
      trim: true,     // Trim whitespace in tags
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
