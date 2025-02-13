import React, { useEffect, useState } from "react";
import border from "./assets/HeaderBorder.png";
import headerOverlay from "./assets/HeaderOverlay.png";
import { Box, Image } from "@chakra-ui/react";
import RedLine from "./home/components/RedLine";
import prisma from "@/prisma/client";

interface Props {
  header: string;
}

const Header = async ({ header }: Props) => {
  const pageHeader = await prisma.headerPages.findFirst({
    where: {
      id: 1,
    },
  });

  return (
    <>
      <section
        className="relative flex flex-col justify-between h-[170px] sm:h-[200px] md:h-[200px] lg:h-[252px] bg-gradient-to-r from-headerColor via-[#202fb4] to-[#7e000d] animate-gradient "
        style={{ backgroundSize: "400% 400%" }}
      >
        {/* Background image with absolute positioning */}

        <Box
          position="absolute"
          inset="0"
          zIndex="0"
          opacity={parseInt(pageHeader?.opacity!) / 100}
        >
          <Image
            src={pageHeader?.image!}
            alt="header Image"
            objectFit="cover" // Ensures the image doesn't stretch and covers the area properly
            w="100%" // Ensures the image covers the full width
            h="100%" // Ensures the image covers the full height
          />
        </Box>

        {/* Content to appear on top of the image */}
        <div className="relative z-10 flex flex-col justify-center items-start h-[100%]">
          <h1 className=" ml-4 sm:ml-20 md:ml-20 lg:ml-20 font-futura text-[40px] md:text-[60px] capitalize leading-[45px] md:leading-[65px] tracking-[0.04em] text-white text-start md:text-left mt-6">
            {header}
          </h1>
        </div>

        {/* Partners and RedLine components */}
        <div className="relative z-10">
          <div className="relative z-0">
            <RedLine />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
