// import mongoose, { Schema, models } from "mongoose";

// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,  // Password is only required for credentials-based authentication
//       required: false,
//     },
//     provider: {
//       type: String,  // Indicates whether the user signed up via Google, email, etc.
//       required: true,
//     },
//     image: {
//       type: String,  // Store profile picture URL (useful for Google auth)
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// const User = models.User || mongoose.model("User", userSchema);
// export default User;
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,     // Ensure email is unique
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,  // Password is only required for credentials-based authentication
      required: false,
    },
    provider: {
      type: String,  // Indicates whether the user signed up via Google, email, etc.
      required: true,
    },
    image: {
      type: String,  // Store profile picture URL (useful for Google auth)
      required: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
