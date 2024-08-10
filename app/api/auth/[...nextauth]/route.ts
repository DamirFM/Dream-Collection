import  connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
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
    callbacks: {
        async signIn({ user, account }) {
            console.log("User",user);
            console.log("Account",account);
            // Code for stoging user data in the database
            // if provider is google and user does not exist in the database
            // then store the user in the database
            // if user exists in the database then return the user
            // if user does not exist in the database then store the user in the database
          if (account.provider === "google") {
            // Extract name and email from the user object by destructuring it
            const { name, email } = user;
            try {
              await connectMongoDB();
              const userExists = await User.findOne({ email });
    
              if (!userExists) {
                const res = await fetch("http://localhost:3000/api/user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                  }),
                });
    
                if (res.ok) {
                  return user;
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
    
          return user;
        },
      },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };