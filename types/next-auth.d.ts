import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      _id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profileImageUrl?: string | null; // Add this line
      description?: string | null;
      location?: {
        lat: number | null;
        lng: number | null;
      } | null;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    profileImageUrl?: string | null; // Add this line
    description?: string | null;
    location?: {
      lat: number | null;
      lng: number | null;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    profileImageUrl?: string | null; // Add this line
    description?: string | null;
  }
}
