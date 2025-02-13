"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Partners } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const PartnersForm = ({ partners }: { partners?: Partners }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  // States to manage logo
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For new upload
  const [existingLogo, setExistingLogo] = useState<string | null>(
    partners?.logo || null
  ); // Track existing logo
  const [deletedLogo, setDeletedLogo] = useState<string | null>(null); // Track deleted logo

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
            // Ensure a logo is present
            if (!existingLogo && !selectedFile) {
              setError("A logo is required.");
              return;
            }

            const formData = new FormData();

            // Append text fields to FormData
            formData.append("name", data.name);

            // Append logo details
            formData.append("existingLogo", existingLogo || "");
            formData.append("deletedLogo", deletedLogo || "");

            // Append new file if selected
            if (selectedFile) {
              formData.append("logo", selectedFile);
            }

            // Send data to the API
            if (partners) {
              await axios.patch(`/api/partners/${partners.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            } else {
              await axios.post("/api/partners", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }

            router.push("/admin/tables/partners");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Partner Name"
            defaultValue={partners?.name}
            fontSize="lg"
            {...register("name")}
          />
          {/* <Text color="red.500">{errors.name?.message}</Text> */}
          <Text color="red.500">
            {typeof errors.name?.message === "string"
              ? errors.name.message
              : ""}
          </Text>

          <FormLabel fontSize="25px">Logo</FormLabel>
          {existingLogo && (
            <Box position="relative" display="inline-block">
              <img src={existingLogo} alt="Partner Logo" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => {
                  setExistingLogo(null); // Remove from UI
                  setDeletedLogo(existingLogo); // Mark for deletion
                }}
              >
                X
              </Button>
            </Box>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {partners ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PartnersForm;
