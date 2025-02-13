import { authOptions } from "../auth"; // This goes up one directory level from [...nextauth] to auth
import NextAuth from "next-auth"; // Importing NextAuth function

// Initializing the NextAuth handler with the authOptions configuration
const handler = NextAuth(authOptions);

// Exporting the handler for GET and POST methods
export { handler as GET, handler as POST };
