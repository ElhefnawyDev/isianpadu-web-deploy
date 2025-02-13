import Image from "next/image";
import { Poppins } from "next/font/google";
import SocialIcon from "./components/SocialIcon";
import Partners from "./components/partners";
import { GrowthChart } from "./components/growth-chart";
import { ClientLogos } from "./components/client-logos";
import { ExpertiseSection } from "./components/ExpertiseSection";
import ServicesSection from "./components/services";
import Footer from "./components/footer";
import { CertificateMarquee } from "./components/certificate-marquee";
// import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import MainCard from "./components/CardsCollection/MainCard";
import OtherCards from "./components/CardsCollection/OtherCards";
import { Flex, Box, Text } from "@chakra-ui/react";
import sfaImage from "../assets/SFA_project.png";
import cominSoonImage from "../assets/ComingSoon_Project.png";
import aiChatbotImage from "../assets/AIChatbot_project.png";
import Projects from "./components/Projects";
import NewsEventshp from "./components/NewsEventshp";
import ProgressBarhp from "./components/ProgressBarhp";
import Anni from "../assets/Anniversary.png";
import FQA from "./components/FQA";
import ExperienceSection from "./Experience/experience-section";
import RedLine from "./components/RedLine";
import prisma from "@/prisma/client";
import Link from "next/link";
import { InHouseProjects } from "./components/InHouseProjects";
import FloatingButton from "./components/FloatingButton";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

// Define the structure of the client logo data
interface ClientLogo {
  id: number;
  logo: string;
  name: string;
}
// Define the structure of the client logo data
interface InHouseProjects {
  id: number;
  image: string | null;
  title: string;
}

// Fetch data from Prisma
async function getClientLogos(): Promise<ClientLogo[]> {
  const clientLogos = await prisma.clients.findMany({
    select: {
      id: true,
      logo: true,
      name: true,
    },
  });
  return clientLogos.map((client) => ({
    ...client,
    logo: client.logo ?? "", // Convert null to an empty string
  }));
}
async function getProjectLogos(): Promise<InHouseProjects[]> {
  const projectLogos = await prisma.inHouseProjects.findMany({
    select: {
      id: true,
      image: true, // Ensure this is correctly fetching the image URL
      title: true,
    },
  });
  return projectLogos;
}

export default async function Home() {
  const progress = await prisma.progressBar.findMany();
  const clientLogos = await getClientLogos();
  const projectLogos = await getProjectLogos();
  const certificatesData = await prisma.certificates.findMany();
  const service = await prisma.homeGeneralInfo.findUnique({
    where: {
      id: 1,
    },
  });
  const experience = await prisma.homeGeneralInfo.findUnique({
    where: {
      id: 2,
    },
  });
  const progressbar = await prisma.homeGeneralInfo.findUnique({
    where: {
      id: 3,
    },
  });

  // Transform data into the expected format
  const certificates = certificatesData.map((cert) => ({
    id: cert.id,
    image: cert.image, // Ensure this is a valid URL
    alt: cert.title, // Assuming "title" exists in the DB
    width: 400, // Adjust based on real data
    height: 400,
    description: cert.description,
  }));
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/BG_Circle-cropped.svg')",
          backgroundPosition: "center 90%",
          backgroundSize: "60%",
          backgroundColor: "transparent", // Ensure no additional background color
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
        }}
      >
        <div className="flex absolute max-sm:mt-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[62%] w-full">
          <div className="flex flex-col items-center gap-8 w-full max-w-8xl relative z-10">
            {/* Content Section */}
            <div className="flex flex-wrap 2xl:flex-row flex-col justify-center gap-8 items-center">
              <div className="hidden 2xl:block 2xl:-top-12 relative">
                <InHouseProjects projectsLogos={projectLogos} />
              </div>
              <div className="flex flex-col items-center gap-8 text-center">
                <h1
                  className={`text-4xl md:text-5xl lg:text-[6rem] font-bold tracking-tight ${poppins.className} text-[#2D2D2D]`}
                >
                  ISIANPADU SYSTEMS
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-[#516371] font-satoshi font-regular w-[90%] max-w-xl">
                  With us achieving dreams in building your products, together
                  say <span className="underline">"Yes"</span> to extraordinary
                  projects.
                </p>
              </div>
              <div className="max-sm:hidden 2xl:-top-12 relative">
                <ClientLogos clientLogos={clientLogos} />
              </div>
              <div className="max-sm:block hidden 2xl:-top-12 relative">
              <InHouseProjects projectsLogos={projectLogos} />
              </div>
            </div>

            {/* Services List */}
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#516371] font-satoshi text-sm md:text-lg mt-4">
              <li>• Project Management</li>
              <li>• Turnkey Development</li>
              <li>• System Integration</li>
              <li>• Systems Maintenance</li>
              <li>• IT Consultancy</li>
              <li>
                •{" "}
                <Link href="/services" className="underline font-medium">
                  AND MORE
                </Link>
              </li>
            </ul>

            {/* Button */}
            <a href="/aboutus">
              <button className="w-40 h-12 bg-[#0A40E1] shadow-lg rounded-full text-white font-medium mt-8 hover:bg-[#0A40E1]/90 transition">
                Learn More
              </button>
            </a>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-8">
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

        {/* Partners Section - positioned at the bottom right */}
        <div className="absolute bottom-14 right-0 mt-16 max-sm:-bottom-10 w-full">
          <Partners />
        </div>
      </div>
      <div className="mt-24">
        <ExpertiseSection
          title={experience!.title1}
          name={experience!.title2}
          description={experience!.content}
          image={experience!.image1}
        />
        <div className="relative flex justify-center items-center -mt-20 z-10">
          <ProgressBarhp
            image={progressbar!.image1}
            Title={"Dependable Partner"}
            short_description={
              "Committed to delivering reliability and top-tier service."
            }
            ProgressNo1={progress[0].present}
            ProgressName1={progress[0].title}
            ProgressNo2={progress[1].present}
            ProgressName2={progress[1].title}
            ProgressNo3={progress[2].present}
            ProgressName3={progress[2].title}
            present={""}
            name1={progressbar!.title1}
            title1={progressbar!.title2}
            description1={progressbar!.content}
          />
        </div>
      </div>{" "}
      <ServicesSection
        title={service!.title2}
        name={service!.title1}
        description={service!.content}
        image={service!.image1}
      />
      <Projects />
      <CertificateMarquee certificates={certificates} />;
      <ExperienceSection />
      <NewsEventshp />
      <div className="relative z-10 w-full">
        <div className="absolute bottom-0 left-0 w-full  max-sm:-bottom-20">
          <div className="relative w-full">
            <div className="absolute z-20 w-full -top-36 max-sm:-top-48">
              <FQA
                image={Anni.src}
                Title={"Let us Know How To Help You"}
                short_description={
                  "Explore our FAQ section to find quick and helpful responses to common inquiries about our services, projects, and processes. If you need more details, feel free to contact us directly!"
                }
                ProgressNo1={"40+"}
                ProgressName1={"Active Clients"}
                ProgressNo2={"70+"}
                ProgressName2={"Technical Advisors"}
                ProgressNo3={"200+"}
                ProgressName3={"Completed Projects"}
              />
            </div>
            <div className="w-full">
              <RedLine />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-32 max-sm:pt-56">
        <Footer />
      </div>
      <FloatingButton></FloatingButton>
    </>
  );
}

{
  /* Remaining Sections */
}

{
  /* Wrapper for Overlapping Components */
}

{
  /* <ServicesSection />
      <Projects />
      <CertificateMarquee />
      <ExperienceSection />
      <NewsEventshp /> */
}

{
  /* <div className="relative z-10 w-full">
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative w-full">
            <div className="absolute z-20 w-full -top-36">
              <FQA
                image={Anni.src}
                Title={"Let us Know How To Help You"}
                short_description={
                  "Explore our FAQ section to find quick and helpful responses to common inquiries about our services, projects, and processes. If you need more details, feel free to contact us directly!"
                }
                ProgressNo1={"40+"}
                ProgressName1={"Active Clients"}
                ProgressNo2={"70+"}
                ProgressName2={"Technical Advisors"}
                ProgressNo3={"200+"}
                ProgressName3={"Completed Projects"}
              />
            </div>
            <div className="w-full">
              <RedLine />
            </div>
          </div>
        </div>
      </div>
      <Footer /> */
}
