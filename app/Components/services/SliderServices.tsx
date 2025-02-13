// Slider.tsx (Client Component)
"use client";

import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Image, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LoadingPage from "@/app/loading";
// import ProjectManagement from "./ProjectManagementSection";

gsap.registerPlugin(ScrollToPlugin);

interface Service {
  title: string;
  image: string;
  altText?: string;
}

interface SliderProps {
  refs: React.RefObject<HTMLDivElement>[]; // Accept refs as a prop
}
// ServiceCard Component
interface ServiceCardProps {
  title: string;
  imageSrc: string;
  altText: string;
  onLearnMoreClick: () => void; // Function to handle learn more click
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageSrc,
  altText,
  onLearnMoreClick,
}) => {
  return (
    <Box
      position="relative"
      h="64"
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      role="group" // Enables hover effect on child elements
    >
      <Box position="absolute" inset="0">
        <Image
          src={imageSrc}
          alt={altText}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.5s ease" // Smooth transition
          _groupHover={{ transform: "scale(1.1)" }} // Scaling on hover
        />
      </Box>
      <Box position="absolute" inset="0" bg="blackAlpha.500" zIndex="10"></Box>
      <Box position="relative" zIndex="20" textAlign="center" color="white">
        <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
          {title}
        </Text>
        <Text
          fontSize={{ base: "sm", md: "base" }}
          fontWeight="semibold"
          textTransform="uppercase"
          _hover={{ textDecoration: "underline" }}
          cursor="pointer"
          onClick={onLearnMoreClick}
        >
          Learn More &gt;
        </Text>
      </Box>
    </Box>
  );
};

interface SliderProps {
  refrence: number[]; // Change from React.RefObject<HTMLDivElement>[] to number[]
}

const ServiceSlider: React.FC<SliderProps> = ({ refrence }: SliderProps) => {
  const [services, setServices] = useState<
    { id: number; title: string; description: string; image: string }[]
  >([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  const settings = {
    dots: true, // Enable dots
    infinite: false, // Disable infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of slides to show
    slidesToScroll: 4, // Number of slides to scroll at a time
    initialSlide: 0, // Start from the first slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0, // Ensure it starts at the first slide on smaller screens too
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0, // Ensure it starts at the first slide on very small screens
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden pb-8">
      {services.length > 0 ? (
        <Slider {...settings}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              imageSrc={service.image}
              altText={service.title}
              onLearnMoreClick={() => {
                gsap.to(window, {
                  scrollTo: { y: `#section-${refrence[index]}` },
                  duration: 1,
                  ease: "power2.inOut",
                });
              }}
            />
          ))}
        </Slider>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] bg-black">
          {/* Loader Spinner */}
          <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin mb-4"></div>
          {/* Loading Text with animation */}
          <p className="text-xl text-white animate-bounce">Loading...</p>
              
        </div>
      )}
    </div>
  );
};

export default ServiceSlider;
