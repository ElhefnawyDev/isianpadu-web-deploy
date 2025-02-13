"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProjectsLogo {
  id: number;
  image: string;
  name: string;
}

interface ProjectsLogosProps {
  projectsLogos: ProjectsLogo[];
}

export function InHouseProjects({ projectsLogos }: ProjectsLogosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // To track transition state

  const handleNext = () => {
    if (isTransitioning) return; // Prevent action if transitioning
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsLogos.length);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 < 0 ? projectsLogos.length - 1 : prevIndex - 1)
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) handleNext(); // Trigger next slide only if not in transition
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex, isTransitioning]);

  const currentProject = projectsLogos[currentIndex];

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false); // Reset transition state after 0.5s to allow another transition
      }, 500); // Set timeout equal to transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <Card className="w-[199px] h-[152px] rounded-2xl shadow-lg relative p-4 flex flex-col items-center justify-center">
      {/* Card Header */}
      <CardHeader className="absolute top-0 left-0">
        <CardTitle className="font-bold text-sm text-[#141414]">
          Our Products
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent
        className={`flex items-center mt-10 justify-between gap-4 px-4 py-2 transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 transform translate-x-10"
            : "opacity-100 transform translate-x-0"
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-[#2253e4] hover:bg-[#1a3fb3] text-white transition-colors"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {/* Logo & Name Section */}
        <div className="flex flex-row items-center">
          {/* Client Logo */}
          <div className="w-16 h-16 rounded-full border-2 border-[#2253e4] flex items-center justify-center overflow-hidden">
            <img
              src={currentProject.image}
              alt={currentProject.name || `Client ${currentProject.id}`}
              className="w-full h-full object-fill"
            />
          </div>

          {/* Client Name */}
          <p className="text-sm font-medium text-[#141414]">
            {currentProject.name}
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-[#2253e4] hover:bg-[#1a3fb3] text-white transition-colors"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </CardContent>
    </Card>
  );
}
