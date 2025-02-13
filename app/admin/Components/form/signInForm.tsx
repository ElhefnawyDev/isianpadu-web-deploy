"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import React, { useState } from "react"; // Import useState

function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  // Handles the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from reloading the page

    // Extract the form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Send the credentials to the signIn function from NextAuth
    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // To prevent automatic redirection after login
    });

    // Log the response from the signIn function
    console.log(signInData);

    if (signInData?.error) {
      setError("Invalid login credentials. Please try again.");
    } else if (signInData?.ok) {
      // Redirect to the /admin folder after successful login
      router.push("/admin");
    }
  };

  return (
    <div className="items-center justify-cente space-y-10 w-[500px]">
      <form
        className=" p-6 rounded-lg shadow-lg w-full bg-slate-50 bg-opacity-40"
        onSubmit={handleSubmit} // Use handleSubmit here
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-4">
          <input
            name="email"
            className="w-full p-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            className="w-full p-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        {/* Display error if exists */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
