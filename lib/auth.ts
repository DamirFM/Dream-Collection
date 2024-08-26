import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { Account, User as NextAuthUser } from "next-auth";
import  { AuthOptions } from "next-auth";

import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


// Ensure that the environment variables are defined
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google client ID or client secret in environment variables.");
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
          name: "credentials",
          credentials: { email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }},
    
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Email and password are required");
            }
            const { email, password } = credentials;
    
            try {
              await connectMongoDB();
              const user = await User.findOne({ email });
    
              if (!user) {
                return null;
              }
    
              const passwordsMatch = await bcrypt.compare(password, user.password);
    
              if (!passwordsMatch) {
                return null;
              }
    
              return user; // Return user object for session and JWT token
            } catch (error) {
              console.log("Error: ", error);
              return null;
            }
          },
        }),
    ],
    callbacks: {
      async session({ session, token }) {
        console.log("Session callback:", session);
        console.log("Token callback:", token);
        // Include the user ID in the session object
        if (token && session.user) {
          session.user.id = token.sub as string; // Safely assign the id
        }
        return session;
      },
      async jwt({ token, user }) {
        // Store the user id in the JWT token
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
      async signIn({ user, account }: { user: NextAuthUser; account: Account | null }) {
        // Only handle Google sign-in and ensure account is not null
        if (account?.provider === "google") {
          try {
            await connectMongoDB();
            const existingUser = await User.findOne({ email: user.email });
  
            if (!existingUser) {
              // Create a new user in the database if not already present
              await User.create({
                name: user.name,
                email: user.email,
                provider: account.provider,
                image: user.image,
              });
            }
          } catch (error) {
            console.error("Google sign-in error:", error);
            return false; // Return false to prevent the sign-in
          }
        }
  
        return true; // Return true to proceed with the sign-in
      },
    },
    session: {
      strategy: 'jwt', // Use literal type for 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
};