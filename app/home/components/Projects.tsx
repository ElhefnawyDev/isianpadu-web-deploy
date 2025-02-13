import React from "react";
import MainCard from "../components/CardsCollection/MainCard";
import OtherCards from "../components/CardsCollection/OtherCards";
import { Flex, Box, Text } from "@chakra-ui/react";
import sfaImage from "../../assets/SFA_project.png";
import cominSoonImage from "../../assets/ComingSoon_Project.png";
import aiChatbotImage from "../../assets/AIChatbot_project.png";
import prisma from "@/prisma/client";

const Projects = async () => {
  const SFA = await prisma.inHouseProjects.findFirst({ where: { title: "SFA 365" }});

  return (
    <Box mx={{ base: "20px", md: "50px", lg: "100px", xl: "150px", '2xl':"200px" }} pt="80px">
      {/* Title Section */}
      <Box textAlign="center" mb={{ base: 8, lg: 12 }}>
        <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
          Successful Project
        </Text>
        <p className="mt-4 max-w-6xl mx-auto text-center text-lg leading-relaxed text-muted-foreground">
          We deliver innovative solutions that drive growth, improve efficiency,
          and empower businesses to achieve their goals effectively and
          sustainably.
        </p>
      </Box>

      {/* Cards Section */}
      <Flex
        direction={{ base: "column", '2xl': "row" }} // Stack vertically on small screens, row on larger screens
        gap={{ base: 8, lg: 12 }}
        alignItems="stretch"
        width="100%"
        height={{base: "950px"}} // Maintain fixed height for the main card
      >
        {/* Left - Main Card */}
        <Box
          flex={{ base: "1", lg: "1.5" }}
          height="700px" // Maintain fixed height for the main card
        >
          <MainCard
            Title={SFA!.title}
            short_description={SFA!.description}
            image={SFA!.image}
            id={SFA!.id}
            lDescription={SFA?.ldescription}
          />
        </Box>

        {/* Right - Other Cards */}
        <Flex
          direction="column"
          gap={{ base: 8, lg: 12 }}
          flex={{ base: "1", lg: "1.7" }}
          height="700px" // Maintain fixed height for the other cards
        >
          <OtherCards
            Title="Multi Agent Sales Bot"
            short_description="Transforming sales strategies with AI-driven bots to enhance engagement and productivity."
            image={aiChatbotImage.src}
            id={1}
          />
          <OtherCards
            Title="ECRM"
            short_description="A cutting-edge project currently under development. Designed to meet evolving business needs and enhance future workflows."
            image={cominSoonImage.src}
            id={2}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Projects;
