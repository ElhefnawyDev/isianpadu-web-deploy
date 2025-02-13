"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Services } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createServicesSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false, // This disables server-side rendering for this component
});

type ServicesFormData = z.infer<typeof createServicesSchema>;

const ServicesForm = ({ services }: { services?: Services }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesFormData>({
    resolver: zodResolver(createServicesSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  // State for file uploads and existing images
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [selectedFile3, setSelectedFile3] = useState<File | null>(null);

  const [existingImage, setExistingImage] = useState<string | null>(
    services?.image || null
  );
  const [existingImage2, setExistingImage2] = useState<string | null>(
    services?.image2 || null
  );
  const [existingImage3, setExistingImage3] = useState<string | null>(
    services?.image3 || null
  );

  const [deletedImage, setDeletedImage] = useState<string | null>(null);
  const [deletedImage2, setDeletedImage2] = useState<string | null>(null);
  const [deletedImage3, setDeletedImage3] = useState<string | null>(null);

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

            // Append text fields
            formData.append("title", data.title);
            formData.append("hsDescription", data.hsDescription);
            formData.append("description", data.description);
            formData.append("lDescription", data.lDescription);

            // Append existing/deleted images
            formData.append("existingImage", existingImage || "");
            formData.append("existingImage2", existingImage2 || "");
            formData.append("existingImage3", existingImage3 || "");
            formData.append("deletedImage", deletedImage || "");
            formData.append("deletedImage2", deletedImage2 || "");
            formData.append("deletedImage3", deletedImage3 || "");

            // Append new files
            if (selectedFile) formData.append("image", selectedFile);
            if (selectedFile2) formData.append("image2", selectedFile2);
            if (selectedFile3) formData.append("image3", selectedFile3);

            if (services)
              await axios.patch(`/api/services/${services.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/services", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/services");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Service Title"
            defaultValue={services?.title}
            fontSize="lg"
            {...register("title")}
          />

          <FormLabel fontSize="25px">Homepage Description</FormLabel>
          <Input
            placeholder="Short description for homepage"
            defaultValue={services?.hsDescription || ""}
            fontSize="lg"
            {...register("hsDescription")}
          />

          <FormLabel fontSize="25px">Short Description</FormLabel>
          <Input
            placeholder="Short Description"
            defaultValue={services?.description || ""}
            fontSize="lg"
            {...register("description")}
          />

          <FormLabel fontSize="25px">Long Description</FormLabel>
          <Controller
            name="lDescription"
            defaultValue={services?.lDescription || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Detailed Description" {...field} />
            )}
          />

          {/* Existing image management */}
          {existingImage && (
            <Box position="relative" display="inline-block">
              <img src={existingImage} alt="Existing Image" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => {
                  setDeletedImage(existingImage);
                  setExistingImage(null);
                }}
              >
                Remove
              </Button>
            </Box>
          )}
          <FormLabel>Image for Homepage</FormLabel>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setSelectedFile)}
          />

          {existingImage2 && (
            <Box position="relative" display="inline-block">
              <img src={existingImage2} alt="Existing Image 2" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => {
                  setDeletedImage2(existingImage2);
                  setExistingImage2(null);
                }}
              >
                Remove
              </Button>
            </Box>
          )}
          <FormLabel>Image for Services Page</FormLabel>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setSelectedFile2)}
          />

          {existingImage3 && (
            <Box position="relative" display="inline-block">
              <img src={existingImage3} alt="Existing Image 3" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => {
                  setDeletedImage3(existingImage3);
                  setExistingImage3(null);
                }}
              >
                Remove
              </Button>
            </Box>
          )}
          <FormLabel>Image for Long Description</FormLabel>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setSelectedFile3)}
          />

          <Button type="submit" colorScheme="teal">
            {services ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ServicesForm;
