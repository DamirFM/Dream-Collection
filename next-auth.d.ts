import { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id field
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Ensure the User interface also has an id
  }
}
