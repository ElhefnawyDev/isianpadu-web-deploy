"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Map from "./Map";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
        reset();
      } else {
        setResponseMessage(
          "Failed to send your message. Please try again later."
        );
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Get in <span className="text-red-500">Touch</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("phone", { required: "Phone number is required" })}
              placeholder="Phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "SEND"}
          </button>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-blue-500">{responseMessage}</p>
        )}
      </div>
      <div className="md:w-1/2">
        <Map />
      </div>
    </div>
  );
};

export default ContactForm;
