
import React from "react";
import { FaEye, FaBullseye } from "react-icons/fa";
import Header from "../Header";
import prisma from "@/prisma/client";
import TeamDirectors from "../Components/AboutUs/TeamDirectors";
import ProgressBar from "../Components/services/ProgressBar";
import Footer from "../Components/Footer";
import { Box, Card, CardBody, Heading, Image, VStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const AboutPage = async () => {
  const progressBar = await prisma.progressBar.findMany();
  const corevalue = await prisma.coreValue.findMany();
  const companyBG = await prisma.companyBackground.findUnique({
    where: {
      id: 1,
    },
  });
  const teamsDirectors = await prisma.teamOrDirectors.findMany();
  const vision = await prisma.visionMission.findUnique({
    where: {
      id: 1,
    },
  });
  const mission = await prisma.visionMission.findUnique({
    where: {
      id: 3,
    },
  });

  return (
    <div className="font-sans">
      {/* Header Section */}
      <Header header={"About Us"} />

      {/* Section with Background Image */}
      <section
        className="relative flex flex-col justify-between h-[500px] md:h-[700px] bg-black animate-gradient w-full" // added w-full to remove extra space
        style={{ backgroundSize: "400% 400%" }}
      >
        <Box position="absolute" inset="0" zIndex="0" opacity={0.5}>
          <Image
            src={companyBG?.Image!}
            alt="header Image"
            objectFit="cover"
            w="100%" // Ensures full width
            h="100%" // Ensures full height
          />
        </Box>

        {/* Text Content */}
        <div className="relative z-10 w-full flex flex-col justify-center items-center h-[100%]">
          <h1 className="w-full self-center font-futura text-center text-[30px] md:text-[70px] capitalize leading-[45px] md:leading-[65px] tracking-[0.04em] text-white">
            Company Background
          </h1>
        </div>
      </section>

      {/* Card Section */}
      <Card borderRadius={10} bg={"#EAEBF3"} w="full" mt={6}>
        <CardBody px={[4, 8, 16]} py={10}>
          <VStack spacing={4} align="stretch">
            <Heading size="2xl" textAlign="center">
              {companyBG?.title}
            </Heading>
            {/* ReactMarkdown with adjusted width */}
            <ReactMarkdown className="prose max-w-full text-justify border-t-2 border-zinc-300 p-5 mt-2">
              {companyBG?.description}
            </ReactMarkdown>

            {/* Vision and Mission Section */}
            <div className="my-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-gray-600 pb-3">
                Vision and Mission
              </h2>
              <div className="w-[30%] border-[1px] border-zinc-400"></div>
            </div>

            <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:space-x-3 space-y-6 lg:space-y-0">
              {/* Vision */}
              <Box className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center w-full lg:w-[45%]">
                <Box className="bg-blue-500 p-4 rounded-full mb-4">
                  <FaEye className="text-white text-3xl" />
                </Box>
                <Heading fontSize="xl" fontWeight="semibold" mb={2}>
                  {vision?.title}
                </Heading>
                <Box w="40px" h="1px" bg="blue.500" mb={4}></Box>
                <p className="text-gray-600 text-justify">
                  {vision?.description}
                </p>
              </Box>

              {/* Mission */}
              <Box className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center w-full lg:w-[45%]">
                <Box className="bg-orange-500 p-4 rounded-full mb-4">
                  <FaBullseye className="text-white text-3xl" />
                </Box>
                <Heading fontSize="xl" fontWeight="semibold" mb={2}>
                  {mission?.title}
                </Heading>
                <Box w="40px" h="1px" bg="orange.500" mb={4}></Box>
                <p className="text-gray-600 text-justify">
                  {mission?.description}
                </p>
              </Box>
            </div>
          </VStack>
        </CardBody>

        {/* Stats Section 1 */}
        <Box className="bg-gradient-to-r from-blue-900 via-purple-600 to-red-500 text-white py-8">
          <Box className="w-full flex flex-wrap justify-center items-center">
            {progressBar.map((progress, index) => (
              <ProgressBar
                key={index}
                title={progress.title}
                present={progress.present}
                number={true}
              />
            ))}
          </Box>
        </Box>

        {/* Stats Section 2 */}
        <Box className="bg-gradient-to-r from-blue-900 via-purple-600 to-red-500 text-white py-8">
          <Box className="w-full flex flex-wrap justify-center items-center">
            {corevalue.map((progress, index) => (
              <ProgressBar
                key={index}
                title={progress.title}
                present={progress.present}
                font={40}
                number={false}
              />
            ))}
          </Box>
        </Box>
      </Card>

      {/* Director’s Profile Section */}
      <div className="my-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-600 pb-3">
          Director&apos;s Profile
        </h2>
        <div className="w-[30%] border-t border-zinc-400"></div>
      </div>

      {/* Directors Section */}
      <Box className="flex flex-col w-full justify-center items-center px-4 md:px-0">
        {teamsDirectors.map((team) => (
          <TeamDirectors
            key={team.id}
            name={team.name}
            position={team.position}
            bio={team.bio}
            image={team.image}
            right={team.id % 2 ? true : false}
          />
        ))}
      </Box>

      {/* Footer Section */}
      <Footer  />
    </div>
  );
};

export default AboutPage;