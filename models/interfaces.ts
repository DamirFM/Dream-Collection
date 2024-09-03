// Create a new file `models/interfaces.ts` or add in the existing file where interfaces are defined
import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  provider: "google" | "credentials";
  image?: string;
  profileImageUrl?: string;
  description?: string;
  location?: {
    lat?: number;
    lng?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
