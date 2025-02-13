"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { TeamOrDirectors } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false, // This disables server-side rendering for this component
});
import "easymde/dist/easymde.min.css";

const TeamsDirectorsForm = ({
  teamsDirectors,
}: {
  teamsDirectors?: TeamOrDirectors;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For new uploads
  const [existingImage, setExistingImage] = useState<string | null>(
    teamsDirectors?.image || null
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
            formData.append("name", data.name);
            formData.append("position", data.position);
            formData.append("bio", data.bio);

            // Append image details
            formData.append("existingImage", existingImage || "");
            formData.append("deletedImage", deletedImage || "");

            // Append the new image file if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            if (teamsDirectors) {
              await axios.patch(
                `/api/teamsdirectors/${teamsDirectors.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            } else {
              await axios.post("/api/teamsdirectors", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }

            router.push("/admin/tables/teamsdirectors");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Member Name</FormLabel>
          <Input
            placeholder="Member Name"
            defaultValue={teamsDirectors?.name}
            fontSize="lg"
            {...register("name")}
          />
          {errors.name?.message && (
            <Text color="red.500">{String(errors.name.message)}</Text>
          )}

          <FormLabel fontSize="25px">Position</FormLabel>
          <Input
            placeholder="Member Position"
            defaultValue={teamsDirectors?.position}
            fontSize="lg"
            {...register("position")}
          />
          {errors.position?.message && (
            <Text color="red.500">{String(errors.position.message)}</Text>
          )}

          <FormLabel fontSize="25px">Bio</FormLabel>
          <Controller
            name="bio"
            defaultValue={teamsDirectors?.bio}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="bio" {...field}></SimpleMDE>
            )}
          ></Controller>
          {errors.bio?.message && (
            <Text color="red.500">{String(errors.bio.message)}</Text>
          )}

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

          <Button type="submit" colorScheme="teal">
            {teamsDirectors ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TeamsDirectorsForm;
