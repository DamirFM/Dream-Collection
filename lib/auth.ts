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
    
     
              await connectMongoDB();
              const user = await User.findOne({ email });
    
              if (!user) {
                throw new Error("No user found with this email");
              }
    
              const passwordsMatch = await bcrypt.compare(password, user.password);
    
              if (!passwordsMatch) {
                throw new Error("Invalid credentials");
              }
    
              return user; // Return user object for session and JWT token
       
          },
        }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        await connectMongoDB();

        if (account?.provider === "google") {
          // Check if the user already exists in the database
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user in the database
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
            });
          }

          // Assign the MongoDB user ID to the user object
          user.id = existingUser._id.toString();
        }

        return true;
      },
      async jwt({ token, user }) {
        // On initial sign-in, store the MongoDB user ID in the JWT token
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Include the user ID in the session object
        session.user.id = token.sub as string;
        return session;
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