import React from "react";
import Header from "../Header";
import ServiceSlider from "../Components/services/SliderServices";
import Frame from "./components/Frame";
import ProjectManagement from "../Components/services/ProjectManagementSection";
import Footer from "../home/components/footer";
import LoadingPage from "../loading";
import prisma from "@/prisma/client";
import networking from "../assets/networking.png";
import HeroSection from "../experience/components/ui/HeroSection";
import networking2 from "../assets/services icons/networking.png";
import ServiceSection from "./components/ServicesSection";
import RedLine from "../home/components/RedLine";
const ServicesPage = async () => {
  const services = await prisma.services.findMany();
  const servicesHeader = await prisma.headerHome.findFirst({
    where: {
      opacity: "1",
    },
  });

  return (
    <div className="font-montserrat">
      <HeroSection
        title={servicesHeader!.title}
        description={servicesHeader!.description}
        imageSrc={servicesHeader!.image}
      />

      <ServiceSlider refrence={services.map((_, index) => index)} refs={[]} />

      <div className="flex flex-col w-full justify-center items-center px-4 md:px-8 lg:px-16">
        {services.map((service, index) => (
          <div id={`section-${index}`} key={service.id || index}>
            <ServiceSection
              service={service}
              isEven={index % 2 === 0}
              titleImage={service.image2}
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <RedLine />
        <Footer />
      </div>
    </div>
  );
};

export default ServicesPage;
