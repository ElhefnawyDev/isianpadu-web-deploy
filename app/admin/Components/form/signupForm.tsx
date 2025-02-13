"use client";
import React, { useState } from "react";

function SignupForm() {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  // Password validation regex (at least 3 digits)
  const passwordStrengthRegex = /^(?=(.*\d){3,}).*$/;

  // Handles the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submit behavior

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Reset error messages
    setPasswordError("");
    setConfirmPasswordError("");
    setApiResponse("");

    // Validate password strength
    if (!passwordStrengthRegex.test(password)) {
      setPasswordError("Password must contain at least 3 digits.");
      return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // If validation passes, send data to the API
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse("User created successfully.");
      } else {
        setApiResponse(result.message || "Error creating user.");
      }
    } catch (error) {
      setApiResponse("An error occurred while creating the user.");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 w-[500px] bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>
        <div className="mb-4">
          <input
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="password"
            placeholder="Password"
            required
          />
          {passwordError && (
            <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            name="confirmPassword"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="password"
            placeholder="Confirm Password"
            required
          />
          {confirmPasswordError && (
            <p className="text-red-500 mt-1 text-sm">{confirmPasswordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>

        {apiResponse && (
          <p className="mt-4 text-center text-sm text-green-500">
            {apiResponse}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
