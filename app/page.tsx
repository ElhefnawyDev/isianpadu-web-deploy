"use client"; // This directive makes sure this component runs on the client side

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13+ if needed

export default function Cart() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to newhome page when the component is mounted
    router.push("/home");
  }, [router]);

  return null; // No need to render anything, just a redirect
}
