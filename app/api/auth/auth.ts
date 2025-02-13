import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt"; // Import bcrypt (or any library for comparing passwords)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session strategy
  },
  pages: {
    signIn: "/sign-in", // Custom sign-in page (you can change this path)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@mail.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Credentials: ", credentials); // Log credentials for debugging
        if (!credentials) {
          return null;
        }
      
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (!existingUser) {
          console.log("User not found");
          return null; // No user found
        }
      
        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
      
        if (!passwordMatch) {
          console.log("Password mismatch");
          return null; // Password does not match
        }
      
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
};
