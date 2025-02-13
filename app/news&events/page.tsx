import React from "react";
import Header from "../Header";
import NewsEventsCard from "../Components/newsEvents/NewsEventsCard";
import test from "../assets/test.jpeg";
import noImage from "../assets/noImage.jpg";
import {
  AbsoluteCenter,
  Box,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import NewsEventsCardLatest from "../Components/newsEvents/NewsEventsCardLatest";
import Pagination from "../Components/Pagination";
import prisma from "@/prisma/client";
import Footer from "../home/components/footer";
import HeroSection from "../experience/components/ui/HeroSection";
import RedLine from "../home/components/RedLine";

const NewsEvents = async () => {
  const newsEvents = await prisma.newsEvents.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const largestNewsEvent = await prisma.newsEvents.findFirst({
    orderBy: {
      date: "desc",
    },
  });
  const eventsHeader = await prisma.headerHome.findFirst({
    where: {
      opacity: "2",
    },
  });
  const filteredNewsEvents = newsEvents.filter(
    (event) => event.id !== largestNewsEvent?.id
  );

  if (largestNewsEvent) {
    // Access the 'id' column (or any other column)
    const largestId = largestNewsEvent.id; // Accessing the 'id' column
    const largestImage = largestNewsEvent.id; // Accessing the 'id' column
    const largestTitle = largestNewsEvent.id; // Accessing the 'id' column
    const largestDes = largestNewsEvent.description; // Accessing the 'id' column
    const largestShortDes = largestNewsEvent.short_description; // Accessing the 'id' column}

    return (
      <div className="flex flex-col overflow-y-scroll scrollbar-hide ">
        <div className="mb-12">
          <HeroSection
            title={eventsHeader!.title}
            description={eventsHeader!.description}
            imageSrc={eventsHeader!.image}
          />
        </div>
        {/* Latest Header */}{" "}
        <NewsEventsCardLatest
          Title={largestNewsEvent.title}
          short_description={largestNewsEvent.short_description}
          date={largestNewsEvent.date}
          image={largestNewsEvent.image ? largestNewsEvent.image : noImage.src}
          id={largestNewsEvent.id}
        ></NewsEventsCardLatest>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          paddingInline={{ base: "20px", sm: 50, lg: 100, xl: 250 }}
          paddingTop={{ base: "0", sm: 50, lg: 100 }}
          spacingX={8}
          spacingY={20}
        >
          {filteredNewsEvents.map((newsEvent) => (
            <NewsEventsCard
              key={newsEvent.id} // Use a unique identifier like id
              Title={newsEvent.title}
              short_description={newsEvent.short_description}
              date={newsEvent.date}
              image={newsEvent.image ? newsEvent.image : noImage.src}
              id={newsEvent.id}
            ></NewsEventsCard>
          ))}
        </SimpleGrid>
        <Box
          position="relative"
          h="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Box>
        <div className="mt-10">
          <RedLine />
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header header={"Events & News"}></Header>
        <div className="flex justify-center w-full h-[500px]">
          <Heading marginTop={"100"} color={"gray"}>
            No news or events posted yet
          </Heading>
        </div>
        <div className="mt-10">
          <RedLine />
          <Footer />
        </div>
      </div>
    );
  }
};
export default NewsEvents;
