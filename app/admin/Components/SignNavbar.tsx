import React from "react";
import { Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <div className="bg-zinc-200  border-b py-2 z-10 border-zinc-200  fixed text-black w-full top-0">
      <ChakraProvider>
        <Link href="/sign-in" passHref>
          <Button colorScheme="blue">Login</Button>
        </Link>
        <Link href="/sign-up" passHref>
          <Button colorScheme="blue" ml={1000}>
            Register
          </Button>
        </Link>
      </ChakraProvider>
    </div>
  );
};

export default AuthNavbar;
