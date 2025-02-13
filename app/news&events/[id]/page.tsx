import NewsEventsChild from "@/app/Components/newsEvents/NewsEventsChild";
import Header from "@/app/Header";
import prisma from "@/prisma/client";
import { Card, CardBody, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import noImage from "../../assets/noImage.jpg";
import NewsEventsCard from "@/app/Components/newsEvents/NewsEventsCard";
import Footer from "@/app/home/components/footer";
import RedLine from "@/app/home/components/RedLine";

interface Props {
  params: { id: string };
}

const NewsEventsDetailed = async ({ params }: Props) => {
  const newsEvents = await prisma.newsEvents.findUnique({
    where: { id: parseInt(params.id) },
  });

  const restNewsEvents = await prisma.newsEvents.findMany();
  const filteredNewsEvents = restNewsEvents.filter(
    (event) => event.id !== newsEvents?.id
  );
  if (!newsEvents) notFound();

  const getRandomNewsEvents = (arr: any) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 3); // Return the first 3 items
  };
  const randomNewsEvents = getRandomNewsEvents(filteredNewsEvents);
  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide">
      <Header header={"Events & News"}></Header>
      <NewsEventsChild
        Title={newsEvents.title}
        description={newsEvents.description}
        date={newsEvents.date}
        image={newsEvents.image ? newsEvents.image : noImage.src}
        id={newsEvents.id}
        images={newsEvents.extra_images}
      ></NewsEventsChild>
      <Heading size="xl" alignSelf={"center"} paddingTop={10}>
        Related Events
      </Heading>

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        paddingInline={{ base: "20px", sm: 50, lg: 100, xl: 250 }}
        columnGap={10}
        paddingTop={50}
        spacingX={8}
        spacingY={20}
      >
        {randomNewsEvents.map((newsEvent) => (
          <NewsEventsCard
            key={newsEvent.id}
            Title={newsEvent.title}
            short_description={newsEvent.short_description}
            date={newsEvent.date}
            image={newsEvent.image ? newsEvent.image : noImage.src}
            id={newsEvent.id}
          />
        ))}
      </SimpleGrid>
      <div className="mt-10">
        <RedLine />
        <Footer />
      </div>
    </div>
  );
};

export default NewsEventsDetailed;
