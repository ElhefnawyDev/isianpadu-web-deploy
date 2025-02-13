"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ClientLogo {
  id: number;
  logo: string;
  name: string;
}

interface ClientLogosProps {
  clientLogos: ClientLogo[];
}

export function ClientLogos({ clientLogos }: ClientLogosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clientLogos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? clientLogos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentClient = clientLogos[currentIndex];

  return (
    <Card className="w-[199px] h-[152px] rounded-2xl shadow-lg relative flex flex-col items-center justify-center p-4">
      {/* Card Header */}
      <CardHeader className="absolute top-0 left-0">
        <CardTitle className="font-bold text-sm text-[#141414]">
          Our Clients
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex flex-col items-center justify-center space-y-1 mt-16">
        {/* Logo with Navigation Buttons */}
        <div className="flex items-center space-x-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#2253e4] hover:bg-[#1a3fb3] text-white transition-colors"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Client Logo */}
          <div className="w-16 h-16 rounded-full border-2 border-[#2253e4] bg-white flex items-center justify-center overflow-hidden">
            <img
              src={currentClient.logo}
              alt={currentClient.name || `Client ${currentClient.id}`}
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#2253e4] hover:bg-[#1a3fb3] text-white transition-colors"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Client Name */}
        <p className="text-center font-medium text-[#141414] text-[14px] leading-tight w-[140px] truncate">
          {currentClient.name}
        </p>
      </CardContent>
    </Card>
  );
}
