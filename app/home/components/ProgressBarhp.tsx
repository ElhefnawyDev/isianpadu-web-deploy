"use client";
import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Eclipse from "../../assets/Ellipse 39.png";
import AnimatedCounter from "@/app/Components/AnimatedCounter";
import prisma from "@/prisma/client";
import { Card } from "../components/ui/card";

interface Props {
  Title: string;
  short_description: string;
  ProgressNo1: string;
  ProgressName1: string;
  ProgressNo2: string;
  ProgressName2: string;
  ProgressNo3: string;
  ProgressName3: string;
  image: string;
  present: string;
  name1: string;
  title1: string;
  description1: string;
}

const ProgressBarhp = ({
  name1,
  title1,
  description1,
  Title,
  short_description,
  ProgressNo1,
  ProgressName1,
  ProgressNo2,
  ProgressName2,
  ProgressNo3,
  ProgressName3,
  image,
  present,
}: Props) => {
  const [fontSize, setFontSize] = useState(49); // Default font size

  // Function to calculate font size based on screen width
  const calculateFontSize = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      // XL screen
      setFontSize(41);
    } else if (width >= 1060) {
      // LG screen
      setFontSize(35);
    } else {
      // MD and smaller
      setFontSize(45);
    }
  };

  useEffect(() => {
    calculateFontSize(); // Initial calculation on component mount
    window.addEventListener("resize", calculateFontSize); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", calculateFontSize); // Cleanup event listener
    };
  }, []);

  return (
    <div className="xl:w-[70%] w-[90%] py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Year Card */}
        <div
          className="relative md:w-1/3 rounded-[32px] p-8 text-white overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0041E8 0%, #E52234 100%)",
          }}
        >
          <div className="relative z-10 space-y-6">
            <p className="text-sm font-light">{name1}</p>
            <div className="w-[60%] xl:w-full">
              <Image src={image} alt="Anniversary" width={"60%"} />
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {title1}
              </div>
              <p className="text-xs sm:text-sm lg:text-base">
                {description1}
              </p>
            </div>
          </div>
          {/* Eclipse Pattern */}
          <div className="absolute top-[40%] w-full h-200 opacity-50">
            <Image src={Eclipse.src} alt="Eclipse Background" />
          </div>
        </div>
        <Card className="md:w-2/3 p-8 rounded-[32px] bg-[#F8F8F8] flex items-center justify-center">
          {/* Trusted Partner & Progress Stats */}
          <div className="flex flex-col md:flex-row gap-8 h-full items-center">
            {/* Trusted Partner Section */}
            <div className="md:w-1/5 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-[27px] font-semibold text-gray-900 mb-2">
                {Title}
              </h2>
              <p className="text-[10px] sm:text-sm lg:text-base text-gray-600">
                {short_description}
              </p>
            </div>

            {/* Progress Stats Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-2 flex flex-col items-center">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-600">
                  <AnimatedCounter
                    fontSize={fontSize}
                    from={0}
                    to={parseInt(ProgressNo1)}
                    suffix="+"
                  />
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">
                  {ProgressName1}
                </div>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-600">
                  <AnimatedCounter
                    fontSize={fontSize}
                    from={0}
                    to={parseInt(ProgressNo2)}
                    suffix="+"
                  />
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">
                  {ProgressName2}
                </div>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-600">
                  <AnimatedCounter
                    fontSize={fontSize}
                    from={0}
                    to={parseInt(ProgressNo3)}
                    suffix="+"
                  />
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">
                  {ProgressName3}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressBarhp;
