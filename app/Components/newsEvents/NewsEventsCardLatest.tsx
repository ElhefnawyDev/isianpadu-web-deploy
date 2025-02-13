"use client";
import { Box, Card, CardBody, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  Title: string;
  short_description: string;
  date: string;
  image: string;
  id: number;
}

const NewsEventsCardLatest = ({
  Title,
  short_description,
  date,
  image,
  id,
}: Props) => {
  return (
    <Card
      borderRadius={10}
      overflow="hidden"
      w={{ sm: "90%", lg: "74%" }}
      h={{ lg: "500px" }}
      bgImage={`url(${image})`} // Set the image as background
      bgSize="cover" // Make the image cover the card size
      bgPosition="center" // Center the image
      alignSelf={"center"}
      marginTop={12}
      position="relative" // Ensure CardBody is positioned above the background
    >
      <CardBody
        backgroundColor="rgba(255, 255, 255, 0.8)" // Set background with transparency
        borderRadius={10}
        p={6} // Add padding for inner spacing
        position="absolute" // Position CardBody above the background image
        bottom={0} // Align the CardBody to the bottom of the card
        width="100%" // Ensure CardBody takes full width
      >
        <Text color={"#2B378B"} paddingBottom={2}>
          {date}
        </Text>
        <Heading fontSize={"2xl"}>{Title}</Heading>
        <Text paddingY={"15px"}>{short_description}</Text>
        <Link href={`/news&events/${id}`}>
          <button className="w-40 h-12 bg-[#0A40E1] shadow-lg rounded-full text-white font-medium mt-8 hover:bg-[#0A40E1]/90 transition">
            Rearn More
          </button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default NewsEventsCardLatest;
