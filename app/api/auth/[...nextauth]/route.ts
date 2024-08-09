import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Ensure that the environment variables are defined
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    
    throw new Error("Missing Google client ID or client secret in environment variables.");
}

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };