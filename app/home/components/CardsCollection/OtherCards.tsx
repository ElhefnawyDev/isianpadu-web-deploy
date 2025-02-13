"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {
  Title: string;
  short_description: string;
  date?: string;
  image: string | null;
  id: number;
}

const OtherCards = ({ Title, short_description, date, image, id }: Props) => {
    // Responsive font sizes
    const titleFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" });
    const descFontSize = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
    const buttonFontSize = useBreakpointValue({ base: "md", sm: "lg" });
  
  return (
    <Card
      position="relative"
      borderRadius={25}
      overflow="hidden"
      bg={`url(${image})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      color="#fff"
      height="100%"
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%)",
          zIndex: 1,
        }}
      ></div>
      <CardBody
        position="relative"
        zIndex={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        height="100%"
        padding="20px"
      >
        <Text fontSize="sm" paddingBottom="5px">
          {date}
        </Text>
        <Heading fontSize={titleFontSize} marginBottom="10px" fontFamily={"Satoshi"}>
          {Title.split(" ").slice(0, 10).join(" ") +
            (short_description.split(" ").length > 20 ? "..." : "")}
        </Heading>
        {/* Horizontal layout for description and button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize={descFontSize} flex="1" paddingRight="50px">
            {short_description.split(" ").slice(0, 20).join(" ") +
              (short_description.split(" ").length > 20 ? "..." : "")}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OtherCards;
