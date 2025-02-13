"use client"; // This tells Next.js that this is a Client Component

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react"; // Import signOut function from next-auth

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/sign-in" })} // Redirect to the homepage after logging out
      rounded={"50"}
      colorScheme="red"
      h={"35px"}
      w={"100px"}
    >
      Logout
    </Button>
  );
}
