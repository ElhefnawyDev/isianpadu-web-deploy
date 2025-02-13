"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { HomeGeneralInfo } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createHomeGISchema } from "./ValidationSchema";

type HomeGIFormData = z.infer<typeof createHomeGISchema>;

const HomeGIForm = ({
  experiencesGI: homeGI,
}: {
  experiencesGI?: HomeGeneralInfo;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeGIFormData>({
    resolver: zodResolver(createHomeGISchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  // State for selected files and existing images
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [existingImage1, setExistingImage1] = useState<string | null>(
    homeGI?.image1 || null
  );

  const [deletedImage1, setDeletedImage1] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    setFile(file || null);
  };

  return (
    <Box
      border="3px solid"
      borderColor="black.300"
      padding={0}
      borderRadius="md"
      marginTop={10}
      marginLeft={10}
      marginRight={10}
    >
      {error && <Text color="red.500">{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const formData = new FormData();

            // Append text fields to FormData
            formData.append("title1", data.title1);
            formData.append("title2", data.title2);
            formData.append("content", data.content);
            formData.append("width", data.width);
            formData.append("height", data.height);

            // Append existing and deleted image information
            formData.append("existingImage1", existingImage1 || "");
            formData.append("deletedImage1", deletedImage1 || "");

            // Append new files
            if (selectedFile) formData.append("image1", selectedFile);

            // Send data to the API
            if (homeGI) {
              await axios.patch(`/api/homeGI/${homeGI.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            } else {
              await axios.post("/api/homeGI", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }

            router.push("/admin/tables/HomeGeneralInfo");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="homeGI Title"
            defaultValue={homeGI?.title1 || ""}
            fontSize="lg"
            {...register("title1")}
          />
          <FormLabel fontSize="25px">Title2</FormLabel>
          <Input
            placeholder="homeGI Title2"
            defaultValue={homeGI?.title2 || ""}
            fontSize="lg"
            {...register("title2")}
          />

          <FormLabel fontSize="25px">Content</FormLabel>
          <Input
            placeholder="homeGI Content"
            defaultValue={homeGI?.content || ""}
            fontSize="lg"
            {...register("content")}
          />

          <FormLabel fontSize="25px">Width</FormLabel>
          <Input
            placeholder="homeGI Width"
            type="number"
            defaultValue={homeGI?.width || ""}
            fontSize="lg"
            {...register("width")}
          />

          <FormLabel fontSize="25px">Height</FormLabel>
          <Input
            placeholder="homeGI Height"
            type="number"
            defaultValue={homeGI?.height || ""}
            fontSize="lg"
            {...register("height")}
          />

          {/* Existing Image1 Management */}
          {existingImage1 && (
            <Box position="relative" display="inline-block">
              <img src={existingImage1} alt="Existing Image1" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => {
                  setExistingImage1(null);
                  setDeletedImage1(existingImage1);
                }}
              >
                X
              </Button>
            </Box>
          )}
          <FormLabel>Image1</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setSelectedFile)}
          />

          <Button type="submit" colorScheme="teal">
            {homeGI ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default HomeGIForm;
