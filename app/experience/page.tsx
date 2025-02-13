import prisma from "@/prisma/client";
import Footer from "../home/components/footer";
import RedLine from "../home/components/RedLine";
import ExperiencePage from "./components/ui/ExpeirencePage";
import HeroSection from "./components/ui/HeroSection";
import React from "react";

const Experince = async () => {
  const experienceHeader = await prisma.headerHome.findFirst({
    where: {
      opacity: "3",
    },
  });

  return (
    <div>
      <HeroSection
        title={experienceHeader!.title}
        description={experienceHeader!.description}
        imageSrc={experienceHeader!.image}
      />
      <ExperiencePage />
      <div className="mt-10">
        <RedLine />
        <Footer />
      </div>{" "}
    </div>
  );
};

export default Experince;
