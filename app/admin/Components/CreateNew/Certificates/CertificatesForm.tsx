"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Certificates } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createCertificatesSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false, // This disables server-side rendering for this component
});

type CertificatesFormData = z.infer<typeof createCertificatesSchema>;

const CertificatesForm = ({
  certificates,
}: {
  certificates?: Certificates;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificatesFormData>({
    resolver: zodResolver(createCertificatesSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For new upload
  const [existingImage, setExistingImage] = useState<string | null>(
    certificates?.image || null
  ); // Track existing image
  const [deletedImage, setDeletedImage] = useState<string | null>(null); // Track deleted image

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

            const formData = new FormData(); // Create FormData object

            // Append text fields to FormData
            formData.append("title", data.name);
            formData.append("description", data.description);

            // Append existing and deleted image data
            formData.append("existingImage", existingImage || "");
            formData.append("deletedImage", deletedImage || "");

            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            if (certificates) {
              await axios.patch(
                `/api/certificates/${certificates.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            } else {
              await axios.post("/api/certificates", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }

            router.push("/admin/tables/certificates");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Certificate Name"
            defaultValue={certificates?.title}
            fontSize="lg"
            {...register("name")}
          />
          <ErrorsMessage>{errors.name?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Controller
            name="description"
            defaultValue={certificates?.description}
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
              <img src={existingImage} alt="Certificate Image" width="100" />
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
            {certificates ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CertificatesForm;
