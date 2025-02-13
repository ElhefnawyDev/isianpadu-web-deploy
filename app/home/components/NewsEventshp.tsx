import React from "react";
import MainCard from "./CardsCollection/MainCard";
import OtherCards from "./CardsCollection/OtherCards";
import { Flex, Box, Text } from "@chakra-ui/react";
import sfaImage from "../../assets/SFA_project.png";
import cominSoonImage from "../../assets/ComingSoon_Project.png";
import aiChatbotImage from "../../assets/AIChatbot_project.png";
import prisma from "@/prisma/client";

const NewsEventshp = async () => {
  const largestNewsEvent = await prisma.newsEvents.findMany({
    orderBy: {
      id: "desc",
    },
  });
  

  return (
    <Box mx={{ base: "20px", md: "50px", lg: "100px", xl: "150px", '2xl':"200px" }} py="100px" >
      {/* Title Section */}
      <Box textAlign="center" mb={{ base: 8, lg: 12 }}>
        <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
          News & Events
        </Text>
        <p className="mt-4 max-w-6xl mx-auto text-center text-lg leading-relaxed text-muted-foreground">
          Stay updated with the latest news and events from Isianpadu. Explore
          our milestones, project launches, and participation in industry events
          as we continue to drive innovation and success.
        </p>
      </Box>

      {/* Cards Section */}
      <Flex
        direction={{ base: "column", '2xl': "row" }} // Stack vertically on small screens, row on larger screens
        gap={{ base: 8, lg: 12 }}
        alignItems="stretch"
        width="100%"
        height={{base: "1000px"}} // Maintain fixed height for the main card
      >
        {/* Left - Main Card */}
        <Box
          flex={{ base: "1", lg: "1.5" }}
          height="700px" // Maintain fixed height for the main card
        >
          <MainCard
            Title={largestNewsEvent[0]!.title}
            short_description={largestNewsEvent[0]!.short_description}
            image={largestNewsEvent[0]!.image}
            id={0}
            link="news&events"
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
            Title={largestNewsEvent[1]!.title}
            short_description={largestNewsEvent[1]!.short_description}
            image={largestNewsEvent[1]!.image}
            id={1}
          />
          <OtherCards
            Title={largestNewsEvent[2]!.title}
            short_description={largestNewsEvent[2]!.short_description}
            image={largestNewsEvent[2]!.image}
            id={2}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewsEventshp;
