import NextAuth, { NextAuthOptions, User, Session,  } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/user"; // Rename to avoid conflict with the imported User type from NextAuth
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt/types";

// Ensure environment variables are defined
if (!process.env.NEXTAUTH_URL) {
  throw new Error("NEXTAUTH_URL environment variable is not defined.");
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google client ID or client secret in environment variables.");
}

const secureCookie = process.env.NEXTAUTH_URL.startsWith('https://');

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;
        await connectMongoDB();
        const user = await UserModel.findOne({ email });

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
    async signIn({ user, account }: { user: User; account: any }) {
      await connectMongoDB();

      if (account?.provider === "google") {
        let existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
          });
        }

        user.id = existingUser._id.toString();
        user.description = existingUser.description;
      }

      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session token:", token);
      if (token && token.sub) {
        session.user._id = token.sub; 
        session.user.description = token.description as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log("Session token:", token);
      if (user) {
        token.sub = user.id;
        token.description = user.description;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
