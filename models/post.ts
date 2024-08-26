// This file will contain the mongoose schema for the Post model.
import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,  // Store the image URL
    userId: {
      type: Schema.Types.ObjectId,  // Store the user's ID
      ref: 'User',  // Reference the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;


