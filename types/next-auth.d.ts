// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      description?: string | null; // Add description here
      location?: {
        lat: number | null;
        lng: number | null;
      } | null; // Add location here
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    description?: string | null; // Add description here
    location?: {
      lat: number | null;
      lng: number | null;
    } | null; // Add location here
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    description?: string | null; // Add description to JWT type
  }
}
