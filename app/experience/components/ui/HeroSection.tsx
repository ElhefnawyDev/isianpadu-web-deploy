import React from "react";
import SocialIcon from "@/app/home/components/SocialIcon";
import ExperiencePage from "./ExpeirencePage";
import RedLine from "@/app/home/components/RedLine";
import { Image } from "@chakra-ui/react";
interface HeroSectionProps {
  title: string;
  description: string;
  imageSrc: string;
}

const socialmedia = [
  {
    href: "https://www.instagram.com/isianpadu.cx",
    src: "/media/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://x.com/isianpadu_sales",
    src: "/media/x.svg",
    alt: "Twitter",
  },
  {
    href: "https://www.facebook.com/share/1X6AryWj1R/?mibextid=LQQJ4d",
    src: "/media/facebook.svg",
    alt: "Facebook",
    size: 15,
  },
  {
    href: "https://www.linkedin.com/company/isianpadu-systems",
    src: "/media/linkedin.svg",
    alt: "LinkedIn",
  },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  imageSrc,
}) => {
  return (
    <div>
      <div>
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden">
          {/* Background Image */}
          <Image
            src="/BG_Circle-cropped.svg"
            alt="Background"
            position="absolute"
            bottom="-330px" // Moves it 50px lower
            left="50%"
            transform="translateX(-50%)"
            boxSize={{ base: "200px", md: "300px", lg: "1100px" }} // Responsive sizes
            fit="contain"
            zIndex={10}
          />

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-[79px] px-6 lg:px-0 py-12 lg:py-0 w-full lg:w-[1559px] mx-auto z-20">
            {/* Content Wrapper */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[50px] w-full">
              {/* Text Section */}
              <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-[42px] w-full lg:w-[75%]">
                <h1 className="text-[40px] lg:text-[96px] font-montserrat font-medium leading-[1.2] lg:leading-[110px] tracking-[-1px] lg:tracking-[-3px] text-[#2D2D2D] text-center lg:text-left">
                  {title}
                </h1>
                <p className="text-[16px] lg:text-[20px] font-asap font-medium leading-[24px] lg:leading-[28px] text-justify text-[#545454] max-w-full lg:w-[860px]">
                  {description}
                </p>
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-[30px] w-full">
                  <span className="text-[16px] lg:text-[20px] font-inter font-bold text-[#1A1A1A] flex items-center">
                    Follow us on →
                  </span>
                  <div className="flex gap-4 lg:gap-6">
                    {socialmedia.map((icon, index) => (
                      <SocialIcon
                        key={index}
                        href={icon.href}
                        src={icon.src}
                        alt={icon.alt}
                        size={icon.size}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Image Section */}
              <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
                <Image
                  src={imageSrc}
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RedLine></RedLine>
    </div>
  );
};

export default HeroSection;
