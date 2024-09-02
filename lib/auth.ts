import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from 'next-auth';
import  { AuthOptions } from "next-auth";

import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
if (!process.env.NEXTAUTH_URL) {
  throw new Error("NEXTAUTH_URL environment variable is not defined.");
}

const secureCookie = process.env.NEXTAUTH_URL.startsWith('https://');

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
      async signIn({ user, account }: { user: any; account: any }) { // Added explicit type annotation
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
          user.description = existingUser.description;
        }

        return true;
      },
      async session({ session, token }: { session: any; token: any }) { // Added explicit type annotation
        // Include the user ID in the session object
        session.user._id = token.sub as string;
        session.user.description = token.description as string
        return session;
      },
      async jwt({ token, user }: { token: any; user?: any }) { // Added explicit type annotation
        // On initial sign-in, store the MongoDB user ID in the JWT token
        if (user) {
          token.sub = user.id;
          token.description = user.description
        }
        return token;
      },
    },
    session: {
      strategy: 'jwt', // Use literal type for 'jwt'
    },
    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: secureCookie,  // true for production
        },
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
};