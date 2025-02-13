import prisma from "@/prisma/client";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { Montserrat, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

const Partners = async () => {
  const partners = await prisma.partners.findMany();

  return (
    <div className="relative flex justify-center w-full px-4 sm:px-6 md:px-8 py-8">
      <section className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[80%] bg-white shadow-xl p-4 sm:p-6 relative z-10">
        {/* Container for text and divider */}
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <div
            className={`text-[#2D2D2D] mx-2 font-bold ${montserrat.className} text-lg sm:text-2xl mb-2 sm:mb-0`}
          >
            PARTNERS
          </div>
          <div className="hidden sm:block w-px h-12 bg-zinc-300"></div>
        </div>

        {/* Marquee container */}
        <div className="w-full sm:w-auto overflow-hidden">
          <Marquee gradient={false} speed={40}>
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center items-center mx-2 sm:mx-4">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={100}
                  height={40}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Red line positioned absolutely */}
      <div
        className="absolute top-[30%] w-full h-10 bg-red-600 shadow-red-600"
        style={{
          clipPath: "polygon(0 70%, 100% 70%, 100% 100%, 0% 100%)",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default Partners;
