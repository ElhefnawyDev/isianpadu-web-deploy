"use client";
import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  Title: string;
  description: string;
  date: string;
  image: string | null;
  id: number;
  images: string[];
}

const NewsEventsChild = ({
  Title,
  description,
  date,
  image,
  images,
  id,
}: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Adjust for smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Chakra UI Modal for Image Enlargement
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    onOpen(); // Open the modal when image is clicked
  };

  return (
    <div style={{ width: "100%", padding: "0 16px" }}> {/* Adjusted width and padding */}
      <Card borderRadius={10} bg={"#EAEBF3"} width="100%">
        {/* Main Image with better responsiveness */}
        <div className="relative w-full max-h-[900px]">
          {" "}
          {image && (
            <Image
              src={image}
              alt="Cropped Image"
              className="w-full h-full object-cover"
              height={["200px", "300px", "850px"]}
              width="100%"
            />
          )}
        </div>
        <CardBody
          paddingInline={[4, 40]} // Adjusted padding for small screens
          paddingTop={10}
          paddingBottom={16}
          width="100%"
        >
          <div className="py-5">
            {/* Slider for displaying multiple content images */}
            <Slider {...settings}>
              {images.map((imageSrc, index) => (
                <div key={index} className="px-3">
                  {" "}
                  {/* Adding padding for better spacing */}
                  <Image
                    src={imageSrc}
                    alt={`Content image ${index + 1}`}
                    objectFit="cover"
                    className="w-full h-full"
                    h={["200px", "250px", "300px"]} // Adjusted heights for responsiveness
                    w={["100%", "400px", "500px"]} // Adjusted widths for responsiveness
                    rounded={"lg"}
                    onClick={() => handleImageClick(imageSrc)} // On click, open modal with this image
                    cursor="pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <VStack spacing={4} align="stretch" width="100%">
            <Text color={"#2B378B"}>{date}</Text>
            <Heading size={["md", "lg"]} textAlign={"left"}> {/* Adjusted heading size for small screens */}
              {" "}
              {Title}
            </Heading>
            <ReactMarkdown className="prose max-w-[100%] text-justify border-t-2 border-zinc-300 p-5 mt-2">
              {description}
            </ReactMarkdown>
          </VStack>
        </CardBody>
      </Card>

      {/* Modal for Enlarged Image */}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Enlarged Content Image"
                w="full"
                h="full"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewsEventsChild;