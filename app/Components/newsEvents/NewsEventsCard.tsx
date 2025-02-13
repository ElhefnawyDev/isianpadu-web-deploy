"use client";
import { Card, CardBody, Heading, Link, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  Title: string;
  short_description: string;
  date: string;
  image: string | null;
  id: number;
}

const NewsEventsCard = ({
  Title,
  short_description,
  date,
  image,
  id,
}: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden" bg={"#EAEBF3"}>
      <div className="relative w-full max-h-[250px] overflow-hidden">
        <Image
          src={image!} // Replace with your image path
          alt="Cropped Image"
          className="object-cover"
        />
      </div>
      <CardBody className="flex flex-col justify-between h-full">
        <div>
          <Text paddingBottom={"2px"} color={"#2B378B"}>
            {date}
          </Text>
          <Heading fontSize={"2xl"}>{Title}</Heading>
          <Text paddingY={"7px"}>{short_description}</Text>
        </div>
        <Link href={`/news&events/${id}`} className="mt-auto">
          <button className="w-40 h-12 bg-[#0A40E1] shadow-lg rounded-full text-white font-medium mt-8 hover:bg-[#0A40E1]/90 transition">
            Rearn More
          </button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default NewsEventsCard;
