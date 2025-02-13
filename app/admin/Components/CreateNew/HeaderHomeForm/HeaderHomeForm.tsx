"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { HeaderHome } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createHeaderHomeSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type HeaderHomeFormData = z.infer<typeof createHeaderHomeSchema>;

const HeaderHomeForm = ({ headerHome }: { headerHome?: HeaderHome }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderHomeFormData>({
    resolver: zodResolver(createHeaderHomeSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File state

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
      {error && <Text>{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const formData = new FormData(); // Create FormData object

            // Append text fields to FormData
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("opacity", data.opacity);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }
            if (headerHome) {
              // Send data to the API
              await axios.patch(`/api/headerhome/${headerHome.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            } else {
              await axios.post("/api/headerhome", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }
            router.push("/admin/tables/headerhome");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Experience Title "
            defaultValue={headerHome?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="Description "
            defaultValue={headerHome?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Logo</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <FormLabel fontSize="25px">Image BG index</FormLabel>
          <Input
            type="number"
            defaultValue={headerHome?.title}
            {...register("opacity")}
          />
          <ErrorsMessage>{errors.opacity?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {"Update"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default HeaderHomeForm;
