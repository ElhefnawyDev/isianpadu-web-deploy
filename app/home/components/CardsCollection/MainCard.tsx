"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

interface Props {
  Title: string;
  short_description: string;
  date?: string;
  image: string | null;
  id: number;
  link?: string;
  lDescription?: string;
}

const MainCard = ({
  Title,
  short_description,
  date,
  image,
  link,
  lDescription,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => {
    if (link) {
      window.location.href = link;
    } else {
      setModalOpen(true);
    }
  };

  // Responsive font sizes
  const titleFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" });
  const descFontSize = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const buttonFontSize = useBreakpointValue({ base: "md", sm: "lg" });

  return (
    <>
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
          <Text fontSize={["xs", "sm"]} paddingBottom="5px">
            {date}
          </Text>
          <Heading fontSize={titleFontSize} marginBottom="10px">
            {Title}
          </Heading>

          {/* Horizontal layout for description and button */}
          <Flex direction={["column", "row"]} alignItems="end">
            <Text fontSize={descFontSize} flex="1" paddingRight={["0px", "50px"]}>
              {short_description.split(" ").slice(0, 20).join(" ") +
                (short_description.split(" ").length > 20 ? "..." : "")}
            </Text>
            <Button
              fontSize={buttonFontSize}
              h="45px"
              w={["120px", "150px"]}
              borderRadius="30"
              textColor="white"
              _hover={{
                textColor: "black",
                backgroundColor: "white",
              }}
              variant="outline"
              onClick={handleReadMore}
              mt={["10px", "0px"]}
            >
              Read More
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Modal for detailed view */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "600px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{Title}</h2>
            <ReactMarkdown className="text-justify">{lDescription}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default MainCard;
