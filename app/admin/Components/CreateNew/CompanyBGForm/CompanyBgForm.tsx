"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { CompanyBackground } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createCompanyBgSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type CompanyBgFormData = z.infer<typeof createCompanyBgSchema>;

const CompanyBgForm = ({
  companyBackground,
}: {
  companyBackground: CompanyBackground;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyBgFormData>({
    resolver: zodResolver(createCompanyBgSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New file state
  const [existingImage, setExistingImage] = useState<string | null>(
    companyBackground?.Image || null
  ); // Existing image state
  const [deletedImage, setDeletedImage] = useState<string | null>(null); // Deleted image state

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
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
            if (!existingImage && !selectedFile) {
              setError("An image is required.");
              return;
            }

            const formData = new FormData();

            // Append text fields to FormData
            formData.append("title", data.title);
            formData.append("description", data.description);

            // Append image details
            formData.append("existingImage", existingImage || "");
            formData.append("deletedImage", deletedImage || "");

            // Append the new image file if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            await axios.patch(
              `/api/companybg/${companyBackground.id}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            router.push("/admin/tables/companybg");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Title"
            defaultValue={companyBackground?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Controller
            name="description"
            defaultValue={companyBackground?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
            )}
          ></Controller>
          {errors.description && (
            <ErrorsMessage>{errors.description.message}</ErrorsMessage>
          )}

          <FormLabel fontSize="25px">Image</FormLabel>
          {existingImage && (
            <Box position="relative" display="inline-block">
              <img src={existingImage} alt="Company Background" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => {
                  setExistingImage(null); // Remove from UI
                  setDeletedImage(existingImage); // Mark for deletion
                }}
              >
                X
              </Button>
            </Box>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            Update
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CompanyBgForm;
