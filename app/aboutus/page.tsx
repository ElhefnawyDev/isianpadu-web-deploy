import CompanyIntroduction from "./components/CompanyIntro";
import HeroSection from "../experience/components/ui/HeroSection";
import MissionVision from "./components/VisionMission";
// import { Di } from "@/components/profile-card";
import React from "react";
import ProgressStat from "./components/Directors";
import Footer from "../home/components/footer";
import RedLine from "../home/components/RedLine";
import { ProfileCard } from "./components/ProfileCard";
import prisma from "@/prisma/client";
import anniversary from "../assets/21years_anniversary.png";
const directors = [
  {
    name: "Dr. Ted Suen MH",
    title: "President",
    imageSrc: "/placeholder.svg",
    bio: `Dr. Ted Suen MH is a highly esteemed senior technology executive with over 25 years of experience in IT leadership, digital transformation, and strategic management. As the President of LPS, he leverages his extensive expertise in system integration, cybersecurity, IT governance, and infrastructure development. Prior to LPS, Dr. Suen served as the Executive Director of Digital Mobility and CTO of the NEOM Land Mobility Department – Saudi Arabia's globally renowned mega city project. Dr. Suen notably spent a decade as the CIO of MTR Corporation Limited, where he spearheaded digital transformation initiatives and managed highly intricate global IT operations. His career also includes executive roles at EDSHP and PCCW.

Dr. Suen holds a Doctor of Business Administration from the SBS Swiss Business School and a Master's Degree in Professional Accounting from Charles Sturt University. His contributions to the IT industry have earned him numerous prestigious awards, including the China Top 5 CIO Award, the China Best Value CIO Award, and the Medal of Honor by the HKSAR government for his contributions to local ICT talent cultivation and development in 2020. He was the President of the Hong Kong Computer Society from 2017 to 2021. His proven track record in commercializing technology solutions and leading high-performing teams make him an invaluable asset in the ever-evolving tech landscape.`,
  },
  {
    name: "Dr. Ted Suen MH",
    title: "President",
    imageSrc: "/placeholder.svg",
    bio: `Dr. Ted Suen MH is a highly esteemed senior technology executive with over 25 years of experience in IT leadership, digital transformation, and strategic management. As the President of LPS, he leverages his extensive expertise in system integration, cybersecurity, IT governance, and infrastructure development. Prior to LPS, Dr. Suen served as the Executive Director of Digital Mobility and CTO of the NEOM Land Mobility Department – Saudi Arabia's globally renowned mega city project. Dr. Suen notably spent a decade as the CIO of MTR Corporation Limited, where he spearheaded digital transformation initiatives and managed highly intricate global IT operations. His career also includes executive roles at EDSHP and PCCW.

Dr. Suen holds a Doctor of Business Administration from the SBS Swiss Business School and a Master's Degree in Professional Accounting from Charles Sturt University. His contributions to the IT industry have earned him numerous prestigious awards, including the China Top 5 CIO Award, the China Best Value CIO Award, and the Medal of Honor by the HKSAR government for his contributions to local ICT talent cultivation and development in 2020. He was the President of the Hong Kong Computer Society from 2017 to 2021. His proven track record in commercializing technology solutions and leading high-performing teams make him an invaluable asset in the ever-evolving tech landscape.`,
  },
  {
    name: "Dr. Ted Suen MH",
    title: "President",
    imageSrc: "/placeholder.svg",
    bio: `Dr. Ted Suen MH is a highly esteemed senior technology executive with over 25 years of experience in IT leadership, digital transformation, and strategic management. As the President of LPS, he leverages his extensive expertise in system integration, cybersecurity, IT governance, and infrastructure development. Prior to LPS, Dr. Suen served as the Executive Director of Digital Mobility and CTO of the NEOM Land Mobility Department – Saudi Arabia's globally renowned mega city project. Dr. Suen notably spent a decade as the CIO of MTR Corporation Limited, where he spearheaded digital transformation initiatives and managed highly intricate global IT operations. His career also includes executive roles at EDSHP and PCCW.

Dr. Suen holds a Doctor of Business Administration from the SBS Swiss Business School and a Master's Degree in Professional Accounting from Charles Sturt University. His contributions to the IT industry have earned him numerous prestigious awards, including the China Top 5 CIO Award, the China Best Value CIO Award, and the Medal of Honor by the HKSAR government for his contributions to local ICT talent cultivation and development in 2020. He was the President of the Hong Kong Computer Society from 2017 to 2021. His proven track record in commercializing technology solutions and leading high-performing teams make him an invaluable asset in the ever-evolving tech landscape.`,
  },
];
const AboutUs = async () => {
  const vision = await prisma.visionMission.findFirst({ where: { id: 1 } });
  const mision = await prisma.visionMission.findFirst({ where: { id: 3 } });
  const directors = await prisma.teamOrDirectors.findMany();
  const aboutHeader = await prisma.headerHome.findFirst({
    where: {
      opacity: "4",
    },
  });
  return (
    <div>
      <HeroSection
        title={aboutHeader!.title}
        description={aboutHeader!.description}
        imageSrc={aboutHeader!.image}
      />
      <CompanyIntroduction />
      <MissionVision
        missionDescription={mision!.description}
        visionDescription={vision!.description}
      />
      {/* <ProgressStat/> */}
      <div className="container px-4 md:px-6 mt-12 mx-auto">
        <h2 className="mb-4 text-Start text-3xl font-bold tracking-tighter sm:text-4xl">
          Directors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {directors.map((director) => (
            <ProfileCard
              key={director.id}
              name={director.name}
              title={director.position}
              imageSrc={director.image}
              bio={director.bio} // Add other props explicitly if needed
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <RedLine />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
