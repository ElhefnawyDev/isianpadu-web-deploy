"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import prisma from "@/prisma/client";

// Simulated placeholder data if Prisma is not available on the client side.
const testimonials = [
  {
    id: 1,
    logo: "/placeholder.svg",
    description:
      "Lörem ipsum astrobel sar direlig. Kronde est konfoni med kelig.",
    title: "Ministry of Health",
    date: "12/12/2025",
  },
  {
    id: 2,
    logo: "/placeholder.svg",
    description:
      "Lörem ipsum astrobel sar direlig. Kronde est konfoni med kelig.",
    title: "Ministry of Education",
    date: "12/12/2025",
  },
  {
    id: 3,
    logo: "/placeholder.svg",
    description:
      "Lörem ipsum astrobel sar direlig. Kronde est konfoni med kelig.",
    title: "Ministry of Finance",
    date: "12/12/2025",
  },
];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState(testimonials); // Default fallback data
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch experiences from the server side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/experiences"); // Use an API route to fetch data
        const data = await res.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [experiences.length]); // Ensures it resets correctly if `experiences` updates

  return (
    <section className="w-full overflow-hidden bg-background py-44 items-center justify-center  max-sm:py-20">
      <div className="flex flex-col items-center gap-6 text-center mx-auto">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Experience</h2>
        </div>
        <p className="mt-4 max-w-6xl mx-auto text-center text-lg leading-relaxed text-muted-foreground max-sm:px-5">
          Stay updated with the latest news and events from Isianpadu. Explore
          our milestones, project launches, and participation in industry events
          as we continue to drive innovation and success.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative mt-12 max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 hidden md:flex"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 hidden md:flex"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>

        {/* Testimonial Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex % experiences.length) * 100
              }%)`,
            }}
          >
            {experiences.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="flex flex-col items-center gap-10">
                  <Image
                    src={testimonial.logo}
                    alt={`${testimonial.title} Logo`}
                    width={92}
                    height={72}
                    className="mx-auto"
                  />
                  <div className="text-center">
                    <p className="text-2xl leading-relaxed mb-10 max-sm:px-4">
                      {testimonial.description
                        .split(" ")
                        .slice(0, 30)
                        .join(" ")}
                      {testimonial.description.split(" ").length > 30 && "..."}
                    </p>

                    <div className="flex flex-col items-center gap-1">
                      <h3 className="font-bold text-xl">{testimonial.title}</h3>
                      <p className="text-l">{testimonial.date}</p>
                    </div>
                  </div>
                  <a href="/experience">
                    <button className="w-40 h-12 bg-[#0A40E1] shadow-lg rounded-full text-white font-medium mt-8 hover:bg-[#0A40E1]/90 transition">
                      Learn More
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
