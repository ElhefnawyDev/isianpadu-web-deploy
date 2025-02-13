"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Experiences } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createExperiencesSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // This disables server-side rendering for this component
});
type ExperiencesFormData = z.infer<typeof createExperiencesSchema>;

const ExperiencesForm = ({ experiences }: { experiences?: Experiences }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperiencesFormData>({
    resolver: zodResolver(createExperiencesSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File state
  const [existingLogo, setExistingLogo] = useState<string | null>(
    experiences?.logo || null
  ); // For existing logo
  const [deletedLogo, setDeletedLogo] = useState<string | null>(null); // For deleted logo

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  <FormLabel fontSize="25px">Logo</FormLabel>;
  {
    existingLogo && (
      <Box position="relative" display="inline-block">
        <img src={existingLogo} alt="Logo" width="100" />
        <Button
          size="xs"
          colorScheme="red"
          position="absolute"
          top="0"
          right="0"
          onClick={() => {
            setExistingLogo(null); // Remove the logo from the UI
            setDeletedLogo(existingLogo); // Mark it for deletion
          }}
        >
          X
        </Button>
      </Box>
    );
  }
  <input type="file" accept="image/*" onChange={handleFileChange} />;

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
      {error && <Text>{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const formData = new FormData(); // Create FormData object

            // Append text fields to FormData
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("date", data.date);

            formData.append("existingLogo", existingLogo || ""); // Retain existing logo if not deleted
            formData.append("deletedLogo", deletedLogo || ""); // Send the logo to be deleted

            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("logo", selectedFile);
            }

            // Send data to the API
            if (experiences)
              await axios.patch(
                `/api/experiences/${experiences.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            else
              await axios.post("/api/experiences", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/experience");
            router.refresh();
          } catch (error) {
            console.error("Error occurred:", error); // Log detailed error
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Experience Title "
            defaultValue={experiences?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">Date</FormLabel>
          <Input
            type="date"
            defaultValue={experiences?.title}
            {...register("date")}
          />
          <ErrorsMessage>{errors.date?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">Description</FormLabel>
          <Controller
            name="description"
            defaultValue={experiences?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description " {...field}></SimpleMDE>
            )}
          ></Controller>
          {errors.description && (
            <ErrorsMessage>{errors.description.message}</ErrorsMessage>
          )}

          <FormLabel fontSize="25px">Logo</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {experiences ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ExperiencesForm;
