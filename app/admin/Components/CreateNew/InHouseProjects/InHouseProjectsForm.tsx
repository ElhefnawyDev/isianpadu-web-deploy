"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { InHouseProjects } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createInProjectDescriptionSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import dynamic from "next/dynamic";

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // This disables server-side rendering for this component
});
import "easymde/dist/easymde.min.css";

type InHouseProjectsFormData = z.infer<typeof createInProjectDescriptionSchema>;

const InHouseProjectsForm = ({
  inHouseProjects,
}: {
  inHouseProjects?: InHouseProjects;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InHouseProjectsFormData>({
    resolver: zodResolver(createInProjectDescriptionSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For new uploads
  const [existingImage, setExistingImage] = useState<string | null>(
    inHouseProjects?.image || null
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

            const formData = new FormData();

            // Append text fields to FormData
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("ldescription", data.ldescription);
            formData.append("date", data.date);

            // Append image details
            formData.append("existingImage", existingImage || "");
            formData.append("deletedImage", deletedImage || "");

            // Append the new image file if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            if (inHouseProjects) {
              await axios.patch(
                `/api/inhouseprojects/${inHouseProjects.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            } else {
              await axios.post("/api/inhouseprojects", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }

            router.push("/admin/tables/inhouseprojects");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Project Name</FormLabel>
          <Input
            placeholder="Member Name"
            defaultValue={inHouseProjects?.title}
            fontSize="lg"
            {...register("title")}
          />
          {errors.title?.message && (
            <Text color="red.500">{String(errors.title.message)}</Text>
          )}
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Project Description</FormLabel>
          <Input
            placeholder="Member Position"
            defaultValue={inHouseProjects?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Project Long Description</FormLabel>
          <Controller
            name="ldescription"
            defaultValue={inHouseProjects?.ldescription || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Long Description" {...field} />
            )}
          />
          <ErrorsMessage>{errors.ldescription?.message}</ErrorsMessage>

          {/* Display existing image */}
          <FormLabel fontSize="25px">Image</FormLabel>
          {existingImage && (
            <Box position="relative" display="inline-block">
              <img src={existingImage} alt="Team Member Image" width="100" />
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

          <FormLabel fontSize="25px">Date</FormLabel>
          <Input
            type="date"
            defaultValue={inHouseProjects?.date}
            {...register("date")}
          />
          <ErrorsMessage>{errors.date?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {inHouseProjects ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default InHouseProjectsForm;
